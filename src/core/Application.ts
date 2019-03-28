import {ContainerInterface, ContainerAwareInterface} from "../container/index";
import {Module} from "./module/index";
import {EventManagerAwareInterface, EventManagerInterface} from "../event/index";
import {EventManager} from "../event/EventManager";
import * as pathd from "path";


/**
 *  Application
 */
export class Application implements EventManagerAwareInterface {

    /**
     * @type {string}
     */
    static BOOTSTRAP_MODULE: string = 'bootstrap-module';

    /**
     * @type {string}
     */
    static LOAD_MODULE: string = 'laod-module';

    /**
     * @type {string}
     */
    private basePath: string;

    /**
     * @type {string}
     */
    private resourcePath: string;

    /**
     * @type {string}
     */
    private modulePath: string;

    /**
     * @type {string}
     */
    private slash: string;

    /**
     * @type {Array<Module>}
     */
    private modules: Array<Module> = [];

    /**
     * @type {EventManager}
     */
    private eventManager:EventManagerInterface = new EventManager();

    /**
     * @type {path}
     */
    private path: any = require('path');

    /**
     * @param {Array<Module>} modules
     * @param {ContainerInterface} container
     */
    public loadModules(modules:Array<Module>, container:ContainerInterface) {

        let promises = [];
        for (let cont = 0; modules.length > cont; cont++) {
            promises.push(this._loadModule(modules[cont], container));
        }

        Promise.all(promises).then(
            (modules) => {
                this.modules= modules;
                this.getEventManager().emit(Application.BOOTSTRAP_MODULE, modules);
        });

    }

    /**
     * @param {Module} module
     * @param {ContainerInterface} container
     * @return {Promise<Module>}
     * @private
     */
    private async _loadModule(module:Module, container:ContainerInterface) {

        /**
         * to run absolute path on windows, for polymer cli script c:/ !== /c:/ when use import
         */
        let modulePath = this.getModulePath();
        modulePath = modulePath.charAt(0) !== '/' ? `/${modulePath}`: modulePath;

        let configModule;
        let configModuleClass;
        let autoloadRequire;

        /**
         * Load entry point module
         */
        if (module.getWebComponentEntryPointName() && customElements && customElements.get(module.getWebComponentEntryPointName()) === undefined) {

            let wcEntryPoint = `${modulePath}${module.getName()}${this.getSlash()}${module.getWebComponentEntryPointNameFile()}`;
            await import(wcEntryPoint)
                .then((moduleLoaded) => {
                    console.log("Load entry point module:", module.getWebComponentEntryPointName(), module);

                })
                .catch((err) => {
                    console.log("Failed to load entry point module:", err);
                });
        }

        if (module.getAutoloads().length > 0) {

            for (let cont = 0; module.getAutoloads().length > cont; cont++) {

                autoloadRequire  = require(`${this.getModulePath()}${module.getName()}${this.getSlash()}${this.path.normalize(module.getAutoloads()[cont])}`);
                window[autoloadRequire.name] = autoloadRequire;
            }
        }

        if (module.getConfigEntryPoint()) {
            let configModulePath = `${this.getModulePath()}${module.getName()}${this.getSlash()}${this.path.normalize(module.getConfigEntryPoint())}`;


            configModule  = require(configModulePath);
            configModuleClass = new configModule();
            configModuleClass.setContainer(container);
            /**
             * Init module
             */
            await configModuleClass.init();
        }

        return module;
    }

    /**
     * @return {string}
     */
    public getBasePath() {
        return this.basePath;
    }

    /**
     * @param {string} basePath
     * @return {Application}
     */
    public setBasePath(basePath: string) {
        this.basePath = basePath;
        return this;
    }

    /**
     * @return {string}
     */
    public getResourcePath() {
        return this.resourcePath;
    }

    /**
     * @param {string} resourcePath
     * @return {Application}
     */
    public setResourcePath(resourcePath: string) {
        this.resourcePath = resourcePath;
        return this;
    }

    /**
     * @return {string}
     */
    public getModulePath() {
        return this.modulePath;
    }

    /**
     * @param {string} modulePath
     * @return {Application}
     */
    public setModulePath(modulePath: string) {
        this.modulePath = modulePath;
        return this;
    }

    /**
     * @return {string}
     */
    public getSlash() {
        return this.path.sep;
    }

    /**
     * @param {Module} module
     */
    public addModule(module:Module) {
        this.modules.push(module);
    }

    /**
     * @return {Array<Module>}
     */
    public getModules() {
        return this.modules;
    }

    /**
     * @param {string} id
     * @return Application
     */
    public removeModule(id: string) {
        for (let cont = 0; this.modules.length > cont; cont) {
            if (this.modules[cont].getId() === id) {
                this.modules.splice(cont, 1);
                break;
            }
        }
        return this;
    }

    /**
     * @param {EventManagerInterface} eventManager
     * @return {this}
     */
    public setEventManager(eventManager:EventManagerInterface) {
        this.eventManager = eventManager;
        return this;
    }

    /**
     * @return {EventManagerInterface}
     */
    public getEventManager() {
        return this.eventManager;
    }
}