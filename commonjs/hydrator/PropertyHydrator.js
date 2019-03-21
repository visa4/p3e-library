"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractHydrator_1 = require("./AbstractHydrator");
/**
 *
 */
class PropertyHydrator extends AbstractHydrator_1.AbstractHydrator {
    /**
     * @param {object} data
     */
    extract(data) {
        let object = {};
        for (let property in data) {
            if (this.skipPropertyToExtract(property)) {
                continue;
            }
            object[this.extractProperty(property)] = this.extractValue(property, data[property]);
        }
        return object;
    }
    /**
     * @param {object} data
     * @param {object} object
     */
    hydrate(data, object) {
        object = object ? object : this.getTemplateObjectHydration();
        for (let property in data) {
            if (this.skipPropertyToHydrate(property)) {
                continue;
            }
            object[this.hydrateProperty(property)] = this.hydrateValue(property, data[property]);
        }
        return object;
    }
}
exports.PropertyHydrator = PropertyHydrator;
