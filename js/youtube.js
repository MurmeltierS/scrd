var player,
    time_update_interval = 0;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('video-placeholder', {
        width: 600,
        height: 400,
        videoId: 'Xa0Q0J5tOP0',
        playerVars: {
            rel: 0,
			modestbranding: 0,
			controls: 0,
			showinfo: 0,
			autoplay: 1,
			iv_load_policy: 3
        },
        events: {
            onReady: initialize
        }
    });
}

function initialize(){

    // Update the controls on load
    //updateTimerDisplay();
    updateProgressBar();

    // Clear any old interval.
    clearInterval(time_update_interval);

    // Start interval to update elapsed time display and
    // the elapsed part of the progress bar every second.
    time_update_interval = setInterval(function () {
        //updateTimerDisplay();
        updateProgressBar();
    }, 1000);

    //s.io.emit('exeFunction', {call: "updateVolume", arg: [(Math.round(player.getVolume()))]});
    s.call("updateVolume")(Math.round(player.getVolume()));
    document.getElementById('volume-input').value = (Math.round(player.getVolume()));
}

// This function is called by initialize()
function updateProgressBar(){
    // Update the value of our progress bar accordingly.
    s.call("updateProgressBar")((player.getCurrentTime() / player.getDuration()) * 100);
}

