$('.button-help').on('click', () => {
    playBitButton();
});


$('.close').on('click', () => {
    playBitButton();
});

 //This funtion is called went the user click on let's go button
 $('#button-go').on('click', () => {
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
    bgAudio = new Audio('./assets/audios/DinnerForTwo.mp3');
    bgAudio.currentTime=4000;
    bgAudio.loop = true;
    bgAudio.autoplay = true;
};

//Play audio when plar click on help boutton
const playBitButton = () => {
    let audio = new Audio('./assets/audios/clickButton.mp3');
    audio.autoplay = true;
};

//Play audio danger when click on cell that play can't move on
const playDanger = () => {
    let audio = new Audio('./assets/audios/danger.mp3');
    audio.autoplay = true;
};

//Play audio success when click on cell that play can move on
const playSucess = () => {
    let audio = new Audio('./assets/audios/validated.mp3');
    audio.autoplay = true;
};