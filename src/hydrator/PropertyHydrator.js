import { AbstractHydrator } from "./AbstractHydrator";
/**
 *
 */
export class PropertyHydrator extends AbstractHydrator {
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
