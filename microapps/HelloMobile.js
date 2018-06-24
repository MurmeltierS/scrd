var HelloMobile = class HelloMobile {
    constructor(pWin) {
        this.win = pWin;
        this.name = "HelloMobile";
        this.win.classList.add(this.name);
        this.html = "<div class=\"main\"> <div class=\"navTop\"><h1>Hello<\/h1><i class=\"navBtn ion-ios-more-outline\"><\/i><\/div> <div class=\"center\"><input type=\"text\" class=\"normal msg\"><br><button class=\"normal\" id=\"heyho\">Say Hello<\/button><\/div><\/div>";
        this.lastSearchTerm = "";
        this.start();
    }

    start() {
        this.win.innerHTML = this.html;
        this.win.querySelector("#heyho").addEventListener("click", this.sayHello.bind(this));
    }

    back() {
        //wird aufgerufen wenn nutzer zurück drückt
    }

    sayHello() {
        var message = this.win.querySelector(".msg").value;
        m.call("hello")(message);
    }

    answer(msg, num){
        alert(msg);
        alert("btw this is an important number: "+num);
    }

}