"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 */
class NumberStrategy {
    /**
     *
     * @param data
     * @returns {*}
     */
    hydrateValue(data) {
        let hydrate = data;
        // TODO complete other type
        switch (typeof data) {
            case 'string':
                hydrate = parseFloat(data);
                break;
            case 'boolean':
                hydrate = data ? 1 : 0;
                break;
        }
        return hydrate;
    }
    /**
     *
     * @param data
     * @returns {*}
     */
    extractValue(data) {
        let extract = data;
        // TODO complete other type
        switch (typeof data) {
            case 'string':
                extract = parseFloat(data);
                break;
            case 'boolean':
                extract = data ? 1 : 0;
                break;
        }
        return extract;
    }
}
exports.NumberStrategy = NumberStrategy;
