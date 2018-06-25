var ImageViewer = class ImageViewer {
    constructor(pWin) {
        this.win = pWin;
        this.name = "ImageViewer";
        this.win.classList.add(this.name);
        this.html = "";
        this.start();
    }

    start() {
        this.win.innerHTML = this.html;
    }

    hello(msg) {
        this.win.innerHTML += msg+"<br>";
        var number = 42;
        s.call("answer")("i recived:"+msg, number);
    }

}