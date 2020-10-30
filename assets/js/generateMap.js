let playerOneName;
let playerOnePicture;
let playerTwoName;
let playerTwoPicture;



/*
  Store differents tools  like weapons, players and obstacles
 */

//players store
let players = [{
        name: "Carrot",
        position: {
            row: null,
            col: null,
        },
        src: "./assets/imgs/players/" + localStorage.playerOnePicture + ".png",
    },
    {
        name: "Orange",
        position: {
            row: null,
            col: null,
        },
        src: "./assets/imgs/players/" + localStorage.playerTwoPicture + ".png",
    },
];

//weapons store
let weapons = [{
        name: 'Carrot',
        domage: 40,
        position: {
            row: null,
            col: null
        },
        src: "./assets/imgs/weapons/carrot.png"
    },
    {
        name: "Orange",
        domage: 30,
        position: {
            row: null,
            col: null
        },
        src: "./assets/imgs/weapons/orange.png"
    },
    {
        name: "Grape",
        domage: 20,
        position: {
            row: null,
            col: null
        },
        src: "./assets/imgs/weapons/grape.png"
    },
    {
        name: "Apple",
        domage: 10,
        position: {
            row: null,
            col: null
        },
        src: "./assets/imgs/weapons/apple.png"
    },

]

//Panel class building //chaque block doit avoir son click event
class Panel {
    constructor() {
        this.wholeBox = new Map();
        this.numberObastacle = 7;
        this.numberWeapons = 4;
        this.numberplayers = 2;
    }

    makeGrid() {
        for (let row = 0; row < 10; row++) {
            for (let column = 0; column < 10; column++) {
                $('#root').append('<div id="box_' + row + '_' + column +'"class="box">' + row + ',' + column + ' </div>');
                this.wholeBox.set(row, column);
            }
        }
        $(".box").css('width', '10%');
        $(".box").css("height", "10%");
    }

    //Function call when want to display Obstacles
    positionObstacles() {

        let controleDisplayObstacles = 0;

        while (controleDisplayObstacles < this.numberObastacle) {
            let row = Math.floor(Math.random() * 10);
            let column = Math.floor(Math.random() * 10);
            let freeBoxObstacle = $('#box_' + row + '_' + column).hasClass('obstacles');

            if (!freeBoxObstacle) {
                $('#box_' + row + '_' + column).addClass('obstacles');
                controleDisplayObstacles++;
            } else {

            }
        }
    }

    //Function call when want to display Weapons
    positionWeapons() {
        let controleDisplayWeapons = 0;

        while (controleDisplayWeapons < weapons.length) {
            let row = Math.floor(Math.random() * 10);
            let column = Math.floor(Math.random() * 10);
            let freeBoxObstacle = $('#box_' + row + '_' + column).hasClass('obstacles');
            let freeBoxWeapon = $('#box_' + row + '_' + column).hasClass('weapon');

            if (!freeBoxObstacle && !freeBoxWeapon) {
                $("#box_" + row + "_" + column).css({
                    "background-image": "url(" + weapons[controleDisplayWeapons].src + ")",
                    "background-repeat": "no-repeat",
                    "background-size": "45px 50px",
                    "background-position": "center",
                });
                $('#box_' + row + '_' + column).addClass('weapon');
                controleDisplayWeapons++;
            } else {

            }
        }
    }

    positonPlayers() {
        let controleDisplayPlayers = 0;

        while (controleDisplayPlayers < players.length) {
            let row = Math.floor(Math.random() * 10);
            let column = Math.floor(Math.random() * 10);
            let freeBoxObstacle = $('#box_' + row + '_' + column).hasClass('obstacles');
            let freeBoxWeapon = $('#box_' + row + '_' + column).hasClass('weapon');
            let freeBoxPlayer = $('#box_' + row + '_' + column).hasClass('player');

            if (!freeBoxObstacle && !freeBoxWeapon && !freeBoxPlayer) {
                $("#box_" + row + "_" + column).css({
                    "background-image": "url(" + players[controleDisplayPlayers].src + ")",
                    "background-repeat": "no-repeat",
                    "background-size": "40px 50px",
                    "background-position": "center",
                });
                $('#box_' + row + '_' + column).addClass('player');
                $('#box_' + row + '_' + column).addClass('player' + controleDisplayPlayers);

                controleDisplayPlayers++;
            } else {

            }
        }
    }

}
//Function called if window is refreshed

//Color movement player to the Right
const colorMovementToRight=player=>{
    //Get players positions
    let test = $('.' + player).attr('id').split('_');

    let controlMakeDeplacement = 1;

    while (controlMakeDeplacement < 4) {

        let ifHasClassObstacles = $('#box_' + test[1] + "_" + (parseInt(test[2]) + controlMakeDeplacement)).hasClass('obstacles');
        let ifHasClassPlayer = $('#box_' + test[1] + "_" + (parseInt(test[2]) + controlMakeDeplacement)).hasClass('player');

        if (ifHasClassObstacles || ifHasClassPlayer) {
            controlMakeDeplacement = 5;
        } else {
            $('#box_' + test[1] + '_' + (parseInt(test[2]) + controlMakeDeplacement)).css('background-color', '#f1ebff');
            controlMakeDeplacement++;

        }
    }
}

//Color different movement
const colorDifferentMovements = player => {
      colorMovementToRight(player);
      colorMovementToLeft(player);
      colorMovementToUp(player);
      colorMovementToDown(player);
}

//Color movement player to the left
const colorMovementToLeft = player => {
    //Get players positions
    let test = $('.' + player).attr('id').split('_');

    let controlMakeDeplacement = 1;

    while (controlMakeDeplacement < 4) {

        let ifHasClassObstacles = $('#box_' + test[1] + "_" + (parseInt(test[2]) - controlMakeDeplacement)).hasClass('obstacles');
        let ifHasClassPlayer = $('#box_' + test[1] + "_" + (parseInt(test[2]) - controlMakeDeplacement)).hasClass('player');

        if (ifHasClassObstacles || ifHasClassPlayer) {
            controlMakeDeplacement = 5; //Break loop
        } else {
            $('#box_' + test[1] + '_' + (parseInt(test[2]) - controlMakeDeplacement)).css('background-color', '#f1ebff');
            controlMakeDeplacement++;

        }
    }
}

//Color movement player to the Up
const colorMovementToUp = player => {
    //Get players positions
    let test = $('.' + player).attr('id').split('_');

    let controlMakeDeplacement = 1;

    while (controlMakeDeplacement < 4) {

        let ifHasClassObstacles = $('#box_' + (parseInt(test[1]) - controlMakeDeplacement) + "_" + test[2]).hasClass('obstacles');
        let ifHasClassPlayer = $('#box_' + (parseInt(test[1]) - controlMakeDeplacement) + "_" + test[2]).hasClass('player');

        if (ifHasClassObstacles || ifHasClassPlayer) {
            controlMakeDeplacement = 5; //Break loop
        } else {
            $('#box_' + (parseInt(test[1]) - controlMakeDeplacement) + '_' + test[2]).css('background-color', '#f1ebff');
            controlMakeDeplacement++;

        }
    }
}

//Color movement player to the Down
const colorMovementToDown = player => {
    //Get players positions
    let test = $('.' + player).attr('id').split('_');

    let controlMakeDeplacement = 1;

    while (controlMakeDeplacement < 4) {

        let ifHasClassObstacles = $('#box_' + (parseInt(test[1]) + controlMakeDeplacement) + "_" + test[2]).hasClass('obstacles');
        let ifHasClassPlayer = $('#box_' + (parseInt(test[1]) + controlMakeDeplacement) + "_" + test[2]).hasClass('player');

        if (ifHasClassObstacles || ifHasClassPlayer) {
            controlMakeDeplacement = 5;
        } else {
            $('#box_' + (parseInt(test[1]) + controlMakeDeplacement) + '_' + test[2]).css('background-color', '#f1ebff');
            controlMakeDeplacement++;

        }
    }
}

//Function use to launch to control movement
 $('#root').on('click',(event)=>{
         alert(event.target.id);
})

//Launch function after page loading
$(document).ready(function () {

    //Init infos Players
    let playerOneName = localStorage.playerOneName;
    let playerOnePicture = localStorage.playerOnePicture;
    let playerTwoName = localStorage.playerTwoName;
    let playerTwoPicture = localStorage.playerTwoPicture;

    //fade animation players informations block when page is reading
    $('#playerTwo').animate({
        opacity: 1
    }, 2000)
    $('#playerOne').animate({
        opacity: 1
    }, 2000);

    //Player One init
    $('#playerOneName').text(playerOneName);
    $('#playerOnePicture').attr('src', './assets/imgs/players/' + playerOnePicture + '.png')

    //Player Two init
    $('#playerTwoName').text(playerTwoName);
    $('#playerTwoPicture').attr('src', './assets/imgs/players/' + playerTwoPicture + '.png')

    let panel = new Panel();
    panel.makeGrid();
    panel.positionObstacles();
    panel.positionWeapons();
    panel.positonPlayers();

    //Color Diferents Movements for player One
    colorDifferentMovements('player0');

    /*let audio = new Audio('./assets/audios/Dinner_for_Two.mp3');
    audio.autoplay=true;*/

});