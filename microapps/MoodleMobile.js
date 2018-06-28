var MoodleMobile = class MoodleMobile {
    constructor(pWin) {
        this.win = pWin;
        this.name = "MoodleMobile";
        this.win.classList.add(this.name);
        this.html = "<div class=\"main\"> <div class=\"navTop\"><h1>Moodle<\/h1><i onclick=\"m.call('setHref')('https://moodle.gsz-zak.de/moodle/')\" class=\"navBtn ion-ios-home-outline\"><\/i><\/div> <div class=\"wrapper\"><iframe sandbox=\"allow-same-origin allow-scripts allow-pointer-lock allow-scripts\" class=\"sframe\"></iframe><\/div><\/div>";
        this.lastSearchTerm = "";
        this.origin = "";
        this.start();
    }

    start() {
        this.win.innerHTML = this.html;
        this.win.querySelector(".sframe").contentWindow.document.addEventListener("click", this.handleClick.bind(this));
    }

    back() {
        //wird aufgerufen wenn nutzer zurück drückt
    }

    setFrame(html, origin) {
        if (this.win.querySelector(".sframe").src != "") {
            this.win.querySelector(".sframe").src = "";
        }
        this.origin = origin;
        this.win.querySelector(".sframe").contentWindow.document.documentElement.innerHTML = html;
        Array.from(this.win.querySelector(".sframe").contentWindow.document.querySelectorAll("input")).map(function(e){
            e.addEventListener("change", this.handleChange.bind(this));
            e.addEventListener("keyup", this.handleChange.bind(this));
            e.addEventListener("paste", this.handleChange.bind(this));
            return e;
        }.bind(this));
        /*var links = this.win.querySelector(".sframe").contentWindow.document.links;
        for (var i in links) {
            //links[i].hrefb = "";
            //links[i].hrefb = links[i].origin+links[i].pathname;
            //links[i].href = "na.html";
        }*/
    }

    absolute(base, relative) {
        return new URL(relative, base).href;
    }

    handleChange(e){
        console.log(e.target.id);
        m.call("setInput")(e.target.id, e.target.value);
    }

    handleClick(e) {
        e.preventDefault();
        var r = new RegExp('^(?:[a-z]+:)?//', 'i');
        console.log(e);
        if(typeof e.target.id !== 'undefined'){
            m.call("clickBtn")(e.target.id);
        }
        for (var i = 0; i < e.path.length; i++) {

            if (typeof e.path[i].href !== 'undefined') {
                var href = e.path[i].href;
                if(href.indexOf(window.location.origin) !== -1){
                    href = href.replace(window.location.origin+"/", "");
                }
                console.log(href);
                if (r.test(href)) {
                    m.call("setHref")(href);
                } else {
                    console.log(this.absolute(this.origin, href));
                    m.call("setHref")(this.absolute(this.origin, href));
                }
                break;
            }
        }
    }

}