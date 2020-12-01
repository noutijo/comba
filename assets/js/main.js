 //Grid objetct
 let grid;
 let playerOneControle = true;
 let playerTwoControle = false;

 //Function use to launch to control movement
 $('#root').on('click', (event) => {
     let player = (event.target.id).split('_');

     movePlayerOnClick(new Cell(parseInt(player[1]), parseInt(player[2])));
 })

 //Function use to launch to control movement bu using keydown
 window.addEventListener('keydown', function (event) {

     if (event.code === 'ArrowUp') {
         if (playerOneControle) {
             let cell = grid.players[0].position;
             let cellUp = cell.up;

             movePlayerKeyUp(0, 1, cell, cellUp);

             turnPlayerTwo();
         } else {
             let cell = grid.players[1].position;
             let cellUp = cell.up;

             movePlayerKeyUp(1, 0, cell, cellUp);
             turnPlayerOne();
         }
     }
     if (event.code === 'ArrowRight') {
         if (playerOneControle) {
             let cell = grid.players[0].position;
             let cellRight = cell.right;

             movePlayerKeyUp(0, 1, cell, cellRight);
         } else {
             let cell = grid.players[1].position;
             let cellRight = cell.right;

             movePlayerKeyUp(1, 0, cell, cellRight);
         }
     }
     if (event.code === 'ArrowDown') {
         if (playerOneControle) {
             let cell = grid.players[0].position;
             let cellDown = cell.down;

             movePlayerKeyUp(0, 1, cell, cellDown);
         } else {
             let cell = grid.players[1].position;
             let cellDown = cell.down;

             movePlayerKeyUp(1, 0, cell, cellDown);
         }
     }
     if (event.code === 'ArrowLeft') {
         if (playerOneControle) {
             let cell = grid.players[0].position;
             let cellLeft = cell.left;

             movePlayerKeyUp(0, 1, cell, cellLeft);
         } else {
             let cell = grid.players[1].position;
             let cellLeft = cell.left;

             movePlayerKeyUp(1, 0, cell, cellLeft);
         }
     }


 });

 const turnPlayerOne = () => {
     playerOneControle = true;
     playerTwoControle = false;
 }
 const turnPlayerTwo = () => {
     playerOneControle = false;
     playerTwoControle = true;
 }

 //Launch function after page loading
 $(document).ready(function () {

     //Place randomly default informations on the grid
     grid = new Grid(10, 11);
     grid.placeObstacles();
     grid.placeWeapons();
     grid.placePlayers();

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