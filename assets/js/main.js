 //Grid objetct
 let grid;
 let Playere;

 //Function use to launch to control movement
 $('#root').on('click', (event) => {
     let player = (event.target.id).split('_');

     grid.movePlayer(new Cell(parseInt(player[1]), parseInt(player[2])));
 })

 //Function use to launch to control movement bu using keydown
 window.addEventListener('keydown', function (event) {

     if (event.code ==='ArrowUp') {
         console.log("up");
     }
     if (event.code === 'ArrowRight') {
         console.log("Right");
     }
     if (event.code === 'ArrowDown') {
         console.log("Down");
     }
     if (event.code === 'ArrowLeft') {
         console.log("Left");
     }


 });


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