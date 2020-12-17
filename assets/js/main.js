 //Grid objetct
 let game, grid;

 //Function use to launch to control movement by using keydown
 window.addEventListener('keydown', function (event) {
     game.movePlayer(event.code);
 });

 //Function use to launch to control movement
 $('#root').on('click', (event) => {
     let player = (event.target.id).split('_');
     game.movePlayerByClick(new Cell(parseInt(player[1]), parseInt(player[2])));
 })

 //Launch function after page loading
 $(document).ready(function () {

     //Place randomly default informations on the grid
     grid = new Grid(10, 12);
     grid.placeObstacles();
     grid.placeWeapons();
     grid.placePlayers();
     game = new Game(grid);

     //Init player one infos
     $('#playerOneName').text(localStorage.playerOneName);
     $('#playerOnePicture').attr('src', './assets/imgs/players/' + localStorage.playerOnePicture + '.png')
     $('#playerOnePictureBatle').attr('src', './assets/imgs/players/' + localStorage.playerOnePicture + '.png')

     //Init player two infos
     $('#playerTwoName').text(localStorage.playerTwoName);
     $('#playerTwoPicture').attr('src', './assets/imgs/players/' + localStorage.playerTwoPicture + '.png')
     $('#playerTwoPictureBatle').attr('src', './assets/imgs/players/' + localStorage.playerTwoPicture + '.png')

     $('#PictureWinner').attr('src', './assets/imgs/players/' + localStorage.playerTwoPicture + '.png')

     //fadeIn on player's blocks when page is reading
     $('#playerTwo').animate({
         opacity: 1
     }, 2000)
     $('#playerOne').animate({
         opacity: 1
     }, 2000);

     //playBackgroundSong();
 });

 $('#newGame').on('click', () => {
     window.location.href = "./players.html";
 });

 $('#replayGame').on('click', () => {
     window.location.href = "./home.html";
 });