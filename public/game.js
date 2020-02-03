const createSubject = require('./observer/observable.js');
const KeyboardStrategy = require('./strategy/KeyboardStrategy.js');

export default function createGame() {

    let obj = createSubject();

    const keyboardStrategy = new KeyboardStrategy();

    const state = {
        players: {},
        fruits: {},
        screen: {
            height: 10,
            width: 10
        }
    };

    const screen = state.screen;

    function setState(newState) {
        Object.assign(state, newState);
    }

    function addPlayer(command) {
        const { playerId } = command;
        const playerX = command.playerX ? command.playerX : Math.floor(Math.random() * screen.width);
        const playerY = command.playerY ? command.playerY : Math.floor(Math.random() * screen.height)
        state.players[playerId] = {
            x: playerX,
            y: playerY
        };
        obj.notifyAll({
            type: "add-player",
            playerId,
            playerX,
            playerY
        });
    }

    function removePlayer(command) {
        const { playerId } = command;
        delete state.players[playerId];
        obj.notifyAll({
            type: "remove-player",
            playerId,

        });
    }

    function addFruit(command) {
        const { fruitId, fruitX, fruitY } = command;
        state.fruits[fruitId] = {
            x: fruitX,
            y: fruitY
        };
    }

    function removeFruit(command) {
        const { fruitId } = command;
        delete state.fruits[fruitId];
    }

    function movePlayer(command) {




        const keyPressed = command.keyPressed;

        const playerId = command.playerId;

        const player = state.players[playerId];


        if (player && keyboardStrategy.setStrategy(keyPressed)) {

            command.origem = "game Boundary";

            obj.notifyAll(command);

            keyboardStrategy.execute(player, screen);
            checkFruitCollision(playerId);

        }
    }

    function checkFruitCollision(playerId) {
        const player = state.players[playerId];
        for (const fruitId in state.fruits) {
            const fruit = state.fruits[fruitId];
            if (fruit.x === player.x && fruit.y === player.y) {

                removeFruit({ fruitId });
            }
        }
    }

    return {
        movePlayer,
        addPlayer,
        removePlayer,
        addFruit,
        removeFruit,
        setState,
        state,
        __proto__: obj
    };
}
