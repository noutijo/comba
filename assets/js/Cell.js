class Cell {

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }


    colorCell() {
        $('#box_' + this.x + '_' + this.y).css('background-color', 'rgba(179, 180, 180, 0.3)');
    }

    get hasPlayerClass() {
        return $('#box_' + this.x + '_' + this.y).hasClass("player") 
    }

    get up() {
        return new Cell(this.x - 1, this.y);
    }
    get down() {
        return new Cell(this.x + 1, this.y);
    }
    get left() {
        return new Cell(this.x, this.y - 1);
    }
    get right() {
        return new Cell(this.x, this.y + 1);
    }

    addObstacle() {
        $("#box_" + this.x + "_" + this.y).css('background-image', 'url(./assets/imgs/obstacles/wall.png)');
        $('#box_' + this.x + '_' + this.y).addClass('obstacle');
    }

    addWeapon(src) {
        $("#box_" + this.x + "_" + this.y).css('background-image', 'url(' + src + ')');
        $('#box_' + this.x + '_' + this.y).addClass('weapon');
    }

    removeWeapon() {
        $("#box_" + this.x + "_" + this.y).css('background-image', 'none');
        $('#box_' + this.x + '_' + this.y).removeClass('weapon');
    }

    addPlayer(id, src) {
        $("#box_" + this.x + "_" + this.y).css('background-image', 'url(' + src + ')');
        $('#box_' + this.x + '_' + this.y).addClass('player');
        $('#box_' + this.x + '_' + this.y).addClass('player' + id);
        $('#box_' + this.x + '_' + this.y).css('border-color', 'rgba(7, 165, 165, 0.5)');
    }

    removePlayer(id) {
        $("#box_" + this.x + "_" + this.y).css('background-image', 'none');
        $('#box_' + this.x + '_' + this.y).removeClass('player');
        $('#box_' + this.x + '_' + this.y).removeClass('player' + id);
        $('#box_' + this.x + '_' + this.y).css('border-color', 'rgba(179, 180, 180, 0.3)');
    }

    removeColorCell() {
        $('#box_' + this.x + '_' + this.y).css('background-color', 'transparent');
    }
    setX(x) {
        return this.x = x;
    }
    setY(x) {
        return this.y = y;
    }

}