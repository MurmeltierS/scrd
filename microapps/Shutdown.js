var Shutdown = class Shutdown {
    constructor(pWin) {
        this.win = pWin;
        this.name = "Shutdown";
        this.id = "";
        this.win.classList.add(this.name);
        this.html = "Shutdown the pi?";
        this.start();
    }

    start() {
        this.win.innerHTML = this.html;
    }
    shutdown() {
	    const { spawn } = require('child_process');
const ls = spawn('shutdown', ['now']);
    }

}
