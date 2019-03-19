module.exports = {
    container : {
        Container: require('./commonjs/container/Container').Container,
        ContainerAware: require('./commonjs/container/ContainerAware').ContainerAware
    },
    core : {
        Application: require('./commonjs/core/Application').Application,
        module: {
            Module: require('./commonjs/core/module/Module').Module
        },

    },
    event : {
        Event: require('./commonjs/event/Event').Event,
        EventManagerAware: require('./commonjs/event/EventManagerAware').EventManagerAware,
        EventManager: require('./commonjs/event/EventManager').EventManager,
        Listener: require('./commonjs/event/Listener').Listener
    },
    localize : {
        Localize : require('./commonjs/localize/Localize').Localize
    }
};