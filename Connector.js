const events = require('events');
// note, io(<port>) will create a http server for you
const io = require('socket.io')(8080);

const numOfPlayers = 4;

class Connector {
    constructor() {
        this.clients = [];
        this.playersConnected = false;
        this.eventEmitter = new events.EventEmitter();

        // Initialize TCP-Connection
        io.on('connection', socket => {
            console.log('Receiving connection from');
            console.log(socket.id);
            if(this.playersConnected) {
                socket.emit('info', { msg: 'Only 4 clients can connect' });
            } else {
                this.clients.push({id: socket.id, input: ''});
                socket.on('input', data => {
                    console.log('Received input from');
                    let client = this.clients.find(obj => {return obj.id === socket.id});
                    client.input = data.input;
                    console.log(client);
                    let clientsWithInput = this.clients.filter(obj => {return obj.input !== ''});
                    if(clientsWithInput.length >= numOfPlayers) {
                        this.eventEmitter.emit('inputsReceived', this.clients.map(obj => obj.input));
                    }
                });

                if(this.clients.length >= numOfPlayers) {
                    this.playersConnected = true;
                    this.eventEmitter.emit('playersConnected');
                }
            }
        });
    }

    getEventEmitter() {
        return this.eventEmitter;
    }

    broadcastGamestate(board) {
        io.emit('gamestate', board);
    }

    close(callback) {
        io.close(callback);
    }
}

module.exports = Connector;
