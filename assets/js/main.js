 //Grid objetct
 let game, grid;

 //Function use to launch to control movement by using keydown
 window.addEventListener('keydown', function (event) {

     game.movePlayer(event.code);

 });


 //Launch function after page loading
 $(document).ready(function () {

     //Place randomly default informations on the grid
     grid = new Grid(10, 11);
     grid.placeObstacles();
     grid.placeWeapons();
     grid.placePlayers();
     game = new Game(grid);

     //Init player one infos
     $('#playerOneName').text(localStorage.playerOneName);
     $('#playerOnePicture').attr('src', './assets/imgs/players/' + localStorage.playerOnePicture + '.png')

     //Init player two infos
     $('#playerTwoName').text(localStorage.playerTwoName);
     $('#playerTwoPicture').attr('src', './assets/imgs/players/' + localStorage.playerTwoPicture + '.png')

     //fadeIn on player's blocks when page is reading
     $('#playerTwo').animate({
         opacity: 1
     }, 2000)
     $('#playerOne').animate({
         opacity: 1
     }, 2000);

     // playBackgroundSong();
 });