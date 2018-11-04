const Util = require('./Util.js');

class Player {
    constructor(id, boardSizeX, boardSizeY) {
        this.id = id;
        this.x = Util.getRandomInt(boardSizeX);
        this.y = Util.getRandomInt(boardSizeY);
    }

    getId() {
        return this.id;
    }

    getPosition() {
        return [this.x, this.y];
    }

    updatePosition(x, y) {
        this.x = x;
        this.y = y;
    }
}

module.exports = Player;