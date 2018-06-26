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
        this.win.innerHTML = "<iframe src=\"" + data + "\" height=\"100%\" width=\"100%\"></iframe>";
    }
}
