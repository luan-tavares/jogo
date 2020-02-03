const StrategyManager = require("./StrategyManager.js");

export default function KeyboardStrategy() {
    return new StrategyManager({
        ArrowUp(player, screen) {
            player.y = Math.max(player.y - 1, 0);
        },
        ArrowDown(player, screen) {
            player.y = Math.min(player.y + 1, (screen.height - 1));
        },
        ArrowLeft(player, screen) {
            player.x = Math.max(player.x - 1, 0);
        },
        ArrowRight(player, screen) {
            player.x = Math.min(player.x + 1, (screen.width - 1));
        },
        b(player, screen) {
            console.log("BOMBA");
        },
        c(player, screen) {
            console.log("CASSETA");
        }
    });
};