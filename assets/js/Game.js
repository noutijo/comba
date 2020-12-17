class Game {
    constructor(grid) {
        this.grid = grid;
        this.currentPlayerIndex = 0;
        this.controlNumberDeplacement = 0;
        this.oldWeapon = '';
        this.playerWeaponNow = '';
        this.nextPlayerWeaponIndex = 10;
        this.weapons = grid.weapons;
        this.weaponsDispatch=[];
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

    getIndexOfNextWeapon(nextCell) {
        for (let index = 0; index < this.weapons.length; index++) {
            if (this.weapons[index].position.x === nextCell.x && this.grid.weapons[index].position.y === nextCell.y) {
                console.log(index);
                return this.nextPlayerWeaponIndex = index;
            }
        }
    }

    deplacePlayer(currentCell, nextCell) {

        if (this.getIndexOfNextWeapon(nextCell) < 10) {


            const oldWeapon = this.currentPlayer.weapon;

            this.weaponsDispatch[0] = this.currentPlayer.weapon.name;
            this.weaponsDispatch[1] = this.currentPlayer.weapon.imageSrc;
            this.weaponsDispatch[2] = this.currentPlayer.weapon.damage;

            currentCell.removePlayer(this.currentPlayerIndex);
            this.showOldWeapon(currentCell, this.weaponsDispatch[1], nextCell);
            this.updatePlayerWeaponView(this.weapons[this.nextPlayerWeaponIndex]);

            this.currentPlayer.weapon.imageSrc = this.weapons[this.nextPlayerWeaponIndex].imageSrc;
            this.currentPlayer.weapon.name = this.weapons[this.nextPlayerWeaponIndex].name;
            this.currentPlayer.weapon.damage = this.weapons[this.nextPlayerWeaponIndex].damage;

            this.weapons[this.nextPlayerWeaponIndex].name = this.weaponsDispatch[0];
            this.weapons[this.nextPlayerWeaponIndex].imageSrc = this.weaponsDispatch[1];
            this.weapons[this.nextPlayerWeaponIndex].damage = this.weaponsDispatch[2];
            this.weapons[this.nextPlayerWeaponIndex].position = currentCell;
            
            console.log("old weapon", this.currentPlayer.weapon, this.weapons[this.nextPlayerWeaponIndex]);
            

            this.currentPlayer.position = nextCell;
            this.currentPlayer.weapon.position = nextCell;
            nextCell.addPlayer(this.currentPlayerIndex, playersStore[this.currentPlayerIndex].src);
            playSucess();
        
            console.log("New weapons array", this.weapons);

            this.nextPlayerWeaponIndex = 10;

        } else{

            currentCell.removePlayer(this.currentPlayerIndex);
    
            this.currentPlayer.position = nextCell;
            this.currentPlayer.weapon.position = nextCell;
            nextCell.addPlayer(this.currentPlayerIndex, playersStore[this.currentPlayerIndex].src);
            playSucess();
            
        }

    }

    showOldWeapon(cell, src, nextCell) {
        nextCell.removeWeapon();
        cell.removeWeapon();
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