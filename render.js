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

  userConnected() {
  	this.startApp(Home);
  }

  createWin() {
  	this.win.getElementById("window").classList = "";
  	return this.win.getElementById("window");
  }

  startApp(pApp) {
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
    loadJS('js/youtube.js', this.startVideo, document.body);
    this.win = pWin;
    this.name = "YT";
    this.win.classList.add(this.name);
    this.html = "<img class=\"logo\" src=\"img/yt_logo_rgb_dark.png\"> <div id=\"video-placeholder\"></div><input id=\"volume-input\" type=\"number\" max=\"100\" min=\"0\">";
    this.start();
  }

  startVideo(){
    console.log("js loaded");
    onYouTubeIframeAPIReady();
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
