class Game {
    constructor(grid) {
        this.grid = grid;
        this.currentPlayerIndex = 0;
        this.controlNumberOfDeplacement = 0;
        this.indexOfWeaponToTake = 10;
        this.oldWeaponArray = [];
    }

    isNoPossibleDeplacement = cell => {
        return this.grid.possibleDisplacement.filter((item) => {
            return item.x === cell.x && item.y === cell.y;
        }).length === 0;
    }

    get currentPlayer() {
        return this.grid.players[this.currentPlayerIndex];
    }

    get nextPlayer() {
        let nextPlayerIndex = this.currentPlayerIndex === 0 ? 1 : 0;
        return this.grid.players[nextPlayerIndex];
    }

    movePlayerWithKeyboard = event => {

        let cell = this.currentPlayer.position;

        if (!['ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft'].includes(event)) {
            playDanger();
        }
        if (event === 'ArrowUp') {
            this.changePlayerPosition(cell, cell.up);
        }

        if (event === 'ArrowRight') {
            this.changePlayerPosition(cell, cell.right);
        }
        if (event === 'ArrowDown') {
            this.changePlayerPosition(cell, cell.down);
        }

        if (event === 'ArrowLeft') {
            this.changePlayerPosition(cell, cell.left);
        }

    }

    hasNotPlayerAround(nextcell) {

        return (!nextcell.up.hasPlayerClass && !nextcell.right.hasPlayerClass && !nextcell.down.hasPlayerClass && !nextcell.left.hasPlayerClass)
    }

    movePlayerByClick(nextCell) {
        if (this.isNoPossibleDeplacement(nextCell)) {
            playDanger();
        } else {
            this.controlNumberOfDeplacement = 2;
            let currentCell = this.currentPlayer.position;
            this.changePlayerPosition(currentCell, nextCell);
        }
    }

    redefineDeplacement = () => {
        this.grid.removeColorDeplacement();
        this.grid.defineDeplacement("player" + this.currentPlayerIndex)
    }

    turnOtherPlayer = () => {

        let nextId = this.currentPlayerIndex === 0 ? 1 : 0;

        this.currentEvent = "";
        this.grid.removeColorDeplacement();
        this.grid.defineDeplacement("player" + nextId)

        this.currentPlayerIndex = nextId;
        this.makeBorderTocurrentPlayer(this.currentPlayerIndex);
    }

    makeBorderTocurrentPlayer(id) {
        if (id === 0) {
            $('#playerOnePicture').addClass('make-border-vert');
            $('#playerOnePicture').removeClass('make-border-violet');
            $('#playerTwoPicture').addClass('make-border-violet');
            $('#playerTwoPicture').removeClass('make-border-vert');
        } else {
            $('#playerTwoPicture').addClass('make-border-vert');
            $('#playerTwoPicture').removeClass('make-border-violet');
            $('#playerOnePicture').addClass('make-border-violet');
            $('#playerOnePicture').removeClass('make-border-vert');

        }
    }

    changePlayerPosition(currentCell, nextCell) {

        if (this.isNoPossibleDeplacement(nextCell)) {
            playDanger();

        } else {

            this.controlNumberOfDeplacement++;

            if (this.controlNumberOfDeplacement < 4 && !(this.controlNumberOfDeplacement === 3)) {

                this.deplacePlayer(currentCell, nextCell);
                this.redefineDeplacement();

                if (!this.hasNotPlayerAround(nextCell)) {
                    this.displayBatleBoard();
                    this.displayPlayerBlockComba();

                    console.log(this.grid.players);

                }

            } else if (this.controlNumberOfDeplacement === 3) {

                this.deplacePlayer(currentCell, nextCell);
                this.controlNumberOfDeplacement = 0;
                this.turnOtherPlayer();

                if (!this.hasNotPlayerAround(nextCell)) {
                    this.displayBatleBoard();
                    this.displayPlayerBlockComba();

                    console.log(this.grid.players);
                }

            }
        }
    }

    getIndexOfNextWeapon(nextCell) {
        for (let index = 0; index < this.grid.weapons.length; index++) {
            if (this.grid.weapons[index].position.x === nextCell.x && this.grid.weapons[index].position.y === nextCell.y) {
                return this.indexOfWeaponToTake = index;
            }
        }
    }

    deplacePlayer(currentCell, nextCell) {

        if (this.getIndexOfNextWeapon(nextCell) < 10) {

            //Stock cuurent weapon of player
            this.oldWeaponArray[0] = this.currentPlayer.weapon.name;
            this.oldWeaponArray[1] = this.currentPlayer.weapon.imageSrc;
            this.oldWeaponArray[2] = this.currentPlayer.weapon.damage;

            currentCell.removePlayer(this.currentPlayerIndex);

            this.placeOldWeaponOnCell(currentCell, this.oldWeaponArray[1], nextCell);
            this.showNewPlayerWeapon(this.grid.weapons[this.indexOfWeaponToTake]);

            //Update player's weapon
            this.currentPlayer.weapon.imageSrc = this.grid.weapons[this.indexOfWeaponToTake].imageSrc;
            this.currentPlayer.weapon.name = this.grid.weapons[this.indexOfWeaponToTake].name;
            this.currentPlayer.weapon.damage = this.grid.weapons[this.indexOfWeaponToTake].damage;

            //Update the weapon in the weopons table by the new weapon left by the player
            this.grid.weapons[this.indexOfWeaponToTake].name = this.oldWeaponArray[0];
            this.grid.weapons[this.indexOfWeaponToTake].imageSrc = this.oldWeaponArray[1];
            this.grid.weapons[this.indexOfWeaponToTake].damage = this.oldWeaponArray[2];
            this.grid.weapons[this.indexOfWeaponToTake].position = currentCell;


            this.changeSomePlayerProperties(nextCell);

            playPickWeapon();
            this.indexOfWeaponToTake = 10;

        } else {
            currentCell.removePlayer(this.currentPlayerIndex);

            this.changeSomePlayerProperties(nextCell);
            playSucess();
        }
    }

    changeSomePlayerProperties(nextCell) {
        this.currentPlayer.position = nextCell;
        this.currentPlayer.weapon.position = nextCell;
        nextCell.addPlayer(this.currentPlayerIndex, playersStore[this.currentPlayerIndex].src);
    }

    placeOldWeaponOnCell(cell, src, nextCell) {
        nextCell.removeWeapon();
        cell.removeWeapon();
        cell.addWeapon(src);
    }

    showNewPlayerWeapon(weapon) {
        if (this.currentPlayerIndex === 0) {
            $('#weaponPlayerOne').attr("src", weapon.imageSrc);
        } else {
            $("#weaponPlayerTwo").attr("src", weapon.imageSrc);
        }
    }

    displayPlayerBlockComba() {
        if (this.currentPlayerIndex === 0) {
            $('.block-combaOne').css('display', 'block');
            $('.block-combaTwo').css('display', 'none');
        } else {
            $('.block-combaTwo').css('display', 'block');
            $('.block-combaOne').css('display', 'none');
        }
    }

    displayPlayerBlockCombaBattle() {
        if (this.currentPlayerIndex === 0) {
            $('.block-combaOne').css('display', 'none');
            $('.block-combaTwo').css('display', 'block');
        } else {
            $('.block-combaTwo').css('display', 'none');
            $('.block-combaOne').css('display', 'block');
        }
    }

    displayBatleBoard() {

        $('#root').css('display', 'none');
        $('#rootOne').css('display', 'none');


        $('#combaModePlayerOne').css('display', 'block');
        $('#combaModePlayerTwo').css('display', 'block');

        $('#rootTwo').css('display', 'block');
        $('#rootThree').css('display', 'block');
    }

    attackOpponent() {

        if (this.nextPlayer.attackMode) {

            let newHealth = this.nextPlayer.health - (this.currentPlayer.weapon.damage);

            if (newHealth <= 0) {
                this.showNewHealth(0);
                this.showWinner();
            } else {
                this.nextPlayer.health = newHealth;
                this.showNewHealth(newHealth);
            }
        } else {

            let newHealth = this.nextPlayer.health - ((this.currentPlayer.weapon.damage) / 2);

            if (newHealth <= 0) {
                this.showNewHealth(0);
                this.showWinner();
            } else {
                this.nextPlayer.health = newHealth;
                this.nextPlayer.attackMode = true;
                this.displayPlayerAttackBlock();
                this.showNewHealth(newHealth);
            }
        }

        playBitButton();
    }

    showNewHealth(health) {
        if (this.currentPlayerIndex === 0) {
            $('#healhtTwo').text(health);
            this.displayPlayerBlockCombaBattle();
            this.currentPlayerIndex = 1
        } else {
            $('#healhtOne').text(health);
            this.displayPlayerBlockCombaBattle();
            this.currentPlayerIndex = 0;
        }
    }

    displayPlayerAttackBlock() {
        if (this.currentPlayerIndex === 0) {
            $('#combaModePlayerTwo').text("Attack Mode");
        } else {

            $('#combaModePlayerOne').text("Attack Mode");
        }
    }

    showWinnerBoard() {

        $('#combaModePlayerOne').css('display', 'none');
        $('#combaModePlayerTwo').css('display', 'none');

        $('#rootTwo').css('display', 'none');
        $('#rootThree').css('display', 'none');

        $('.block-combaOne').css('display', 'none');
        $('.block-combaTwo').css('display', 'none');

        $('#rootFour').css('display', 'block');
        $('#rootFive').css('display', 'block');
    }

    showWinner() {
        if (this.currentPlayerIndex === 1) {
            $('#winnerName').text(localStorage.playerOneName);
            $('#PictureWinner').attr('src', './assets/imgs/players/' + localStorage.playerOnePicture + '.png');

            this.showWinnerBoard();
        } else {
            $('#winnerName').text(localStorage.playerTwoName);
            $('#PictureWinner').attr('src', './assets/imgs/players/' + localStorage.playerTwoPicture + '.png');

            this.showWinnerBoard();
        }
    }

    defendOpponent() {

        if (this.currentPlayerIndex === 0) {
            $('#combaModePlayerOne').text("Defend Mode");
            this.currentPlayer.attackMode = false;
            this.currentPlayerIndex = 1;

        } else {
            $('#combaModePlayerTwo').text("Defend Mode");
            this.currentPlayer.attackMode = false;
            this.currentPlayerIndex = 0;
        }

        this.displayPlayerBlockComba();
        playBitButton();

        console.log(this.grid.players);

    }
}