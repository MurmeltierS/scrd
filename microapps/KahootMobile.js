var KahootMobile = class KahootMobile {
    constructor(pWin) {
        this.win = pWin;
        this.name = "KahootMobile";
        this.win.classList.add(this.name);
        this.html = "<div class=\"main\"> <div class=\"navTop\"><h1>Kahoot<\/h1><i class=\"navBtn ion-ios-more-outline\"><\/i><\/div><div class=\"wrapper\"><input placeholder=\"Benutzer oder Quiz\" type=\"text\" class=\"normal kaho\"><button class=\"small\" id=\"start\"><i class=\"ion-ios-search\"><\/i><\/button><br><div class=\"searchItems\"></div><\/div><\/div>";
        this.playHtml = "<div class=\"main\"> <div class=\"navTop\"><h1>Kahoot<\/h1><i class=\"navBtn ion-ios-more-outline\"><\/i><\/div><div class=\"center\"><h3>Players</h3><ul id=\"playerlist\"></ul><div class=\"bottom\"><button style=\"margin: 20px; width: calc(100% - 40px);\" class=\"normal\" id=\"next\">Next</button></div><\/div><\/div>";
        this.lastSearchUser = "";
        this.currentMode = "home";
        this.playerlist = [];
        this.start();
    }

    start() {
        this.screenHome();
    }

    back() {
        if (this.currentMode == "home") {
            m.launch('Home');
        } else
        if (this.currentMode == "search") {
            this.screenHome();
        } else {
            this.screenHome();
            this.win.querySelector(".kaho").value = this.lastSearchUser;
            this.searchUsername();
        }
    }

    screenHome() {
        this.currentMode = "home";
        this.win.innerHTML = this.html;
        this.win.querySelector("#start").addEventListener("click", this.searchUsername.bind(this));
    }

    openQuiz(qid) {
        m.nextPage();
        this.currentMode = "play";
        m.call("openQuiz")(qid);
        this.win.innerHTML = this.playHtml;
        this.win.querySelector("#next").addEventListener("click", this.next.bind(this));
    }

    next(){
        m.call("next")();
    }

    setPlayerList(playerlist){
        this.playerlist = playerlist;
        var domItems = this.win.querySelector("#playerlist");
        domItems.innerHTML = "";
        for (var i = playerlist.length - 1; i >= 0; i--) {
            var tempItem = document.createElement("LI");
            tempItem.innerHTML = playerlist[i];
            domItems.append(tempItem);
        }
    }

    searchUsername() {
        m.nextPage();
        this.currentMode = "search";
        var user = this.win.querySelector(".kaho").value;
        this.lastSearchUser = user;
        m.call("searchUsername")(user);
    }

    displaySearch(obj) {
        console.log("displaySearch");
        console.log(obj);
        var items = obj.entities;
        var domItems = this.win.querySelector(".searchItems");
        domItems.innerHTML = "";
        for (var i = 0; i < items.length; i++) {
            if (true) {
                var tempItem = document.createElement("DIV");
                tempItem.classList.add("searchItem");
                tempItem.innerHTML = '<img src="' + ((typeof items[i].card.cover !== 'undefined') ? items[i].card.cover : "") + '" class="thumb"><h3>' + items[i].card.title + '</h3>';
                var uuid = items[i].card.uuid;
                tempItem.addEventListener("click", function(uuid) { this.openQuiz(uuid) }.bind(this, uuid), false);
                domItems.append(tempItem);
            }
        }
    }

}