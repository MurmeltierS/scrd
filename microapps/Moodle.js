var Moodle = class Moodle {
    constructor(pWin) {
        this.win = pWin;
        this.name = "Moodle";
        this.win.classList.add(this.name);
        this.html = '<iframe  name="disable-x-frame-options" id="moodleFrame" style="display:inline-flex;width: 100vw; height: 100vh; border: none; margin: 0;background:#fff;" src="https://moodle.gsz-zak.de/moodle/"></iframe>';
        this.lastHtml;
        this.start();
    }

    start() {
        this.win.innerHTML = this.html;
        this.win.querySelector("#moodleFrame").contentWindow.addEventListener("DOMContentLoaded", this.sendFrame.bind(this), true);
        setInterval(this.checkChange.bind(this), 1000);
    }

    checkChange(){
        if(this.lastHtml != this.win.querySelector("#moodleFrame").contentWindow.document.documentElement.innerHTML){
            this.sendFrame();
            console.log("changed");
        }
    }  

    sendFrame() {
        var html = this.win.querySelector("#moodleFrame").contentWindow.document.documentElement.innerHTML;
        this.lastHtml = html;
        console.log(html);
        s.call("setFrame")(html);
    }

    setHref(href){
        this.win.querySelector("#moodleFrame").contentWindow.location.assign(href);
    }

}