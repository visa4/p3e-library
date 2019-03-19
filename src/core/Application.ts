import {ContainerInterface, ContainerAwareInterface} from "../container/index";
import {Module} from "./Module";
import {EventManagerAwareInterface, EventManagerInterface} from "../event/index";
import {EventManager} from "../event/EventManager";

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
     * @param {Array<Module>} modules
     * @param {ContainerInterface} container
     */
    public loadModules(modules:Array<Module>, container:ContainerInterface) {
        for (let cont = 0; modules.length > cont; cont++) {
            this.loadModule(modules[cont], container);
            this.modules.push(modules[cont]);
        }
        this.getEventManager().emit(Application.BOOTSTRAP_MODULE, modules);
    }

    /**
     * @param {Module} module
     */
    private loadModule(module:Module, container:ContainerInterface) {

        /**
         * to run absolute path on windows, for polymer cli script c:/ !== /c:/
         */
        let modulePath = this.getModulePath();
        modulePath = modulePath.charAt(0) !== '/' ? `/${modulePath}`: modulePath;

        let configModule;
        let configModuleClass;

        /**
         * Load entry point module
         */
        if (module.getWebComponentEntryPointName() && customElements && customElements.get(module.getWebComponentEntryPointName()) === undefined) {

            let wcEntryPoint = `${modulePath}${module.getName()}${this.getSlash()}${module.getWebComponentEntryPointNameFile()}`;
            import(wcEntryPoint)
                .then((module) => {
                    console.log("Load entry point module:", module.getWebComponentEntryPointName(), module);

                })
                .catch((err) => {
                    console.log("Failed to load entry point module:", err);
                });
        }

        if (module.getConfigEntryPoint()) {
            let configModulePath = `${modulePath}${module.getName()}${this.getSlash()}${module.getConfigEntryPoint()}`;


            configModule  = require(configModulePath);
            configModuleClass = new configModule.Config();
            configModuleClass.setContainer(container);
            configModuleClass.init();
        }
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
        return this.slash;
    }

    /**
     * @param {string} slash
     * @return {Application}
     */
    public setSlash(slash: string) {
        this.slash = slash;
        return this;
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
     * @param {ContainerInterface} container
     */
    public static injectService(container:ContainerInterface) {
        console.log('inject');
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