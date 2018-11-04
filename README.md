## Tron simulator
A simulator for the multiplayer-game Tron. To get the simulator running you have to connect 4 Clients via [Socket.IO websocket](https://socket.io/) on localhost:8080.

**This project is a work in progress and is not complete**. It was initially intended to be used for reinforcement learning on the CodinGame platform. They provide an [online multiplayer environment for the game Tron](https://www.codingame.com/multiplayer/bot-programming/tron-battle), where agents form different people can compete against each other.

### Game rules
Each player gets the full boardstate prior to every turn. He then has to make an input in which direction he wants to move this turn. Possible directions are 'N', 'E', 'S', 'W'.

Each turn the players previous field gets blocked by his trail. If a player moves into a blocked field or outside of the board, he dies and all his occupied spaces are removed.

### Output
The simulator writes a log-file for each game played. The logfile states the boardstate at each turn.

#### Structure of the board output
* Players
    * Number [1-4]
* Spaces occupied by player trail
    * Character [a-d]
* Empty spaces
    * Character: '.'
