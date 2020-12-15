class Game {
    constructor(grid) {
        this.grid = grid;
        this.currentPlayer = 0;
        this.controlNumberDeplacement = 0;
    }

    isNoPossibleDeplacement = cell => {
        return this.grid.possibleDisplacement.filter((item) => {
            return item.x === cell.x && item.y === cell.y;
        }).length === 0;
    }

    movePlayer = event => {
        if (!['ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft'].includes(event)) {
            playDanger();
        }
        if (event === 'ArrowUp') {

            let cell = this.grid.players[this.currentPlayer].position;
            let cellUp = cell.up;
            this.changePlayerPosition(cell, cellUp);
        }

        if (event === 'ArrowRight') {

            let cell = this.grid.players[this.currentPlayer].position;
            let cellRight = cell.right;
            this.changePlayerPosition(cell, cellRight);
        }
        if (event === 'ArrowDown') {

            let cell = this.grid.players[this.currentPlayer].position;
            let cellDown = cell.down;
            this.changePlayerPosition(cell, cellDown);
        }

        if (event === 'ArrowLeft') {
            let cell = this.grid.players[this.currentPlayer].position;
            let cellLeft = cell.left;
            this.changePlayerPosition(cell, cellLeft);
        }

    }

    redefineDeplacement = () => {
        this.grid.removeColorDeplacement();
        this.grid.defineDeplacement("player" + this.currentPlayer)
    }

    turnOtherPlayer = () => {

        let nextId = this.currentPlayer === 0 ? 1 : 0;

        this.currentEvent = "";
        this.grid.removeColorDeplacement();
        this.grid.defineDeplacement("player" + nextId)

        this.currentPlayer = nextId;
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

        let oldWeapon;

        for (let index = 0; index < this.grid.weapons.length; index++) {
            if (this.grid.weapons[index].position.x === nextCell.x && this.grid.weapons[index].position.y === nextCell.y) {

                oldWeapon = this.grid.players[this.currentPlayer].weapon;

                console.log(oldWeapon);
                this.displayOldWeapon(oldWeapon.position, oldWeapon.name, oldWeapon.imageSrc);

                oldWeapon = this.grid.weapons[index];


                nextCell.removeWeaponName(this.grid.weapons[index].name);

                this.updatePlayerWeapon(this.grid.weapons[index]);
            }
        }

        cell.removePlayer(this.currentPlayer);
        this.grid.players[this.currentPlayer].position = nextCell;
        this.grid.players[this.currentPlayer].position.addPlayer(this.currentPlayer, playersStore[this.currentPlayer].src);

        playSucess();
    }

    displayOldWeapon(cell, name, src) {

        cell.addWeapon(src, name);
    }

    updatePlayerWeapon(weapon) {
        if (this.currentPlayer === 0) {
            $('#weaponPlayerOne').attr("src", weapon.imageSrc);
            console.log(this.grid.players)
        } else {
            $("#weaponPlayerTwo").attr("src", weapon.imageSrc);
            console.log(this.grid.players)
        }
    }

}