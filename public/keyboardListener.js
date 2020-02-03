import createSubject from './observer/observable.js';

export default function createKeyboardListener(document) {

    let obj = Object.create(createSubject());


    //let obj = {}
    //Object.setPrototypeOf(obj, createSubject());

    function registerPlayerId(playerId) {
        obj.addState('playerId', playerId);

    }

    function unregisterPlayerId() {
        obj.addState('playerId', null);
    }

    document.addEventListener('keydown', handlerKeydown);

    function handlerKeydown(event) {

        const command = {
            type: 'move-player',
            playerId: obj.getState('playerId'),
            keyPressed: event.key,

        }

        command.origem = "KeyboardListener Boundary";

        obj.notifyAll(command);


    }

    obj.registerPlayerId = registerPlayerId;
    obj.unregisterPlayerId = unregisterPlayerId;

    return obj;
}
