//Something good here , logicals things start here ! :)


const movePlayerOnClick = cell => {
    if (isNoPossibleDeplacement(cell)) {
        playDanger();
    } else {
        alert('good^^');
    }
}


const movePlayerKeyUp = (currentId, nextId, cell, cellClose) => {
    if (isNoPossibleDeplacement(cellClose)) {
        playDanger();
        turnPlayer(currentId);
    } else {
        cell.removeMakePlayer(currentId);
        grid.players[currentId].position = cellClose;
        grid.players[currentId].position.makePlayer(currentId, playersStore[currentId].src);
        grid.removeColorDeplacement();
        grid.defineDeplacement("player" + nextId);
        turnPlayer(nextId);
        playSucess();
    }
}

const turnPlayer = nextId => {
    if (nextId === 1) {
        turnPlayerTwo();
    } else {
        turnPlayerOne();
    }
}

const isNoPossibleDeplacement = cell => {
    return grid.possibleDisplacement.filter((item) => {
        return item.x === cell.x && item.y === cell.y;
    }).length === 0;
}