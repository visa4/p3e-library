export class AbstractHydrator {
    /**
     * @param {object} templateObjectHydration
     * @param {object} valueStrategies
     * @param {object} propertyStrategies
     */
    constructor(templateObjectHydration, valueStrategies, propertyStrategies) {
        /**
         * @type {null}
         */
        this.templateObjectHydration = null;
        /**
         * @type {object}
         */
        this.valueStrategies = {};
        /**
         * @type {object}
         */
        this.propertyStrategies = {};
        /**
         * @type {object}
         */
        this.enablePropertyToHydrate = {};
        /**
         * @type {object}
         */
        this.enablePropertyToExtract = {};
        /**
         * @type {object}
         */
        this.templateObjectHydration = templateObjectHydration;
        /**
         * @type {object}
         */
        this.valueStrategies = valueStrategies;
        /**
         * @type {object}
         */
        this.propertyStrategies = propertyStrategies;
    }
    /**
     * @param {string} name
     * @param {PropertyStrategyInterface} strategy
     * @return {AbstractHydrator}
     */
    addPropertyStrategy(name, strategy) {
        this.propertyStrategies[name] = strategy;
        return this;
    }
    /**
     * @param {string} name
     * @return {PropertyStrategyInterface|undefined}
     */
    getPropertyStrategy(name) {
        return this.propertyStrategies[name];
    }
    /**
     * @param {string} name
     * @return {AbstractHydrator}
     */
    removePropertyStrategy(name) {
        delete this.propertyStrategies[name];
        return this;
    }
    /**
     * @param {string} name
     * @return {boolean}
     */
    hasPropertytrategy(name) {
        return !!this.propertyStrategies[name];
    }
    /**
     * @param {string} name
     * @param {ValueStrategyInteface} strategy
     * @return {this}
     */
    addValueStrategy(name, strategy) {
        this.valueStrategies[name] = strategy;
        return this;
    }
    /**
     * @param {string} name
     * @return {this}
     */
    removeValueStrategy(name) {
        delete this.valueStrategies[name];
        return this;
    }
    /**
     * @param {string} name
     * @return {boolean}
     */
    hasValueStrategy(name) {
        return !!this.valueStrategies[name];
    }
    /**
     * @param {string} name
     * @return {ValueStrategyInteface|undefined}
     */
    getValueStrategy(name) {
        return this.valueStrategies[name];
    }
    /**
     * @return {object}
     */
    getTemplateObjectHydration() {
        let obj = {};
        if (this.templateObjectHydration !== null) {
            obj = new this.templateObjectHydration.constructor();
        }
        return obj;
    }
    /**
     * @param {string} name
     * @return {boolean}
     */
    skipPropertyToHydrate(name) {
        return Object.keys(this.enablePropertyToHydrate).length !== 0 && !this.enablePropertyToHydrate[name];
    }
    /**
     * @param {string} name
     * @return {boolean}
     */
    skipPropertyToExtract(name) {
        return Object.keys(this.enablePropertyToExtract).length !== 0 && !this.enablePropertyToExtract[name];
    }
    /**
     * @param name
     * @return {any}
     */
    hydrateProperty(name) {
        let hydrateProperty = name;
        if (this.hasPropertytrategy(name)) {
            hydrateProperty = this.getPropertyStrategy(name).hydrateProperty(name);
        }
        return hydrateProperty;
    }
    /**
     * @param {string} name
     * @param data
     * @return {string}
     */
    hydrateValue(name, data) {
        let hydrateProperty = name;
        if (this.hasValueStrategy(name)) {
            hydrateProperty = this.getValueStrategy(name).hydrateValue(name, data);
        }
        return hydrateProperty;
    }
    /**
     * @param name
     * @return {any}
     */
    extractProperty(name) {
        let extractProperty = name;
        if (this.hasPropertytrategy(name)) {
            extractProperty = this.getValueStrategy(name).extractProperty(name);
        }
        return extractProperty;
    }
    /**
     * @param {string} name
     * @param data
     * @return {string}
     */
    extractValue(name, data) {
        let extractValue = name;
        if (this.hasValueStrategy(name)) {
            extractValue = this.getValueStrategy(name).extractValue(name, data);
        }
        return extractValue;
    }
}
