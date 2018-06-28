var PDFViewer = class PDFViewer {
    constructor(pWin) {
        this.win = pWin;
        this.name = "PDFViewer";
        this.win.classList.add(this.name);
        this.html = ""; 
        this.lastScroll;
        this.start();
    }

    start() {
        this.win.innerHTML = this.html;
        setInterval(this.updatePv.bind(this), 1000);
    }

    scrollTo(rel){
        this.lastScroll = rel;
        var scroll = rel * this.win.clientHeight;
        console.log("scroll:"+scroll);
        this.win.querySelector("#swrap").scrollTop = scroll;
    }

    updatePv(){
        remote.getGlobal('win').webContents.capturePage(function(e){s.call("setPv")(e.toDataURL(),this.lastScroll);}.bind(this));
    }

    display(data) {
        this.win.innerHTML = "<div id=\"swrap\" style=\"height: 100vh; width: 100vw;overflow-y:scroll;\" ><webview src=\"" + data + "\" style=\"display: inline-flex; width: 100vw; height: 200vh\" plugins></webview></div>";
    }
}
