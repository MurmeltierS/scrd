var YouTubeMobile = class YouTubeMobile {
    constructor(pWin) {
        console.log(this);

        this.win = pWin;
        this.name = "YOUTUBEmobile";
        this.win.classList.add(this.name);
        this.volume = 100;
        this.play = true;
        this.currentMode = "home";
        this.searchHtml = '<div class=\"main\"><div class=\"navTop\"><h1>YouTube<\/h1><i class=\"navBtn ion-ios-more-outline\"><\/i><\/div><div class=\"wrapper\"><input type=\"text\" class=\"normal searchInput\"><button class=\"small searchBtn\"><i class=\"ion-ios-search\"><\/i></button><br><div class="searchItems"></div><div></div>';
        this.videoHtml = "<div class=\"main\"> <div class=\"navTop\"><h1>YouTube<\/h1><i class=\"navBtn ion-ios-more-outline\"><\/i><\/div> <div class=\"center\"> <div class=\"preview\"> <img class=\"themeIMG\" src=\"http:\/\/kurzgesagt.org\/wp-content\/uploads\/2017\/06\/Start-Page_WhiteDwarfs.png\"> <h2 class=\"videoTitle\">...<\/h2> <\/div> <\/div> <div class=\"bottom\"> <div class=\"sliderWrapper\"> <input id=\"ytProg\" class=\"slider\" oninput=\"console.log('range:'+this.value)\" type=\"range\" value=\"0\" steps=\"0.01\"> <\/div> <div class=\"controls\"> <button class=\"\"><i class=\"ion-ios-rewind-outline\"><\/i><\/button> <button id=\"ytPlay\" class=\"play\"><i id=\"playBTN\" class=\"ion-ios-pause-outline\"><\/i><\/button> <button class=\"\"><i class=\"ion-ios-fastforward-outline\"><\/i><\/button> <\/div> <\/div> <\/div>";
        this.start();

    }

    start() {
        this.screenSearch();


    }

    back() {
        if (this.currentMode == "home") {
            m.startApp(Home);
        } else {
            this.screenSearch();
        }
    }

    screenSearch() {
        this.currentMode = "home";
        m.nextPage();
        this.win.innerHTML = this.searchHtml;
        this.win.querySelector(".searchBtn").addEventListener("click", this.clickSearch.bind(this), false);
    }

    clickSearch() {
        m.nextPage();
        this.win.querySelector(".searchItems").innerHTML += "";
        console.log("clickSearch");
        console.log(this);
        this.searchVideo(this.win.querySelector(".searchInput").value);
    }

    toggle() {
        //console.log("play:" + self.play);
        if (!this.play) {
            m.call("play")();
            console.log("play");
            document.getElementById("playBTN").classList = "ion-ios-pause-outline";
            this.play = true;
        } else {
            m.call("pause")();
            console.log("pause");
            document.getElementById("playBTN").classList = "ion-ios-play-outline";
            this.play = false;
        };
    }

    setTitle(pTitle) {
        this.win.querySelector(".videoTitle").innerHTML = pTitle;
    }

    searchVideo(pTerm) {
        console.log("term: " + pTerm);
        m.callAjax("https://www.googleapis.com/youtube/v3/search?q=" + pTerm + "&maxResults=25&part=snippet&key=" + keys.YT, this.displaySearch.bind(this));
    }

    displaySearch(obj) {
        console.log("displaySearch");
        console.log(obj);
        var items = obj.items;
        var domItems = this.win.querySelector(".searchItems");
        domItems.innerHTML = "";
        for (var i = 0; i < items.length; i++) {
            if (items[i].id.kind == "youtube#video") {
                var tempItem = document.createElement("DIV");
                tempItem.classList.add("searchItem");
                tempItem.innerHTML = '<img src="' + items[i].snippet.thumbnails.medium.url + '" class="thumb"><h3>' + items[i].snippet.title + '</h3>';
                var videoId = items[i].id.videoId;
                tempItem.addEventListener("click", function(videoId) { this.loadVideo(videoId) }.bind(this, videoId), false);
                domItems.append(tempItem);
            }
        }
    }

    loadVideo(pID) {
        this.currentMode = "video";
        m.nextPage();
        this.win.innerHTML = this.videoHtml;
        this.play = true;
        document.getElementById("ytPlay").addEventListener("click", this.toggle.bind(this), false);
        m.call("loadVideo")(pID);
        m.setTheme("https://img.youtube.com/vi/" + pID + "/maxresdefault.jpg");

    }

    updateVolume(pVol) {
        this.volume = pVol;
    }

    updateProgressBar(pVal) {
        document.getElementById("ytProg").value = pVal;
    }
}