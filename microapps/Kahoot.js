var Kahoot = class Kahoot {
    constructor(pWin) {
        this.win = pWin;
        this.name = "Kahoot";
        this.win.classList.add(this.name);
        this.html = "";
        this.start();
    }

    start() {
        this.win.innerHTML = this.html;
        setInterval(this.getPlayerList.bind(this), 2000);
    }

    openQuiz(qid) {
        this.win.innerHTML = '<iframe style="width: 100vw; height: 100vh; border: none; margin: 0;" onload="this.contentWindow.focus()" src="https://play.kahoot.it/#/lobby?quizId=' + qid + '"></iframe>';
    }

    searchUsername(user) {
        console.log("https://create.kahoot.it/rest/kahoots/?cursor=0&limit=25&topics=&grades=&orderBy=relevance&searchCluster=1&includeExtendedCounters=false&creator="+user+"");
        s.callAjax("https://create.kahoot.it/rest/kahoots/?cursor=0&limit=25&topics=&grades=&orderBy=relevance&searchCluster=1&includeExtendedCounters=false&creator="+user+"", function(e) { s.call("displaySearch")(JSON.parse(e)); });
    }

    next(){
        remote.getGlobal('win').webContents.sendInputEvent({keyCode: ' ', type: 'keyUp'});
    }

    getPlayerList(){
        var playerlist;
        if(this.win.querySelector("iframe").contentWindow.document.querySelectorAll(".player-list").length != 0){
            playerlist = Array.from(this.win.querySelector("iframe").contentWindow.document.querySelectorAll(".player-list li span")).map(function(e){return e.innerHTML;});
            s.call("setPlayerList")(playerlist);
        }
    }

}