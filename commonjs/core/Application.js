"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EventManager_1 = require("../event/EventManager");
/**
 *  Application
 */
class Application {
    constructor() {
        /**
         * @type {Array<Module>}
         */
        this.modules = [];
        /**
         * @type {EventManager}
         */
        this.eventManager = new EventManager_1.EventManager();
    }
    /**
     * @param {Array<Module>} modules
     * @param {ContainerInterface} container
     */
    loadModules(modules, container) {
        for (let cont = 0; modules.length > cont; cont++) {
            this.loadModule(modules[cont], container);
            this.modules.push(modules[cont]);
        }
        this.getEventManager().emit(Application.BOOTSTRAP_MODULE, modules);
    }
    /**
     * @param {Module} module
     */
    loadModule(module, container) {
        /**
         * to run absolute path on windows, for polymer cli script c:/ !== /c:/
         */
        let modulePath = this.getModulePath();
        modulePath = modulePath.charAt(0) !== '/' ? `/${modulePath}` : modulePath;
        let configModule;
        let configModuleClass;
        /**
         * Load entry point module
         */
        if (module.getWebComponentEntryPointName() && customElements && customElements.get(module.getWebComponentEntryPointName()) === undefined) {
            let wcEntryPoint = `${modulePath}${module.getName()}${this.getSlash()}${module.getWebComponentEntryPointNameFile()}`;
            Promise.resolve().then(() => require(wcEntryPoint)).then((module) => {
                console.log("Load entry point module:", module.getWebComponentEntryPointName(), module);
            })
                .catch((err) => {
                console.log("Failed to load entry point module:", err);
            });
        }
        if (module.getConfigEntryPoint()) {
            let configModulePath = `${modulePath}${module.getName()}${this.getSlash()}${module.getConfigEntryPoint()}`;
            configModule = require(configModulePath);
            configModuleClass = new configModule.Config();
            configModuleClass.setContainer(container);
            configModuleClass.init();
        }
    }
    /**
     * @return {string}
     */
    getBasePath() {
        return this.basePath;
    }
    /**
     * @param {string} basePath
     * @return {Application}
     */
    setBasePath(basePath) {
        this.basePath = basePath;
        return this;
    }
    /**
     * @return {string}
     */
    getResourcePath() {
        return this.resourcePath;
    }
    /**
     * @param {string} resourcePath
     * @return {Application}
     */
    setResourcePath(resourcePath) {
        this.resourcePath = resourcePath;
        return this;
    }
    /**
     * @return {string}
     */
    getModulePath() {
        return this.modulePath;
    }
    /**
     * @param {string} modulePath
     * @return {Application}
     */
    setModulePath(modulePath) {
        this.modulePath = modulePath;
        return this;
    }
    /**
     * @return {string}
     */
    getSlash() {
        return this.slash;
    }
    /**
     * @param {string} slash
     * @return {Application}
     */
    setSlash(slash) {
        this.slash = slash;
        return this;
    }
    /**
     * @param {Module} module
     */
    addModule(module) {
        this.modules.push(module);
    }
    /**
     * @return {Array<Module>}
     */
    getModules() {
        return this.modules;
    }
    /**
     * @param {string} id
     * @return Application
     */
    removeModule(id) {
        for (let cont = 0; this.modules.length > cont; cont) {
            if (this.modules[cont].getId() === id) {
                this.modules.splice(cont, 1);
                break;
            }
        }
        return this;
    }
    /**
     * @param {ContainerInterface} container
     */
    static injectService(container) {
        console.log('inject');
    }
    /**
     * @param {EventManagerInterface} eventManager
     * @return {this}
     */
    setEventManager(eventManager) {
        this.eventManager = eventManager;
        return this;
    }
    /**
     * @return {EventManagerInterface}
     */
    getEventManager() {
        return this.eventManager;
    }
}
/**
 * @type {string}
 */
Application.BOOTSTRAP_MODULE = 'bootstrap-module';
/**
 * @type {string}
 */
Application.LOAD_MODULE = 'laod-module';
exports.Application = Application;
