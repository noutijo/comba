 

window.addEventListener('scroll', function () {
     if (window.pageYOffset >= 15)
         $('.damageInfos').fadeOut(500);
     if (window.pageYOffset < 15)
         $('.damageInfos').fadeIn(500);
 });


//Launch function after page loading
$(document).ready(function () {

    //Init infos Players coming from players set up
    let playerOneName = localStorage.playerOneName;
    let playerOnePicture = localStorage.playerOnePicture;
    let playerTwoName = localStorage.playerTwoName;
    let playerTwoPicture = localStorage.playerTwoPicture;

    //Place randomly default informations on the grid
    let grid = new Grid(10, 10);
    grid.placeObstacles(7);
    grid.placeWeapons();

    //Init player one 
    $('#playerOneName').text(playerOneName);
    $('#playerOnePicture').attr('src', './assets/imgs/players/' + playerOnePicture + '.png')

    //Init player two 
    $('#playerTwoName').text(playerTwoName);
    $('#playerTwoPicture').attr('src', './assets/imgs/players/' + playerTwoPicture + '.png')

    //Fade animation players informations block when page is reading
    $('#playerTwo').animate({
        opacity: 1
    }, 2000)
    $('#playerOne').animate({
        opacity: 1
    }, 2000);

});

