export default function createSubject() {

    let state = {
        observers: []
    };

    function subscribe(observerFunction) {
        state.observers.push(observerFunction);
    }

    function unsubscribeAll() {
        state.observers = [];
    }

    function notifyAll(command) {

        if (state.observers.length) {
            console.log(command, state.observers.length);

            for (const observerFunction of state.observers) {
                observerFunction(command);
            }
        }
    }

    function addState(name, valor = null) {
        state[name] = valor;
    }

    function getState(name) {
        return state[name];
    }

    function allState() {
        return state;
    }



    return {
        unsubscribeAll,
        allState,
        getState,
        addState,
        subscribe,
        notifyAll
    }

}