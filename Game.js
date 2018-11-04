const fs = require('fs');
const Player = require('./Player.js');
const Util = require('./Util.js');

// Board on CodinGame is always 30 x 20
const boardSizeX = 30;
const boardSizeY = 20;

const numOfPlayers = 4;

class Game {
    constructor() {
        this.gameId = 0;
        this.turn = 0;
        this.board = [];
        this.players = [];
    }

    initGame() {
        this.board = [];
        this.gameId++;
        this.turn = 0;

        for (let i = 0; i < boardSizeY; i++) {
            let row = '';
            for (let j = 0; j < boardSizeX; j++) {
                row += '.';
            }
            this.board.push(row);
        }

        for (let i = 0; i < numOfPlayers; i++) {
            // TODO: don't let 2 players start on the same field
            let player = new Player(i + 1, boardSizeX, boardSizeY);
            this.players.push(player);
            this.board[player.getPosition()[1]] = Util.replaceCharAt(this.board[player.getPosition()[1]],
                player.getPosition()[0], player.getId());
        }

        // Initialize output
        // TODO: Do stream.end(); when stream is not needed anymore
        let logfile_name = this.gameId + '.txt';
        this.writeStream = fs.createWriteStream(logfile_name, {flags: 'a'});

        this.writeBoardToFile();
    }

    doGameTurn(inputArray) {
        console.log('Game turn with data:');
        console.log(inputArray);
        for (let i = 0; i < numOfPlayers; i++) {
            let playerPos = this.players[i].getPosition();
            let nextPlayerX = playerPos[0];
            let nextPlayerY = playerPos[1];
            switch (inputArray[i]) {
                case 'N':
                    nextPlayerY--;
                    break;
                case 'E':
                    nextPlayerX++;
                    break;
                case 'S':
                    nextPlayerY++;
                    break;
                default:
                    nextPlayerX--;
                    break;
            }
            // Check if player moved out of the board
            if (nextPlayerX < 0 || nextPlayerX > boardSizeX - 1 || nextPlayerY < 0 || nextPlayerY > boardSizeY - 1) {
                this.killPlayer(this.players[i]);
            } else {
                let test = this.board[nextPlayerY];
                let nextTile = this.board[nextPlayerY].charAt(nextPlayerX);
                if (nextTile === '.') {
                    // Player moves - update old field + new field
                    Util.replaceCharAt(this.board[playerPos[1]], playerPos[0], Util.getCharToNum(this.players[i].getId()));
                    Util.replaceCharAt(this.board[nextPlayerY], nextPlayerX, this.players[i].getId());
                } else {
                    this.killPlayer(this.players[i]);
                }
            }
        }
    }

    killPlayer(player) {
        // TODO: Remove all his board spaces
        // let occupiedSpaceChar = Util.getCharToNum(player.getId());
        // TODO: Remove him from the list of players
        // TODO: Communicate to the player that he died
    }

    getBoardstate() {
        return this.board;
    }

    writeBoardToFile() {
        let output = 'Turn ' + this.turn + '\n';
        for (let i = 0; i < this.board.length; i++) {
            output += this.board[i] + '\n';
        }
        this.writeStream.write(output);
    }
}

module.exports = Game;
