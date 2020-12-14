class Game {
    constructor(grid) {
        this.grid=grid;
        this.currentPlayer = 0;
        this.currentEvent = "";
    }

    isNoPossibleDeplacement = cell => {
        return this.grid.possibleDisplacement.filter((item) => {
            return item.x === cell.x && item.y === cell.y;
        }).length === 0;
    }

    movePlayer = event => {

        if (event === 'Enter') {

            if (this.currentEvent === '') {
                playDanger();
            }

            if (this.currentEvent === 'ArrowUp') {

                if (!this.isNoPossibleDeplacement(this.grid.players[this.currentPlayer].position.up)) {
                    playDanger();
                } else {

                    this.turnOtherPlayer();

                }
            }

            if (this.currentEvent === 'ArrowRight') {

                if (!this.isNoPossibleDeplacement(this.grid.players[this.currentPlayer].position.right)) {
                    playDanger();
                } else {

                    this.turnOtherPlayer();

                }
            }

            if (this.currentEvent === 'ArrowDown') {

                if (!this.isNoPossibleDeplacement(this.grid.players[this.currentPlayer].position.down)) {
                    playDanger();
                } else {

                    this.turnOtherPlayer();

                }

            }
            if (this.currentEvent === 'ArrowLeft') {

                if (!this.isNoPossibleDeplacement(this.grid.players[this.currentPlayer].position.left)) {
                    playDanger();
                } else {

                    this.turnOtherPlayer();
                }
            }
        }

        if (event === 'ArrowUp') {

            this.currentEvent = event;

            let cell = this.grid.players[this.currentPlayer].position;
            let cellUp = cell.up;

            this.changePlayePosition(cell, cellUp);
        }

        if (event === 'ArrowRight') {

            this.currentEvent = event;

            let cell = this.grid.players[this.currentPlayer].position;
            let cellRight = cell.right;

            this.changePlayePosition(cell, cellRight);
        }
        if (event === 'ArrowDown') {

            this.currentEvent = event;

            let cell = this.grid.players[this.currentPlayer].position;
            let cellDown = cell.down;

            this.changePlayePosition(cell, cellDown);
        }

        if (event === 'ArrowLeft') {

            this.currentEvent = event;

            let cell = this.grid.players[this.currentPlayer].position;
            let cellLeft = cell.left;

            this.changePlayePosition(cell, cellLeft);

        }

    }

    turnOtherPlayer = () => {
        
        let nextId = this.currentPlayer === 0 ? 1 : 0;

        this.currentEvent = "";
        this.grid.removeColorDeplacement();
        this.grid.defineDeplacement("player" + nextId)

        this.currentPlayer = nextId;
    }

    changePlayePosition(cell, cellClose) {

        if (this.isNoPossibleDeplacement(cellClose)) {
            playDanger();
        } else {
            cell.removeMakePlayer(this.currentPlayer);
            this.grid.players[this.currentPlayer].position = cellClose;
            this.grid.players[this.currentPlayer].position.makePlayer(this.currentPlayer, playersStore[this.currentPlayer].src);
            playSucess();
        }
    }

}