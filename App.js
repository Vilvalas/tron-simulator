const Game = require('./Game.js');
const Connector = require('./Connector.js');

let game = new Game();
let connector = new Connector();
let eventEmitter = connector.getEventEmitter();

eventEmitter.on('playersConnected', () => {
    console.log('All 4 players connected');
    game.initGame();
    connector.broadcastGamestate(game.getBoardstate());
});

eventEmitter.on('inputsReceived', inputArray => {
    console.log('Received input from every player');
    game.doGameTurn(inputArray);
    connector.broadcastGamestate(game.getBoardstate());
});