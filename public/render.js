module.exports = function renderScreen(screen, game, currPlayerId, fnLoop) {
    const context = screen.getContext('2d');
    context.fillStyle = 'white';
    context.clearRect(0, 0, 10, 10);

    for (const playerId in game.state.players) {
        const player = game.state.players[playerId];
        context.fillStyle = 'black';
        context.fillRect(player.x, player.y, 1, 1);
    }

    for (const fruitId in game.state.fruits) {
        const fruit = game.state.fruits[fruitId];
        context.fillStyle = 'green';
        context.fillRect(fruit.x, fruit.y, 1, 1);
    }

    const currentPlayer = game.state.players[currPlayerId];

    if (currentPlayer) {
        context.fillStyle = '#F0DB4F';
        context.fillRect(currentPlayer.x, currentPlayer.y, 1, 1);
    }

    fnLoop(() => {
        renderScreen(screen, game, currPlayerId, fnLoop);
    });

}
