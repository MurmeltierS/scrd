var Shutdown = class Shutdown {
    constructor(pWin) {
        this.win = pWin;
        this.name = "Shutdown";
        this.id = "";
        this.win.classList.add(this.name);
        this.html = "<h1>Herunterfahren oder Neustart?</h1>";
        this.start();
    }

    start() {
        this.win.innerHTML = this.html;
    }
    shutdown() {
	    const { spawn } = require('child_process');
	const ls = spawn('shutdown', ['now']);
    }

	reboot() {
		const { spawn } = require('child_process');
		const ls = spawn('reboot');

}
}
