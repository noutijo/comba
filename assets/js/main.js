 //Function use to launch to control movement
 $('#root').on('click', (event) => {
     alert(event.target.id);
 })
 //Control the weapns infos displayment
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
     let grid = new Grid(10, 11);
     grid.placeObstacles();
     grid.placeWeapons();
     grid.placePlayers();

     //Init player one infos
     $('#playerOneName').text(playerOneName);
     $('#playerOnePicture').attr('src', './assets/imgs/players/' + playerOnePicture + '.png')

     //Init player two infos
     $('#playerTwoName').text(playerTwoName);
     $('#playerTwoPicture').attr('src', './assets/imgs/players/' + playerTwoPicture + '.png')

     //fadeIn on player's blocks when page is reading
     $('#playerTwo').animate({
         opacity: 1
     }, 2000)
     $('#playerOne').animate({
         opacity: 1
     }, 2000);

     playBackgroundSong();
 });


