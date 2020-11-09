$('.button-help').on('click', () => {
    playBitButton();
});


$('.close').on('click', () => {
    playBitButton();
});

let bgAudio;
$('.button-audio').on('click', () => {
    playBitButton();
    if (bgAudio.paused == false) {
        bgAudio.pause();

        $('.bgAudio').removeClass('fa-volume-up');
        $('.bgAudio').addClass('fa-volume-off');
        $('.bgAudio').css('color', 'red');
        
    } else {
        bgAudio.play();
        $('.bgAudio').removeClass('fa-volume-of');
        $('.bgAudio').addClass('fa-volume-up');
         $('.bgAudio').css('color', '#2e254d');
    }
});


const playBackgroundSong = () => {
    bgAudio = new Audio('./assets/audios/Dinner_for_Two.mp3');
    bgAudio.loop = true;
    bgAudio.autoplay = true;
};

//Play audio when plar click on help boutton
const playBitButton = () => {
    let audio = new Audio('./assets/audios/zapsplat_multimedia_click_002_19368.mp3');
    audio.autoplay = true;
};