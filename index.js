import express from 'express';
import http from 'http';
import socketIo from 'socket.io';

import createGame from './public/game.js';

const app = express();
const server = http.createServer(app);
const sockets = socketIo(server);

const game = createGame();

game.subscribe((command) => {
    console.log(`Emmiting ${command.type} from ${command.playerId}`);
    sockets.emit(command.type, command);
});

game.addFruit({ "fruitId": "fruta1", "fruitX": 5, "fruitY": 5 });

app.use(express.static("public"));

sockets.on('connection', (socket) => {
    const playerId = socket.id;
    game.addPlayer({ playerId });

    console.log(`Jogador conectado: ${playerId}`);

    socket.emit('setup', game.state);

    socket.on('disconnect', () => {
        console.log(`Jogador desconectado: ${playerId}`);
        game.removePlayer({ playerId });
    });

    socket.on('move-player', (command) => {
        command.playerId = playerId;
        command.type = 'move-player';
        game.movePlayer(command);
    });
});




server.listen(3000, () => {
    console.log("Servidor rodando!")
});