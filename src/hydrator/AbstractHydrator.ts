/**
 *
 */
import {HydratorInteface} from "./HydratorInteface";

export abstract class AbstractHydrator implements HydratorInteface {

    /**
     * @type {null}
     */
    private templateObjectHydration:object = null;

    /**
     * @type {object}
     */
    private valueStrategies:object = {};

    /**
     * @type {object}
     */
    private nameStrategies:object = {};

    /**
     * @param {object} templateObjectHydration
     * @param {object} valueStrategies
     * @param {object} nameStrategies
     */
    constructor(templateObjectHydration:object, valueStrategies:object, nameStrategies:object) {

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

    /**
     * @param {object} data
     */
    abstract hydrate(data:object);

    /**
     * @param {object} data
     */
    abstract extract(data:object);
}
