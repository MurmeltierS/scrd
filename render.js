const remote = require('electron').remote;

class scrd {
  constructor(pWin) {
    this.win = pWin;
    this.currentApp = [];
  }
  
  get app() {
    return this.currentApp;
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

var Youtube = class YouTube {
  constructor(pWin) {
    this.win = pWin;
    this.name = "YT";
    this.win.classList.add(this.name);
    this.html = "<img class=\"logo\" src=\"img/yt_logo_rgb_dark.png\"><webview id=\"embedYT\" src=\"https://www.youtube.com/embed/E-ak-E1WjDI\" style=\"display:inline-flex;z-index:100;top:0;left:0;position:absolute;width:100vw;height:100vh\">";
    this.start();
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

s = new scrd(document);