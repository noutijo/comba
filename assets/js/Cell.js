class Cell {

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    getX() {
        return this.x;
    }
    getY() {
        return this.y;
    }

    setX(x) {
        return this.x = x;
    }
    setY(x) {
        return this.y = y;
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

    makeObstacle() {
        $('#box_' + this.x + '_' + this.y).addClass('obstacle');
    }

    makeWeapon(src) {
        $("#box_" + this.x + "_" + this.y).css('background-image', 'url(' + src + ')');
        $('#box_' + this.x + '_' + this.y).addClass('weapon');
    }

    makePlayer(id, src) {
        $("#box_" + this.x + "_" + this.y).css('background-image', 'url(' + src + ')');
        $('#box_' + this.x + '_' + this.y).addClass('player');
        $('#box_' + this.x + '_' + this.y).addClass('player' + id);
    }

}
