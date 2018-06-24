var PDFViewerMobile= class PDFViewerMobile {
    constructor(pWin) {
        this.win = pWin;
        this.name = "PDFViewerMobile";
        this.win.classList.add(this.name);
        this.html = "TEST"; 
        this.lastSearchTerm = "";
        this.start();
    }

    start() {
        this.win.innerHTML = this.html;
    }

    back() {
        //wird aufgerufen wenn nutzer zurück drückt
    }
}
