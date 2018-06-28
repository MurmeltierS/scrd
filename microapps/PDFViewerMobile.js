var PDFViewerMobile = class PDFViewerMobile {
    constructor(pWin) {
        this.win = pWin;
        this.name = "PDFViewerMobile";
        this.win.classList.add(this.name);
        this.html = "<div class=\"main\"><div class=\"navTop\"><h1>PDFs<\/h1><i onclick=\"m.launch('Home')\" class=\"navBtn ion-ios-arrow-left\"><\/i><\/div><div class=\"center\"><label for=\"uploadfile\">Datei wählen</label><input class=\"inputfile\" name=\"uploadfile\" id=\"uploadfile\" type=\"file\" /><br><br><button class=\"normal\" id=\"upload\">Upload</button><br></div><div class=\"pvScroll\"><div class=\"fill\"><img id=\"pv\" src=\"\"  alt=\"Image preview...\"></div></div>";
        this.lastSearchTerm = "";
        this.scrollTimeout = null;
        this.start();
    }

    start() {
        m.nextPage();
        this.win.innerHTML = this.html;
        this.win.querySelector("#upload").addEventListener("click", this.startupload.bind(this), false);
        this.win.querySelector(".pvScroll").addEventListener("scroll", this.handleScroll.bind(this), false);
    }

    back() {
        m.launch('Home');
    }


    handleScroll(e) {
        if (this.scrollTimeout) {
            clearTimeout(this.scrollTimeout);
        }
        this.scrollTimeout = setTimeout(this.afterScroll.bind(this), 500);
    }


    afterScroll() {
        console.log("you just scrolled");
        var scroll = this.win.querySelector(".pvScroll").scrollTop / this.win.querySelector("#pv").height;
        m.call("scrollTo")(scroll);
    }

    setPv(data, lastPos) {
        document.getElementById("pv").src = data;
        if (lastPos == this.win.querySelector(".pvScroll").scrollTop / this.win.querySelector("#pv").height) {
            this.win.querySelector("#pv").style.top = this.win.querySelector(".pvScroll").scrollTop + "px";
        }
    }

    startupload() {
        var file = document.getElementById("uploadfile").files[0]
        var preview = document.getElementById("pv");;
        //var file    = document.querySelector('input[type=file]').files[0];
        var reader = new FileReader();

        reader.addEventListener("load", function() {
            m.call("display")(reader.result);
        }, false);

        if (file) {
            reader.readAsDataURL(file);
        }
    }
}