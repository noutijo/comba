class Game {
    constructor(rows, columns) {
        this.rows = rows;
        this.columns = columns;
        this.occupiedCells = [];
        this.weapons = [];
        this.obstaclesPosition = [];
        this.players = [];
        this.possibleDisplacement = [];
        this.buildGrid();
        this.currentPlayer = 0;
        this.currentEvent = "";
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

        $('#box_0_0').css('border-radius', '10px 0px 0px 0px');
        $('#box_0_' + (this.columns - 1)).css('border-radius', '0px 10px 0px 0px');
        $('#box_' + (this.rows - 1) + '_0').css('border-radius', '0px 0px 0px 10px');
        $('#box_' + (this.rows - 1) + '_' + (this.columns - 1)).css('border-radius', '0px 0px 10px 0px');
    }

    colorTop(cell) {
        let control = 1;

        while (control < 4) {
            cell = cell.up;
            if (this.isMovable(cell) && this.isPositiveValue(cell.getX)) {
                cell.colorCell();

                //Save to possible deplecement 
                this.possibleDisplacement.push(cell);
                control++;
            } else
                control = 5; //Break loop
        }

    }

    colorRight(cell) {
        let control = 1;

        while (control < 4) {
            cell = cell.right;
            if (this.isMovable(cell) && cell.getY < this.columns) {
                cell.colorCell();

                //Save to possible deplecement 
                this.possibleDisplacement.push(cell);
                control++;
            } else
                control = 5; //Break loop
        }
    }

    colorBottom(cell) {
        let control = 1;

        while (control < 4) {
            cell = cell.down;
            if (this.isMovable(cell) && cell.getX < this.rows) {
                cell.colorCell();

                //Save to possible deplecement 
                this.possibleDisplacement.push(cell);
                control++;
            } else
                control = 5; //Break loop
        }
    }

    colorLeft(cell) {
        let control = 1;

        while (control < 4) {
            cell = cell.left;
            if (this.isMovable(cell) && this.isPositiveValue(cell.getY)) {
                cell.colorCell();

                //Save to possible deplecement 
                this.possibleDisplacement.push(cell);
                control++;
            } else
                control = 5; //Break loop
        }
        console.log(this.possibleDisplacement);
    }

    defineDeplacement(player) {

        this.possibleDisplacement = [];

        let signeCell = $('.' + player).attr('id').split('_');
        let cell = new Cell(parseInt(signeCell[1]), parseInt(signeCell[2]));

        this.colorTop(cell);
        this.colorRight(cell);
        this.colorBottom(cell);
        this.colorLeft(cell);
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

        if (this.isCellFree(cell) && this.isAroundCellFree(cell)) {

            return cell;
        }
        return this.findFreeCellForPlayer();
    }

    getRandomCell() {
        let x = Math.floor(Math.random() * this.rows);
        let y = Math.floor(Math.random() * this.columns);
        return new Cell(x, y);
    }

    getDefaultWeapon() {
        return this.weapons.filter((item) => {
            return item.name === "Orange";
        })[0];
    }

    isCellFree(cell) {
        return this.occupiedCells.filter((item) => {
            return item.x === cell.x && item.y === cell.y;
        }).length === 0;
    }

    isAroundCellFree(cell) {
        return !this.isCellHasObstacle(cell.up) && !this.isCellHasPlayer(cell.up) &&
            !this.isCellHasObstacle(cell.right) && !this.isCellHasPlayer(cell.right) &&
            !this.isCellHasObstacle(cell.down) && !this.isCellHasPlayer(cell.down) &&
            !this.isCellHasObstacle(cell.left) && !this.isCellHasPlayer(cell.left)
    }

    isMovable(cell) {
        return (!this.isCellHasObstacle(cell) && !this.isCellHasPlayer(cell));
    }

    isCellHasObstacle(cell) {
        return this.obstaclesPosition.filter((item) => {
            return item.x === cell.x && item.y === cell.y;
        }).length > 0;
    }

    isCellHasPlayer(cell) {
        return this.players.filter((item) => {
            return item.position.x === cell.x && item.position.y === cell.y;
        }).length > 0;
    }

    isPositiveValue(value) {
        return (value >= 0 && value < this.columns) || (value >= 0 && value < this.rows)
    }

    removeColorDeplacement() {

        for (let n = 0; n < this.possibleDisplacement.length; n++) {
            this.possibleDisplacement[n].removeColorCell();

        }
    }

    placeObstacles(numberObstacles = 7) {

        for (let i = 0; i < numberObstacles; i++) {
            let cell = this.findFreeCell();

            //Add weapon on array's Obstacles
            this.obstaclesPosition.push(cell);
            cell.makeObstacle();
        }
        console.log(this.obstaclesPosition);
    }

    placeWeapons(numberWeapons = 4) {

        for (let i = 0; i < numberWeapons; i++) {
            let cell = this.findFreeCell();

            //Add weapon on array's weapons
            this.weapons.push(new Weapon(weaponsStore[i].name, weaponsStore[i].domage, cell, weaponsStore[i].src));
            cell.makeWeapon(weaponsStore[i].src, weaponsStore[i].name);
        }
        console.log(this.weapons);
    }

    placePlayers(numberPlayers = 2) {

        for (let n = 0; n < numberPlayers; n++) {
            let cell = this.findFreeCellForPlayer();

            let weapon = this.getDefaultWeapon();

            this.players.push(new Player(playersStore[n].name, cell, playersStore[n].src, weapon));
            cell.makePlayer(n, playersStore[n].src);
        }
        console.log(this.players);
        this.defineDeplacement("player0");
    }

    //-------------------------------------------//


    isNoPossibleDeplacement = cell => {
        return this.possibleDisplacement.filter((item) => {
            return item.x === cell.x && item.y === cell.y;
        }).length === 0;
    }
    //
    getNextId = () => {
        return this.currentPlayer === 0 ? 1 : 0;
    }

    movePlayerNow = (nextId, cell, cellClose) => {

    }

    movePlayer = event => {

        if (event === 'Enter') {

            if (this.currentEvent === '') {
                playDanger();
            }

            if (this.currentEvent === 'ArrowUp') {

                if (!this.isNoPossibleDeplacement(this.players[this.currentPlayer].position.up)) {
                    playDanger();
                } else {

                    this.turnOtherPlayer();

                }
            }

            if (this.currentEvent === 'ArrowRight') {

                if (!this.isNoPossibleDeplacement(this.players[this.currentPlayer].position.right)) {
                    playDanger();
                } else {

                    this.turnOtherPlayer();

                }
            }

            if (this.currentEvent === 'ArrowDown') {

                if (!this.isNoPossibleDeplacement(this.players[this.currentPlayer].position.down)) {
                    playDanger();
                } else {

                    this.turnOtherPlayer();

                }

            }
            if (this.currentEvent === 'ArrowLeft') {

                if (!this.isNoPossibleDeplacement(this.players[this.currentPlayer].position.left)) {
                    playDanger();
                } else {

                    this.turnOtherPlayer();
                }
            }
        }

        if (event === 'ArrowUp') {

            this.currentEvent = event;

            let cell = this.players[this.currentPlayer].position;
            let cellUp = cell.up;

            this.changePlayePosition(cell, cellUp);
        }

        if (event === 'ArrowRight') {

            this.currentEvent = event;

            let cell = this.players[this.currentPlayer].position;
            let cellRight = cell.right;

            this.changePlayePosition(cell, cellRight);
        }
        if (event === 'ArrowDown') {

            this.currentEvent = event;

            let cell = this.players[this.currentPlayer].position;
            let cellDown = cell.down;

            this.changePlayePosition(cell, cellDown);
        }

        if (event === 'ArrowLeft') {

            this.currentEvent = event;

            let cell = this.players[this.currentPlayer].position;
            let cellLeft = cell.left;

            this.changePlayePosition(cell, cellLeft);

        }

    }

    turnOtherPlayer = () => {
        this.currentEvent = "";
        this.removeColorDeplacement();
        this.defineDeplacement("player" + this.getNextId())
        this.currentPlayer = this.getNextId()
    }

    changePlayePosition(cell, cellClose) {

        if (this.isNoPossibleDeplacement(cellClose)) {
            playDanger();
        } else {
            cell.removeMakePlayer(this.currentPlayer);
            this.players[this.currentPlayer].position = cellClose;
            this.players[this.currentPlayer].position.makePlayer(this.currentPlayer, playersStore[this.currentPlayer].src);
            playSucess();
        }
    }

}