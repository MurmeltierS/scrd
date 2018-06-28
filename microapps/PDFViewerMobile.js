var PDFViewerMobile= class PDFViewerMobile {
    constructor(pWin) {
        this.win = pWin;
        this.name = "PDFViewerMobile";
        this.win.classList.add(this.name);
        this.html = "<input id=\"uploadfile\" type=\"file\" /><input id=\"upload\" type=\"button\" value=\"clickme\" /><br><img id=\"pv\" src=\"\" height=\"500\" width=\"500\" alt=\"Image preview...\">";
        this.lastSearchTerm = "";
        this.start();
    }

    start() {
        m.nextPage();
        this.win.innerHTML = this.html;
        this.win.querySelector("#upload").addEventListener("click", this.startupload.bind(this), false); 
    }

    back() {
        m.launch('Home');
    }

    startupload() {
        var file = document.getElementById("uploadfile").files[0]
        var preview = document.getElementById("pv");;
        //var file    = document.querySelector('input[type=file]').files[0];
        var reader  = new FileReader();

        reader.addEventListener("load", function () {
            m.call("display")(reader.result);
        }, false);

        if (file) {
            reader.readAsDataURL(file);
        }
    }
}
