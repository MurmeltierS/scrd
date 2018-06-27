var ShutdownMobile = class ShutdownMobile {
    constructor(pWin) {
        this.win = pWin;
        this.name = "ShutdownMobile";
        this.win.classList.add(this.name);
        this.html = "<button class=\"normal\" id=\"shutdown\">Shutdown<\/button>";
        this.lastSearchTerm = "";
        this.start();
    }

    start() {
        this.win.innerHTML = this.html;
        this.win.querySelector("#shutdown").addEventListener("click", this.shutdown.bind(this));
    }

    back() {
        //wird aufgerufen wenn nutzer zurück drückt
    }

    shutdown() {
        
    }
}
