let playerOneName = "Player1";
let playerOnePicture = "girl01";
let playerTwoName = "Player2";
let playerTwoPicture = "boy01";

//This function is called went the user click on playerOneSelectedPictureOne image
$('#playerOneSelectedPictureOne').on('click', () => {
    updatedChoosePicture("#playerOneChoosePicture", '#playerOneSelectedPictureOne', '#playerOneSelectedPictureTwo', 'girl01.png');
    PlayerOnePicture = "girl01";
});

//This function is called went the user click on playerOneSelectedPictureTwo image
$('#playerOneSelectedPictureTwo').on('click', () => {
    updatedChoosePicture("#playerOneChoosePicture", '#playerOneSelectedPictureTwo', '#playerOneSelectedPictureOne', 'girl02.png');
    playerOnePicture = "girl02";
});

//This function is called went the user click on playerTwoSelectedPictureOne image
$('#playerTwoSelectedPictureOne').on('click', () => {
    updatedChoosePicture("#playerTwoChoosePicture", '#playerTwoSelectedPictureOne', '#playerTwoSelectedPictureTwo', 'boy01.png');
    playerTwoPicture = "boy01";
});

//This funtion is called went the user click on playerTwoSelectedPictureTwo image
$('#playerTwoSelectedPictureTwo').on('click', () => {
    updatedChoosePicture("#playerTwoChoosePicture", '#playerTwoSelectedPictureTwo', '#playerTwoSelectedPictureOne', 'boy02.png');
    playerTwoPicture = "boy02";
});

//Update pictures choose for the players
const updatedChoosePicture = (p1, p2, p3, src) => {
    $(p1).attr("src", "./assets/imgs/players/" + src);
    $(p2).addClass('make-border');
    $(p3).removeClass('make-border');
    let audio = new Audio('./assets/audios/zapsplat_multimedia_click_002_19368.mp3');
    audio.autoplay = true;
}

//Typing control name for player1
$('#playerOneNameInput').keyup(() => {
    $('#cannotSameNames').hide();
    if ($('#playerOneNameInput').val() === "") {
        $('#namePlayerOne').text("Playe1 by default");
        playerOneName = "Player1"
    } else {
        $('#namePlayerOne').text($('#playerOneNameInput').val());
        playerOneName = $('#playerOneNameInput').val();
    }

});

//Typing control name for player2
$('#playerTwoNameInput').keyup(() => {
    $('#cannotSameNames').hide();
    if ($('#playerTwoNameInput').val() === "") {
        $('#namePlayerTwo').text("Playe2 by default");
        playerTwoName = 'Player02';
    } else {
        $('#namePlayerTwo').text($('#playerTwoNameInput').val());
        playerTwoName = $('#playerTwoNameInput').val();
    }
});

//Validated players informations
$('#button-go').on('click', () => {
    if (playerOneName.toLowerCase() === playerTwoName.toLowerCase()) {
        $('#cannotSameNames').show();
    } else {
        
        localStorage.playerOneName = playerOneName;
        localStorage.playerOnePicture = playerOnePicture;
        localStorage.playerOnePictureDisplay = playerOnePicture;

        localStorage.playerTwoName = playerTwoName;
        localStorage.playerTwoPicture = playerTwoPicture;
        window.location.href = "./home.html";

        //Play audio before redirection
        let audio = new Audio('./assets/audios/zapsplat_multimedia_click_002_19368.mp3');
        audio.autoplay = true;
    }
});