class Grid {
    constructor(rows, columns) {
        this.rows = rows;
        this.columns = columns;
        this.numberWeapons = 4;
        this.numberPlayers = 2;
        this.weapons = [];
        this.obstaclesPodition = [];
        this.players = [];
        this.possibleDisplacement = [];
        this.buildGrid();
        this.bringRadiusEffect();
    }

    generateRandomX() {
        return Math.floor(Math.random() * this.rows);
    }
    generateRandomY() {
        return Math.floor(Math.random() * this.columns);
    }

    buildGrid() {
        for (let x = 0; x < this.rows; x++) {
            for (let y = 0; y < this.columns; y++) {
                $('#root').append('<div id="box_' + x + '_' + y + '"class="box">' + x + ',' + y + ' </div>');
            }
        }

        //Initialized boxes sizes
        $('.box').css('width', (100 / this.columns) + '%');
        $('.box').css('height', (100 / this.rows) + '%');
    }

    bringRadiusEffect() {
        $('#box_0_0').css('border-radius', '10px 0px 0px 0px');
        $('#box_0_' + (this.columns - 1)).css('border-radius', '0px 10px 0px 0px');
        $('#box_' + (this.rows - 1) + '_0').css('border-radius', '0px 0px 0px 10px');
        $('#box_' + (this.rows - 1) + '_' + (this.columns - 1)).css('border-radius', '0px 0px 10px 0px');
    }

    placeObstacles(numberOfObstacles) {
        let controleDisplayObstacle = 0;

        while (controleDisplayObstacle < numberOfObstacles) {
            let x = this.generateRandomX();
            let y = this.generateRandomY();

            if (this.isCellFree(x, y)) {
                $('#box_' + x + '_' + y).addClass('obstacle');

                //Add weapon on array's Obstacles
                this.obstaclesPodition.push(new Cell(x, y));
                controleDisplayObstacle++;
            }
        }
        console.log(this.obstaclesPodition);
    }

    placeWeapons() {
        let controleDisplayWeapon = 0;

        while (controleDisplayWeapon < this.numberWeapons) {
            let x = this.generateRandomX();
            let y = this.generateRandomY();

            if (this.isCellFree(x, y)) {
                $("#box_" + x + "_" + y).css({
                    "background-image": "url(" + weaponsStore[controleDisplayWeapon].src + ")"
                });
                $('#box_' + x + '_' + y).addClass('weapon');

                //Add weapon on array's weapons
                this.weapons.push(new Weapon(weaponsStore[controleDisplayWeapon].name, weaponsStore[controleDisplayWeapon].domage, new Cell(x, y), weaponsStore[controleDisplayWeapon].src));

                controleDisplayWeapon++;
            }
        }
        console.log(this.weapons);

    }

    placePlayers() {

        let controleDisplayPlayer = 0;

        while (controleDisplayPlayer < this.numberPlayers) {
            let x = this.generateRandomX();
            let y = this.generateRandomY();

            if (this.isCellFree(x, y) && this.isAroundCellFree((x - 1), y) && this.isAroundCellFree(x, (y + 1)) && this.isAroundCellFree((x + 1), y) && this.isAroundCellFree(x, (y - 1))) {
                $("#box_" + x + "_" + y).css({
                    "background-image": "url(" + playersStore[controleDisplayPlayer].src + ")"
                });
                $('#box_' + x + '_' + y).addClass('player');
                $('#box_' + x + '_' + y).addClass('player' + controleDisplayPlayer);

                //Add player infos on array's palyer
                this.players.push(new Player(playersStore[controleDisplayPlayer].name, new Cell(x, y), playersStore[controleDisplayPlayer].src));
                controleDisplayPlayer++;
            }
        }
        console.log(this.players);
        this.defineDeplacement("player0");
    }

    isCellFree(x, y) {
        if (!$('#box_' + x + '_' + y).hasClass('obstacle') && !$('#box_' + x + '_' + y).hasClass('weapon') && !$('#box_' + x + '_' + y).hasClass('player'))
            return true;
        else
            return false;
    }

    isAroundCellFree(x, y) {
        if (!$('#box_' + x + '_' + y).hasClass('obstacle') && !$('#box_' + x + '_' + y).hasClass('player'))
            return true;
        else
            return false;
    }

    defineDeplacement(player) {
        this.colorTop($('.' + player).attr('id').split('_'));
        this.colorRight($('.' + player).attr('id').split('_'));
        this.colorBottom($('.' + player).attr('id').split('_'));
        this.colorLeft($('.' + player).attr('id').split('_'));
    }

    colorTop(positionXY) {
        let control = 1;

        while (control < 4) {
            if (this.isColorable((parseInt(positionXY[1]) - control), parseInt(positionXY[2])) && this.isPositiveValue((parseInt(positionXY[1]) - control))) {
                $('#box_' + (parseInt(positionXY[1]) - control) + '_' + parseInt(positionXY[2])).css('background-color', '#f1ebff');

                //Save to possible deplecement 
                this.possibleDisplacement.push(new Cell((parseInt(positionXY[1]) - control), parseInt(positionXY[2])));
                control++;
            } else
                control = 5; //Break loop
        }

    }

    colorRight(positionXY) {
        let control = 1;

        while (control < 4) {
            if (this.isColorable(parseInt(positionXY[1]), (parseInt(positionXY[2]) + control)) && this.isLessThanNumberColumns((parseInt(positionXY[2]) + control))) {
                $('#box_' + parseInt(positionXY[1]) + '_' + (parseInt(positionXY[2]) + control)).css('background-color', '#f1ebff');

                //Save to possible deplecement 
                this.possibleDisplacement.push(new Cell(parseInt(parseInt(positionXY[1])), (parseInt(positionXY[2]) + control)));
                control++;
            } else
                control = 5; //Break loop
        }
    }


    colorBottom(positionXY) {
        let control = 1;

        while (control < 4) {
            if (this.isColorable((parseInt(positionXY[1]) + control), parseInt(positionXY[2])) && this.isLessThanNumberRows((parseInt(positionXY[1]) + control))) {
                $('#box_' + (parseInt(positionXY[1]) + control) + '_' + parseInt(positionXY[2])).css('background-color', '#f1ebff');

                //Save to possible deplecement 
                this.possibleDisplacement.push(new Cell((parseInt(positionXY[1]) + control), parseInt(positionXY[2])));
                control++;
            } else
                control = 5; //Break loop
        }
    }

    colorLeft(positionXY) {
        let control = 1;

        while (control < 4) {
            if (this.isColorable(parseInt(positionXY[1]), (parseInt(positionXY[2]) - control)) && this.isPositiveValue((parseInt(positionXY[2]) - control))) {
                $('#box_' + parseInt(positionXY[1]) + '_' + (parseInt(positionXY[2]) - control)).css('background-color', '#f1ebff');

                //Save to possible deplecement 
                this.possibleDisplacement.push(new Cell(parseInt(parseInt(positionXY[1])), (parseInt(positionXY[2]) - control)));
                control++;
            } else
                control = 5; //Break loop
        }

        console.log(this.possibleDisplacement)
    }

    isColorable(x, y) {
        if (!$('#box_' + x + "_" + y).hasClass('obstacle') && !$('#box_' + x + "_" + y).hasClass('player'))
            return true
        else return false
    }

    isPositiveValue(value) {
        if ((value >= 0 && value < this.columns) || (value >= 0 && value < this.rows))
            return true
        else return false
    }

    isLessThanNumberColumns(value) {
        if (value < this.columns)
            return true
        else return false
    }

    isLessThanNumberRows(value) {
        if (value < this.rows)
            return true
        else return false
    }

}