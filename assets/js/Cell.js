class Cell {

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    colorCell() {
        $('#box_' + this.x + '_' + this.y).css('background-color', '#f7e5c7');
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

    addObstacle() {
        $('#box_' + this.x + '_' + this.y).addClass('obstacle');
    }

    addWeapon(src, name) {
        $("#box_" + this.x + "_" + this.y).css('background-image', 'url(' + src + ')');
        $('#box_' + this.x + '_' + this.y).addClass('weapon');
        $('#box_' + this.x + '_' + this.y).addClass(name);
    }

    removeWeaponName(name) {
        $('#box_' + this.x + '_' + this.y).removeClass(name);
        $('#box_' + this.x + '_' + this.y).removeClass('weapon');
    }

    addPlayer(id, src) {
        $("#box_" + this.x + "_" + this.y).css('background-image', 'url(' + src + ')');
        $('#box_' + this.x + '_' + this.y).addClass('player');
        $('#box_' + this.x + '_' + this.y).addClass('player' + id);
    }

    removePlayer(id) {
        $("#box_" + this.x + "_" + this.y).css('background-image', 'none');
        $('#box_' + this.x + '_' + this.y).removeClass('player');
        $('#box_' + this.x + '_' + this.y).removeClass('player' + id);
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