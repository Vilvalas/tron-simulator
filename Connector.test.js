const socketIo = require('socket.io-client');

const Connector = require('./Connector.js');

it('lets players connect', done => {
    let connector = new Connector();
    let eventEmitter = connector.getEventEmitter();

    eventEmitter.on('playersConnected', () => {
        connector.close();
        done();
    });

    let socket = socketIo('http://localhost:8080');
});

it('supports client input', done => {
    let connector = new Connector();
    let eventEmitter = connector.getEventEmitter();

    eventEmitter.on('inputsReceived', inputArray => {
        connector.close();
        done();
    });

    let socket = socketIo('http://localhost:8080');
    socket.emit('input', { input: 'N' });
});