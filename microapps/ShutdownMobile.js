var ShutdownMobile = class ShutdownMobile {
    constructor(pWin) {
        this.win = pWin;
        this.name = "ShutdownMobile";
        this.win.classList.add(this.name);
        this.html = "<div class=\"main\"><div class=\"navTop\"><h1>Shutdown<\/h1><i onclick=\"m.launch('Home')\" class=\"navBtn ion-ios-arrow-left\"><\/i><\/div><div class=\"wrapper\"><button class=\"normal\" id=\"shutdown\">Herunterfahren<\/button><br><br><button class=\"normal\" id=\"reboot\">Neustart<\/button><br><br><button class=\"normal\" id=\"shuttback\">Abbrechen<\/button></div></div>";
        this.lastSearchTerm = "";
        this.start();
    }

    start() {
        m.nextPage();
        this.win.innerHTML = this.html;
        this.win.querySelector("#shutdown").addEventListener("click", this.shutdown.bind(this));
        this.win.querySelector("#reboot").addEventListener("click", this.reboot.bind(this));
        this.win.querySelector("#shuttback").addEventListener("click", this.back.bind(this));
    }

    back() {
        //wird aufgerufen wenn nutzer zurück drückt
        m.launch("Home");
    }

    shutdown() {
        m.call("shutdown")();
    }

    reboot() {
        m.call("reboot")();
    }
}