class Grid {
    constructor(rows, columns) {
        this.rows = rows;
        this.columns = columns;
        this.numberObstacles = 7;
        this.numberWeapons = 4;
        this.numberPlayers = 2;
        this.occupiedCells = [];
        this.weapons = [];
        this.obstaclesPosition = [];
        this.players = [];
        this.possibleDisplacement = [];
        this.buildGrid();
        this.bringRadiusEffect();
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

    generateRandomX() {
        return Math.floor(Math.random() * this.rows);
    }
    generateRandomY() {
        return Math.floor(Math.random() * this.columns);
    }

    placeObstacles() {

        for (let i = 0; i < this.numberObstacles; i++) {
            let cell = this.findFreeCell();

            //Add weapon on array's Obstacles
            this.obstaclesPosition.push(cell);
            cell.makeObstacle();
        }
        console.log(this.obstaclesPosition);
    }

    placeWeapons() {

        for (let i = 0; i < this.numberWeapons; i++) {
            let cell = this.findFreeCell();

            //Add weapon on array's weapons
            this.weapons.push(new Weapon(weaponsStore[i].name, weaponsStore[i].domage, cell, weaponsStore[i].src));
            cell.makeWeapon(weaponsStore[i].src);
        }
        console.log(this.weapons);
    }

    placePlayers() {

        for (let n = 0; n < this.numberPlayers; n++) {
            let cell = this.findFreeCellForPlayer();

            //Add player infos on array's palyer
            this.players.push(new Player(playersStore[n].name, cell, playersStore[n].src));
            cell.makePlayer(n, playersStore[n].src);
        }
        console.log(this.players);
        this.defineDeplacement("player0");
    }

    findFreeCell() {
        let cell = this.getRandomCell();

        if (this.isCellFree(cell)) {
            this.occupiedCells.push(cell);
            return cell;
        }
        return this.findFreeCell();
    }

    findFreeCellForPlayer() {
        let cell = this.getRandomCell();

        if (this.isCellFree(cell) && this.isAroundCellFree((cell.x - 1), cell.y) && this.isAroundCellFree(cell.x, (cell.y + 1)) && this.isAroundCellFree((cell.x + 1), cell.y) && this.isAroundCellFree(cell.x, (cell.y - 1))) {

            this.occupiedCells.push(cell);
            return cell;
        }
        return this.findFreeCellForPlayer();
    }

    getRandomCell(){
        return new Cell(this.generateRandomX(), this.generateRandomY());
    }

    isCellFree(cell) {
        return this.occupiedCells.filter((item) => {
            return item.x === cell.x && item.y === cell.y;
        }).length === 0;
    }

    isAroundCellFree(x,y) {
        return !$('#box_' + x + '_' + y).hasClass('obstacle') && !$('#box_' + x + '_' + y).hasClass('player');
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

    movePlayer(cell){
        if (this.isPossibleDeplacement(cell)){
            playDanger();
        }else
        alert('good^');
    }

    isPossibleDeplacement(cell){
        return this.possibleDisplacement.filter((item) => {
            return item.x === cell.x && item.y === cell.y;
        }).length === 0;
    }

}