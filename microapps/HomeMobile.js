  var HomeMobile = class HomeMobile {
      constructor(pWin) {
          this.win = pWin;
          this.name = "HOMEmobile";
          this.win.classList.add(this.name);
<<<<<<< HEAD
          this.html = "<div class=\"microAppBG\"> <img class=\"themeIMG\" src=\"http:\/\/kurzgesagt.org\/wp-content\/uploads\/2017\/06\/Start-Page_WhiteDwarfs.png\"> <\/div> <div class=\"microApp\"> <div class=\"main\"> <div class=\"navTop\"><h1>Home<\/h1><i class=\"navBtn ion-ios-more-outline\"><\/i><\/div> <div class=\"center\">  <h2>W\u00E4hle die zu startende App.<\/h2><div class=\"apps\"></div> <\/div><div class=\"bottom\"> <\/div> <\/div>";
=======
          this.html = "<div class=\"microAppBG\"> <img class=\"themeIMG\" src=\"http:\/\/kurzgesagt.org\/wp-content\/uploads\/2017\/06\/Start-Page_WhiteDwarfs.png\"> <\/div> <div class=\"microApp\"> <div class=\"main\"> <div class=\"navTop\"><h1>Home<\/h1><i class=\"navBtn ion-ios-more-outline\"><\/i><\/div> <div class=\"center\">  <h2>W\u00E4hle die zu startende App.<\/h2> <button  onclick=\"socket.emit(\'startApp\', \'YouTube\')\" class=\"normal\">YouTube<\/button><button  onclick=\"socket.emit(\'startApp\', \'Shutdown\')\" class=\"normal\">Shutdown<\/button> <button  onclick=\"socket.emit(\'startApp\', \'PDFViewer\')\" class=\"normal\">PDFViewer<\/button> <\/div><div class=\"bottom\"> <\/div> <\/div>";
>>>>>>> origin/shutdown
          this.start();
      }

      start() {
          this.win.innerHTML = this.html;
          loadJS("microapps/apps.js", this.showApps.bind(this));
      }

      showApps(){
        for (var i = apps.length - 1; i >= 0; i--) {
           this.win.querySelector(".apps").innerHTML += '<button onclick="m.launch(\''+apps[i]+'\');" class="normal">'+apps[i]+'</button><br><br>';      
        }
       
      }
  }
