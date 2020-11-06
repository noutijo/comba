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
    }

    generateRandomX() {
        return Math.floor(Math.random() * this.rows);
    }
    generateRandomY() {
        return Math.floor(Math.random() * this.columns);
    }

    buildGrid() {
        for (let row = 0; row < this.rows; row++) {
            for (let column = 0; column < this.columns; column++) {
                $('#root').append('<div id="box_' + row + '_' + column + '"class="box">' + row + ',' + column + ' </div>');
            }
        }

        //Initialized boxes sizezq
        $('.box').css('width', (100 / this.columns) + '%');
        $('.box').css('height', (100 / this.rows) + '%');

        //Bring the radius effect to the upper boxes of the grid
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


}