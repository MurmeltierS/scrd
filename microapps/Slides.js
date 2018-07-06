var Slides = class Slides {
    constructor(pWin) {
        this.win = pWin;
        this.name = "Slides";
        this.win.classList.add(this.name);
        this.html = '<iframe onload="this.contentWindow.focus()" src="https://docs.google.com/presentation/d/e/2PACX-1vTlzz55vz_J24GGKoVFjWM86HD2RN5SCeIlQKiAJaA8hrLv1O6kgPK1q4kAqPpYvBRrH0L--knPzU2z/embed?start=false&loop=false&delayms=999999" frameborder="0" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>';
        this.start();
    }

    start() {
        this.win.innerHTML = this.html;
    }

    next() {
        remote.getGlobal('win').webContents.sendInputEvent({keyCode: ' ', type: 'keyDown'});
        remote.getGlobal('win').webContents.sendInputEvent({keyCode: ' ', type: 'keyUp'});
    }

}