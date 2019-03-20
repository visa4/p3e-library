/**
 *
 */
export interface PropertyStrategyInterface {

    /**
     * @param {string} property
     */
    hydrateProperty(property:string);

    /**
     * @param {string} property
     */
    extractProperty(property:string);
}