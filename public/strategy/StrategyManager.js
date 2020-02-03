module.exports = function StrategyManager(strategies) {

    let currStrategy = null;

    this.setStrategy = function (strategy) {
        currStrategy = null;
        if (strategies[strategy]) {
            currStrategy = strategies[strategy];
            return true;
        }
        return false;
    }

    this.getStrategy = function () {
        return currStrategy;
    }

    this.execute = function () {
        currStrategy(...arguments);
    }

}