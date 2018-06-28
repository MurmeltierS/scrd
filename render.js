const remote = require('electron').remote;
var temp = temp || {};

class scrd {
    constructor(pWin) {
        this.win = pWin;
        this.currentApp = [];
        this.intervals = [];
    }

    get app() {
        return this.currentApp;
    }

    get io() {
        return remote.getGlobal('io');
    }

    call(pFuncString) {
        var self = this;
        return function() {
            var args = [];
            for (var i = 0; i < arguments.length; i++)
                args[i] = arguments[i];
            self.io.emit('exeFunction', { call: pFuncString, arg: args });
        };
    }

    callAjax(url, callback) {
        var xmlhttp;
        // compatible with IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                try {
                    var json = JSON.parse(xmlhttp.responseText);
                    callback(json);
                } catch (e) {
                    callback(xmlhttp.responseText);
                }
            }
        }
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    }

    userConnected() {
        this.startApp(Home);
    }

    createWin() {
        this.win.getElementById("window").classList = "";
        return this.win.getElementById("window");
    }

    startApp(pApp, pName) {
        var id = window.setInterval(function() {}, 0);
        while (id--) {
            window.clearTimeout(id); // will do nothing if no timeout with id is present
        }
        if (typeof pApp !== 'undefined') {
            this.currentApp = new pApp(this.createWin());
        } else {
            if (document.querySelectorAll('script[src="microapps/' + pName + '.js"]').length == 0) {
                loadJS("microapps/" + pName + ".js", function(pName) { this.startApp(window[pName], pName); }.bind(this, pName));
            }
        }
    }

    setTheme(pSrc) {
        var themeIMG = document.getElementsByClassName("themeIMG");
        for (var i = 0; i < themeIMG.length; i++) {
            themeIMG[i].src = pSrc;
        }
    }

    exeFunction(pObj) {
        this.app[pObj.call].apply(this.app, pObj.arg);
    }

    setInterval(func, interval) {
        this.intervals.push(setInterval(func, interval));
    }
}

function makeQR(pURL) {
    document.getElementById("window").innerHTML += "<br><b>" + pURL + "</b>";
    new QRCode(document.getElementById("qrcode"), pURL);
}


function connected() {
    setTimeout(function(){remote.getGlobal('io').emit('openHome', '');},2000);
    //s.userConnected();
}

function startApp(pName) {
    console.log("pName:");
    console.log(pName);
    s.startApp(window[pName], pName);

}

document.addEventListener("keydown", function(e) {
    if (e.which === 123) {
        remote.getCurrentWindow().toggleDevTools();
    } else if (e.which === 116) {
        location.reload();
    }
});


var loadJS = function(url, implementationCode, location) {
    //url is URL of external file, implementationCode is the code
    //to be called from the file, location is the location to 
    //insert the <script> element

    var scriptTag = document.createElement('script');
    scriptTag.src = url;

    scriptTag.onload = implementationCode;
    scriptTag.onreadystatechange = implementationCode;

    document.body.appendChild(scriptTag);
};

var s;

loadJS('microapps/Home.js', function() { s = new scrd(document); });

