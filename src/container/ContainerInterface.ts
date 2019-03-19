/**
 * ContainerInterface
 */

export interface ContainerInterface {

    /**
     * @param {string} id
     * @return Promise
     */
    get(id: string);

    /**
     * @param {string} id
     * @return boolean
     */
    has(id: string);

    /**
     * @param {string} id
     * @param service
     */
    set(id: string, service: any);
}

