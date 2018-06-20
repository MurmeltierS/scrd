var YouTube = class YouTube {
    constructor(pWin) {
        this.win = pWin;
        this.name = "YT";
        this.id = "";
        this.win.classList.add(this.name);
        this.html = "<img class=\"logo\" src=\"img/yt_logo_rgb_dark.png\"> <div id=\"video-placeholder\"></div>";
        this.start();
    }

    startVideo() {
        console.log("js loaded");
        console.log(this);
        this.player = new YT.Player('video-placeholder', {
            width: 100,
            height: 100,
            videoId: this.id,
            playerVars: {
                rel: 0,
                modestbranding: 0,
                controls: 0,
                showinfo: 0,
                autoplay: 1,
                iv_load_policy: 3
            },
            events: {
                onReady: this.init.bind(this),
                onPlaybackQualityChange: this.resChange.bind(this)
            }
        });
        //s.setInterval(this.update.bind(this), 200);
    }

    init() {
        console.log("this init:");
        console.log(this);
        s.setInterval(this.update.bind(this), 200);
    }

    resChange(e) {
        console.log("reschange");
        console.log(e);
    }

    loadVideo(pID) {
        console.log("loadVideo:" + pID);
        this.id = pID;
        if (typeof player !== 'undefined') {
            try {
                this.player.loadVideoById(this.id, 0);
            } catch (e) {
                this.startVideo();
            }
        } else {
            loadJS('js/youtube.js', this.startVideo.bind(this), document.body);
        }

        s.setTheme("https://img.youtube.com/vi/" + pID + "/maxresdefault.jpg");

    }

    play() {
        this.player.playVideo();
    }

    pause() {
        this.player.pauseVideo();
    }

    start() {
        this.win.innerHTML = this.html;
    }

    updateProgress(val) {
        var newTime = this.player.getDuration() * (val / 100);
        this.player.seekTo(newTime);
    }

    update() {
        //console.log(this);
        try {
            s.call("setTitle")(this.player.getVideoData().title);
            s.call("updateProgressBar")((this.player.getCurrentTime() / this.player.getDuration()) * 100);
        } catch (e) {
            console.log(e);
        }
    }

}