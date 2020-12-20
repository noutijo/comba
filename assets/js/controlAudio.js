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
        $('.bgAudio').removeClass('fa-volume-up').addClass('fa-volume-off').css('color', 'red'); 
    } else {
        bgAudio.play();
        $('.bgAudio').removeClass('fa-volume-of').addClass('fa-volume-up').css('color', '#2e254d');
    }
});

const playBackgroundSong = () => {
    bgAudio = new Audio('./assets/audios/DinnerForTwo.mp3');
    bgAudio.loop = true;
    bgAudio.autoplay = true;
};

//Play audio when plar click on help boutton
const playBitButton = () => {
    startPlay("clickButton");
};

//Play audio danger when click on cell that play can't move on
const playDanger = () => {
    startPlay("danger");
};

//Play audio success when click on cell that play can move on
const playSucess = () => {
    startPlay("validated");
};

//Play audio pick weapon when click on cell that play can move on
const playPickWeapon = () => {
    startPlay("pick")
};

const startPlay = (song) => {
    let audio = new Audio('./assets/audios/'+song+'.mp3');
    audio.autoplay = true;
}