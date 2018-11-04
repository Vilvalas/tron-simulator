const socketIo = require('socket.io-client');

const App = require('./App.js');

it('starts the game when 4 clients are connected', done => {
    let socket = socketIo('http://localhost:8080');
    socket.emit('input', { input: 'N' });

    let socket2 = socketIo('http://localhost:8080');
    socket2.emit('input', { input: 'E' });

    let socket3 = socketIo('http://localhost:8080');
    socket3.emit('input', { input: 'S' });

    let socket4 = socketIo('http://localhost:8080');
    socket4.emit('input', { input: 'W' });

    socket.on('gamestate', function (data) {
        console.log('GAMESTATE RECEIVED: ');
        console.log(data);
        // connector.close();
        done();
    });
});
