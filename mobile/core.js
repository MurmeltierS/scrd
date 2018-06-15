  class scrdMobile {
      constructor(pWin) {
          this.win = pWin;
          this.currentApp = [];
          this.hash;
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

      startApp(pApp) {
          this.currentApp = new pApp(this.createWin());
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
                  if (window.location.hash < this.hash) {
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

  }