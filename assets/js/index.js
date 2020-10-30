//Launch function after page loading
$(document).ready(function () {


//This function is called went the user click on help button
    $('.button-help').on('click', () => {
         playBit();
    });

    //This function is called went the user click on close button
    $('.close').on('click', () => {
         playBit();
    });

    //This funtion is called went the user click on let's go button
    $('#button-go').on('click', () => {
        playBit();
    });
});

//Play bit when button is called

const playBit=()=>{
    let audio = new Audio('./assets/audios/zapsplat_multimedia_click_002_19368.mp3');
    audio.autoplay = true;
}