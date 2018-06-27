  class scrdMobile {
      constructor(pWin) {
          this.win = pWin;
          this.currentApp = [];
          this.hash;
          this.initPageMaster();
      }

      get app() {
          return this.currentApp;
      }


      call(pFuncString) {
          var self = this;
          return function() {
              var args = [];
              for (var i = 0; i < arguments.length; i++)
                  args[i] = arguments[i];
              socket.emit('call', { call: pFuncString, arg: args });
          };
      }

      callAjax(url, callback) {
          var xmlhttp;
          // compatible with IE7+, Firefox, Chrome, Opera, Safari
          xmlhttp = new XMLHttpRequest();
          xmlhttp.onreadystatechange = function() {
              if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                  try {
                      var json = JSON.parse(xmlhttp.responseText);
                      callback(json);
                  } catch (e) {
                      console.log(e);
                      callback(xmlhttp.responseText);
                  }
              }
          }
          xmlhttp.open("GET", url, true);
          xmlhttp.send();
      }

      createWin() {
          this.win.getElementById("window").classList = "";
          return this.win.getElementById("window");
      }

      startApp(pApp, pName) {
          if (typeof pApp !== 'undefined') {
              this.currentApp = new pApp(this.createWin());
          } else {
              if (document.querySelectorAll('script[src="microapps/' + pName + 'Mobile.js"]').length == 0) {
                  loadJS("microapps/" + pName + "Mobile.js", function(pName) { this.startApp(window[pName + "Mobile"], pName); }.bind(this, pName));
              }
          }
      }

      setTheme(pSrc) {
          var themeIMG = document.getElementsByClassName("themeIMG");
          for (var i = 0; i < themeIMG.length; i++) {
              themeIMG[i].src = pSrc;
          }
      }

      exeFunction(pObj) {
          try {
              this.app[pObj.call].apply(this.app, pObj.arg);
          } catch (e) {
              console.log(e);
          }
      }

      back() {
          try {
              this.app.back()
          } catch (e) {
              console.log(e);
          }
      }

      initPageMaster() {
          this.hash = window.location.hash;
          setInterval(function() {
              if (window.location.hash != this.hash) {

                  if (parseInt(window.location.hash.replace("#", "")) < parseInt(this.hash.replace("#", ""))) {
                      this.back();
                  }


                  this.hash = window.location.hash;
              }
          }.bind(this), 100);
      }

      nextPage() {
          if (/^#\+?(0|[1-9]\d*)$/.test(window.location.hash)) {
              window.location.hash = "#" + (parseInt(window.location.hash.replace("#", "")) + 1);
          } else {
              window.location.hash = "#1";
          }
      }

      launch(pName) {
          socket.emit('startApp', pName);
      }

  }


  var loadJS = function(url, implementationCode, location) {
      //url is URL of external file, implementationCode is the code
      //to be called from the file, location is the location to 
      //insert the <script> element

      var scriptTag = document.createElement('script');
      scriptTag.src = url;

      scriptTag.onload = implementationCode;
      scriptTag.onreadystatechange = implementationCode;

      document.body.appendChild(scriptTag);
  };