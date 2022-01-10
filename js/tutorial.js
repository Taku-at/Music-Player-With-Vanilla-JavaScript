/*---- Controlls ----*/
let prevBtn = document.querySelector('#prev');
let playBtn = document.querySelector('#play');
let nextBtn = document.querySelector('#next');
/*---- /Controlls ----*/
/*---- Artist Info ----*/
let title = document.querySelector('#title');
let artist = document.querySelector('#artist');
/*---- /Artist Info ----*/
/*---- Volume ----*/
let currentVolume = document.querySelector('#volume');
let volumeShow = document.querySelector('#volume_show');
/*---- /Volume ----*/
/*---- Slider ----*/
let slider = document.querySelector('#duration_slider');
let showDuration = document.querySelector('#show_duration');
let autoPlayBtn = document.querySelector('#auto');
/*---- /Slider ----*/
/*---- Song Number ----*/
let current = document.querySelector('#current');
let total = document.querySelector('#total');
/*---- /Song Number ----*/
let trackImage = document.querySelector('#track_image');

let timer;
let autoPlay = true;

let index_num = 0;
let playing_song = false;



// Create audio Element
let track = document.createElement('audio');

//**  All Songs List use file or src link
let allSong = [
    {
        name: 'song1',
        path: 'src/song1.mp3',
        // img: '$file path is here',
        img: 'https://dr.savee-cdn.com/things/5/d/6f0426af2b75677cb68ab0.jpg',
        singer: 'Cool Baker',
    },

    {
        name: 'song2',
        path: 'src/song2.mp3',
        // img: '$file path is here',
        img: 'https://dr.savee-cdn.com/things/5/d/35b3176b438e430e96e9db.jpg',
        singer: 'Hot Baker',
    },

    {
        name: 'song3',
        path: 'src/song3.mp3',
        // img: '$file path is here',
        img: 'https://dr.savee-cdn.com/things/6/1/d6c170a0032c9cbecbad9c.jpg',
        singer: 'Nature Baker',
    }
]
//** End of All Songs List use file or src link


//** All functions
// Function to load the track so get the track information
function loadTrack(index_num) {
    clearInterval();
    resetSldier();

    track.src = allSong[index_num].path;
    title.innerHTML = allSong[index_num].name;
    trackImage.src = allSong[index_num].img;
    artist.innerHTMl = allSong[index_num].singer;

    // Link the index as song track number
    //!  Total song number is equal to allSong which we have it.
    total.innerHTML = allSong.length; // Correspond total number of index.
    current.innerHTML = index_num + 1; // Increment
    // End of Link the index as song track number

    timer = setInterval(sliderRange, 1000); // Proceed the second simultaneously playing a song
}

loadTrack(index_num);

// Checking the song whether playing or not
// ** Try to refactor the code
// playBtn.addEventListener('click', function() {
//     if(playing_song === false) {
//         toPlay();
//     } else {
//         toPause();
//     }
// })
function listen() {
    if(playing_song === false) {
        toPlay();
    } else {
        toPause();
    }
    // playing_song === false ? playSong() : pauseSong();
}

// Play song function
//* track play, change the status, replace the play icon
function toPlay() {
    track.play();
    playing_song = true;
    playBtn.innerHTML = '<i class="fa fa-pause"></i>';
}

// Pause song function
function toPause() {
    track.pause();
    playing_song = false;
    playBtn.innerHTML = '<i class="fa fa-play"></i>';
}

// Next Song function  
function nextSong() {
    if(index_num < allSong.length - 1) {
        index_num += 1;
        loadTrack(index_num); // get the track information
        toPlay();
    } else {
        index_num = 0;
        loadTrack(index_num);
        toPlay();
    }
}

// Previous Song function
function previousSong() {
    if(index_num > 0) {
        index_num -= 1;
        loadTrack(index_num);
        toPlay();
    } else {
        index_num = allSong.length - 1; // Back the track formula is total length minus -1 as one click.
        // index_num = allSong.length; // back to the index number 
        loadTrack(index_num);
        toPlay();
    }
}

/*--- Change Volumne ---*/
function volumeChange() {
    volumeShow.innerHTML = currentVolume.value;
    track.volume = currentVolume.value / 100; // Set the reange as 100
}

// ! Doesn't work I hove to fix below code which is smooth change volume
// volume.addEventListener('keydown', function() {
//     volumeChange();
// })
/*--- /Change Volumne ---*/

/*--- Change Slider Position ---*/
function changeDuration() {
    sliderPosition = track.duration * (slider.value / 100);
    track.currentTime = sliderPosition;
}


function sliderRange() {
    let position = 0;

    // Update slider position
    if(!isNaN(track.duration)){
        // If duration is not zero this is true
        position = track.currentTime * (100 / track.duration); // Calcurate max volume divide the track duration
        slider.value = position;
    }

    // Function will run when the song is over
    if(track.ended) {
        // When track end play icon will be changed
        playBtn.innerHTML = '<i class="fa fa-play" aria-hidden="true"></li>';

        // If autoplay is still working then play next song
        if(autoPlay === true) {
            index_num += 1;
            loadTrack(index_num);
            toPlay()
        }
    }
}

// Reset slider duration function
function resetSldier() {
    slider.value = 0;
    console.log('this is work')
}
/*--- /Change Slider Position ---*/

/*--- autoPlayBtn ---*/
function autoSwitch(){
    if(autoPlay === true) {
        autoPlay = false;
        autoPlayBtn.style.background = "rgba(255, 255, 255, .2)";
    } else {
        autoPlay = true;
        autoPlayBtn.style.background = "#ff8a65";
    }

    if(index_num === allSong.length) {
        autoPlay = false;
        autoPlayBtn.style.background = "rgba(255, 255, 255, .2)";
    }
}
/*--- /Autoplay ---*/

/*--- Mute ---*/
function muteSound() {
    track.volume = 0; // Set the propery and value when the player muted. Sound is muted.
    volume.value = 0; // Value will be set zero. Visual value.
    volumeShow.innerHTML = 0; // Volume element to be override to be zero.
}
/*--- /Mute ---*/