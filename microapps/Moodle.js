var Moodle = class Moodle {
    constructor(pWin) {
        this.win = pWin;
        this.name = "Moodle";
        this.win.classList.add(this.name);
        this.html = '<iframe id="moodleFrame" style="width: 100vw; height: 100vh; border: none; margin: 0;" src="https://moodle.gsz-zak.de/moodle/"></iframe>';
        this.start();
    }

    start() {
        this.win.innerHTML = this.html;
    }

    sendFrame() {
        var html = this.win.querySelector("#moodleFrame").contentWindow.document.innerHTML;
        s.call("setFrame")(html);
    }

}