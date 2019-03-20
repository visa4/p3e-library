"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AbstractHydrator {
    /**
     * @param {object} templateObjectHydration
     * @param {object} valueStrategies
     * @param {object} nameStrategies
     */
    constructor(templateObjectHydration, valueStrategies, nameStrategies) {
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
        this.nameStrategies = {};
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
        this.nameStrategies = nameStrategies;
    }
}
exports.AbstractHydrator = AbstractHydrator;
