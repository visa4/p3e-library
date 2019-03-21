/**
 *
 */
export interface ValueStrategyInteface {

    /**
     * @param property
     * @param data
     */
    hydrateValue(property:string, data:any);

    /**
     * @param property
     * @param data
     */
    extractValue(property:string, data:any);
}