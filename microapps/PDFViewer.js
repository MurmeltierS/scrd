var PDFViewer = class PDFViewer {
    constructor(pWin) {
        this.win = pWin;
        this.name = "PDFViewer";
        this.win.classList.add(this.name);
        this.html = ""; 
        this.start();
    }

    start() {
        this.win.innerHTML = this.html;
    }

    display(data) {
        this.win.innerHTML = "<webview src=\"" + data + "\" style=\"display: inline-flex; width: 100vw; height: 100vh;\" plugins></webview>";
    }
}
