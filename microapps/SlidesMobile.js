var SlidesMobile = class SlidesMobile {
    constructor(pWin) {
        this.win = pWin;
        this.name = "SlidesMobile";
        this.win.classList.add(this.name);
        this.html = "<div class=\"main\"> <div class=\"navTop\"><h1>Slides<\/h1><i class=\"navBtn ion-ios-more-outline\"><\/i><\/div> <div class=\"center\"><br><button class=\"normal\" id=\"weiter\">weiter<\/button><\/div><\/div>";
        this.lastSearchTerm = "";
        this.start();
    }

    start() {
        this.win.innerHTML = this.html;
        this.win.querySelector("#weiter").addEventListener("click", this.next.bind(this));
    }

    back() {
        //wird aufgerufen wenn nutzer zurück drückt
    }

    next() {
        //var message = this.win.querySelector(".msg").value;
        m.call("next")();
    }

    answer(msg, num){
        alert(msg);
        alert("btw this is an important number: "+num);
    }

}