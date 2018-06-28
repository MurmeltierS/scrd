var ShutdownMobile = class ShutdownMobile {
    constructor(pWin) {
        this.win = pWin;
        this.name = "ShutdownMobile";
        this.win.classList.add(this.name);
        this.html = "<button class=\"normal\" id=\"shutdown\">Shutdown<\/button><button class=\"normal\" id=\"reboot\">Reboot<\/button>";
        this.lastSearchTerm = "";
        this.start();
    }

    start() {
        m.nextPage();
	this.win.innerHTML = this.html;
        this.win.querySelector("#shutdown").addEventListener("click", this.shutdown.bind(this));
	this.win.querySelector("#reboot").addEventListener("click", this.reboot.bind(this));
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
