var MoodleMobile = class MoodleMobile {
    constructor(pWin) {
        this.win = pWin;
        this.name = "MoodleMobile";
        this.win.classList.add(this.name);
        this.html = "<div class=\"main\"> <div class=\"navTop\"><h1>Moodle<\/h1><i class=\"navBtn ion-ios-more-outline\"><\/i><\/div> <div class=\"wrapper\"><iframe sandbox=\"allow-same-origin allow-scripts allow-pointer-lock allow-scripts\" class=\"sframe\"></iframe><\/div><\/div>";
        this.lastSearchTerm = "";
        this.start();
    }

    start() {
        this.win.innerHTML = this.html;
    }

    back() {
        //wird aufgerufen wenn nutzer zurück drückt
    }

    setFrame(html){
        console.log(html);
         this.win.querySelector(".sframe").src = "";
        this.win.querySelector(".sframe").contentWindow.document.documentElement.innerHTML = html;
        this.win.querySelector(".sframe").contentWindow.document.addEventListener("click", this.handleClick.bind(this));
    }

    handleClick(e){
        console.log(e);
        for (var i = 0; i < e.path.length; i++) {
            if(typeof e.path[i].href !== 'undefined'){
                m.call("setHref")(e.path[i].href);
                break;
            }
        }
    }

}