class Cell {

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    colorCell() {
        $('#box_' + this.x + '_' + this.y).css('background-color', '#f1ebff');
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
    get getX() {
        return this.x;
    }
    get getY() {
        return this.y;
    }

    makeObstacle() {
        $('#box_' + this.x + '_' + this.y).addClass('obstacle');
    }

    makeWeapon(src, name) {
        $("#box_" + this.x + "_" + this.y).css('background-image', 'url(' + src + ')');
        $('#box_' + this.x + '_' + this.y).addClass('weapon');
        $('#box_' + this.x + '_' + this.y).addClass(name);
    }

    makePlayer(id, src) {
        $("#box_" + this.x + "_" + this.y).css('background-image', 'url(' + src + ')');
        $('#box_' + this.x + '_' + this.y).addClass('player');
        $('#box_' + this.x + '_' + this.y).addClass('player' + id);
    }
    
    removeMakePlayer(id) {
        $("#box_" + this.x + "_" + this.y).css('background-image', 'none');
        $('#box_' + this.x + '_' + this.y).removeClass('player');
        $('#box_' + this.x + '_' + this.y).removeClass('player' + id);
    }

    removeColorCell() {
        $('#box_' + this.x + '_' + this.y).css('background-color', '#fff');
    }
    setX(x) {
        return this.x = x;
    }
    setY(x) {
        return this.y = y;
    }

}