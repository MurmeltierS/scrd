const remote = require('electron').remote;
var temp = temp || {};

class scrd {
  constructor(pWin) {
    this.win = pWin;
    this.currentApp = [];
  }
  
  get app() {
    return this.currentApp;
  }

  get io(){
    return remote.getGlobal('io');
  }

  call(pFuncString){
    var self = this;
    return function(){
      var args = [];
    for (var i = 0; i < arguments.length; i++)
        args[i] = arguments[i];
      self.io.emit('exeFunction', {call: pFuncString, arg: args});
    };
  }

  callAjax(url, callback){
    var xmlhttp;
    // compatible with IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
            try{
              var json = JSON.parse(xmlhttp.responseText);
              callback(json);
            }catch(e){
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

  startApp(pApp) {
    var id = window.setInterval(function() {}, 0);
    while (id--) {
     window.clearTimeout(id); // will do nothing if no timeout with id is present
    }
    this.currentApp = new pApp(this.createWin());
  }

  setTheme(pSrc){
    var themeIMG = document.getElementsByClassName("themeIMG");
    for(var i = 0; i<themeIMG.length; i++){
      themeIMG[i].src = pSrc;
    }
  }

  exeFunction(pObj){
    this.app[pObj.call].apply(this.app, pObj.arg);
  }
}

var Home = class Home {
  constructor(pWin) {
    this.win = pWin;
    this.name = "HOME";
    this.win.classList.add(this.name);
    this.html = "<h1>Hallo.</h1>";
    this.start();
  }

  start() {
    this.win.innerHTML = this.html;
  }
}

var YouTube = class YouTube {
  constructor(pWin) {
    this.win = pWin;
    this.name = "YT";
    this.id = "";
    this.win.classList.add(this.name);
    this.html = "<img class=\"logo\" src=\"img/yt_logo_rgb_dark.png\"> <div id=\"video-placeholder\"></div>";
    this.start();
  }

  startVideo(){
    console.log("js loaded");
    console.log(this);
    onYouTubeIframeAPIReady(this.id);
  }

  loadVideo(pID){
    console.log("loadVideo:"+pID);
    this.id = pID;
    if(typeof player !== 'undefined'){
      try{
        player.loadVideoById(this.id, 0);
      }catch(e){
        onYouTubeIframeAPIReady(this.id);
      }
    }else{
      loadJS('js/youtube.js', this.startVideo.bind(this), document.body);
    }
    
    s.setTheme("https://img.youtube.com/vi/"+pID+"/maxresdefault.jpg");

  }

  play(){
    player.playVideo();
  }

  pause(){
    player.pauseVideo();
  }

  start() {
    this.win.innerHTML = this.html;
  }
}

function makeQR(pURL){
  document.getElementById("window").innerHTML += "<br><b>"+pURL+"</b>";
  new QRCode(document.getElementById("qrcode"), pURL);
}


function connected(){
  s.userConnected();
}

function startApp(pName){
   
  s.startApp(window[pName]);

}

s = new scrd(document);



var loadJS = function(url, implementationCode, location){
    //url is URL of external file, implementationCode is the code
    //to be called from the file, location is the location to 
    //insert the <script> element

    var scriptTag = document.createElement('script');
    scriptTag.src = url;

    scriptTag.onload = implementationCode;
    scriptTag.onreadystatechange = implementationCode;

    location.appendChild(scriptTag);
};
