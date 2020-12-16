class Game {
    constructor(grid) {
        this.grid = grid;
        this.currentPlayerIndex = 0;
        this.controlNumberDeplacement = 0;
    }

    isNoPossibleDeplacement = cell => {
        return this.grid.possibleDisplacement.filter((item) => {
            return item.x === cell.x && item.y === cell.y;
        }).length === 0;
    }

    get currentPlayer() {
        return this.grid.players[this.currentPlayerIndex];
    }

    movePlayer = event => {
        if (!['ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft'].includes(event)) {
            playDanger();
        }
        if (event === 'ArrowUp') {

            let cell = this.currentPlayer.position;
            let cellUp = cell.up;
            this.changePlayerPosition(cell, cellUp);
        }

        if (event === 'ArrowRight') {

            let cell = this.currentPlayer.position;
            let cellRight = cell.right;
            this.changePlayerPosition(cell, cellRight);
        }
        if (event === 'ArrowDown') {

            let cell = this.currentPlayer.position;
            let cellDown = cell.down;
            this.changePlayerPosition(cell, cellDown);
        }

        if (event === 'ArrowLeft') {
            let cell = this.currentPlayer.position;
            let cellLeft = cell.left;
            this.changePlayerPosition(cell, cellLeft);
        }

    }

    movePlayerByClick(nextCell) {
        if (this.isNoPossibleDeplacement(nextCell)) {
            playDanger();
        } else {

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
    }

    changePlayerPosition(cell, cellClose) {

        if (this.isNoPossibleDeplacement(cellClose)) {
            playDanger();

        } else {
            this.controlNumberDeplacement++;

            if (this.controlNumberDeplacement < 4 && !(this.controlNumberDeplacement === 3)) {

                this.deplacePlayer(cell, cellClose);
                this.redefineDeplacement();

            } else if (this.controlNumberDeplacement === 3) {

                this.deplacePlayer(cell, cellClose);

                this.controlNumberDeplacement = 0;
                this.turnOtherPlayer();
            }
        }
    }

    deplacePlayer(cell, nextCell) {


        for (let index = 0; index < this.grid.weapons.length; index++) {
            if (this.grid.weapons[index].position.x === nextCell.x && this.grid.weapons[index].position.y === nextCell.y) {

                let oldWeapon = this.currentPlayer.weapon;
                let playerWeaponNow = this.currentPlayer.weapon;

                this.displayOldWeapon(this.currentPlayer.position, playerWeaponNow.imageSrc);

                playerWeaponNow.imageSrc = this.grid.weapons[index].imageSrc;
                playerWeaponNow.name = this.grid.weapons[index].name;
                playerWeaponNow.damage = this.grid.weapons[index].damage;

                this.grid.weapons[index] = oldWeapon;

                this.updatePlayerWeaponView(this.grid.weapons[index]);
            }
        }

        cell.removePlayer(this.currentPlayerIndex);

        this.currentPlayer.position = nextCell;
        //this.currentPlayer.weapon.position = nextCell;
        this.currentPlayer.position.addPlayer(this.currentPlayerIndex, playersStore[this.currentPlayerIndex].src);
        
        console.log(this.grid.players)

        playSucess();
    }

    displayOldWeapon(cell, src) {
        cell.addWeapon(src);
    }

    updatePlayerWeaponView(weapon) {
        if (this.currentPlayerIndex === 0) {
            $('#weaponPlayerOne').attr("src", weapon.imageSrc);
        } else {
            $("#weaponPlayerTwo").attr("src", weapon.imageSrc);
        }
    }

}