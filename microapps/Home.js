var Home = class Home {
    constructor(pWin) {
        this.win = pWin;
        this.name = "HOME";
        this.win.classList.add(this.name);
        this.html = "<h1>Hallo.</h1>";
        this.start();
    }

    start() {
        this.win.innerHTML = this.html;
    }
}