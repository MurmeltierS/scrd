  var HomeMobile = class HomeMobile {
      constructor(pWin) {
          this.win = pWin;
          this.name = "HOMEmobile";
          this.win.classList.add(this.name);
          this.html = "<div class=\"microAppBG\"> <img class=\"themeIMG\" src=\"http:\/\/kurzgesagt.org\/wp-content\/uploads\/2017\/06\/Start-Page_WhiteDwarfs.png\"> <\/div> <div class=\"microApp\"> <div class=\"main\"> <div class=\"navTop\"><h1>Home<\/h1><i class=\"navBtn ion-ios-more-outline\"><\/i><\/div> <div class=\"center\">  <h2>W\u00E4hle die zu startende App.<\/h2> <button  onclick=\"socket.emit(\'startApp\', \'YouTube\')\" class=\"normal\">YouTube<\/button><button  onclick=\"socket.emit(\'startApp\', \'Hello\')\" class=\"normal\">Hello<\/button> <\/div><div class=\"bottom\"> <\/div> <\/div>";
          this.start();
      }

      start() {
          this.win.innerHTML = this.html;
      }
  }