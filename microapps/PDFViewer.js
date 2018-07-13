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

    scrollTo(rel) {
        this.lastScroll = rel;
        var scroll = rel * document.querySelector('iframe').contentWindow.document.querySelector("#viewerContainer").clientHeight;
        console.log("scroll:" + scroll);
        document.querySelector('iframe').contentWindow.document.querySelector("#viewerContainer").scrollTop = scroll;
    }

    updatePv() {
        remote.getGlobal('win').webContents.capturePage(function(e) { s.call("setPv")(e.toDataURL(), this.lastScroll); }.bind(this));
    }

    display(data) {
        let base64Pdf = data.split(';base64,').pop();
        remote.getGlobal('fs').writeFile('temp2.pdf', base64Pdf, { encoding: 'base64' }, function(err) {
            console.log(err);
            this.win.innerHTML = "<iframe src=\"http://localhost:3000/web/viewer.html?file=/temp2.pdf\" style=\"display: inline-flex; width: 100vw; height: 100vh\"></iframe>";
            //quickfix
        }.bind(this));
    }
}