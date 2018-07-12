  var HomeMobile = class HomeMobile {
      constructor(pWin) {
          this.win = pWin;
          this.name = "HomeMobile";
          this.win.classList.add(this.name);
          this.html = "<div class=\"microAppBG\"> <img class=\"themeIMG\" src=\"http:\/\/kurzgesagt.org\/wp-content\/uploads\/2017\/06\/Start-Page_WhiteDwarfs.png\"> <\/div> <div class=\"microApp\"> <div class=\"main\"> <div class=\"navTop\"><h1>Home<\/h1><i class=\"navBtn ion-ios-more-outline\"><\/i><\/div> <div class=\"center\"> <div class=\"wrapper\"> <h2>W\u00E4hle die zu startende App.<\/h2><div style=\"width:100%;min-height: 120vh\" class=\"apps\"></div> </div><\/div><\/div>";
          this.start();
      }

      start() {
          m.nextPage();
          this.win.innerHTML = this.html;
          loadJS("microapps/apps.js", this.showApps.bind(this));
      }

      showApps() {
          for (var i = 0; i < apps.length; i++) {
              this.win.querySelector(".apps").innerHTML += '<button onclick="m.launch(\'' + apps[i] + '\');" class="normal">' + apps[i] + '</button><br><br>';
          }

      }
  }