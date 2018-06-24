var PDFViewer = class PDFViewer {
    constructor(pWin) {
        this.win = pWin;
        this.name = "PDFViewer";
        this.win.classList.add(this.name);
        this.html = "KUCHEN";
        this.start();
    }

    start() {
        this.win.innerHTML = this.html;
    }
}
