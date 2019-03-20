/**
 *
 */
export interface ValueStrategyInteface {

    /**
     * @param property
     */
    hydrateProperty(property:any);

    /**
     * @param property
     */
    extractProperty(property:any);
}