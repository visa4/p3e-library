import {ContainerInterface} from './ContainerInterface';

/**
 * Container
 */
export class Container implements ContainerInterface {
    /**
     * @type {string}
     */
    static LOAD_SERVICE: string = 'load-service';

    /**
     * @type {object}
     */
    private services: object = {};

    /**
     * @param {string} id
     * @return Promise
     */
    get(id: string) {

        return new Promise(function (resolve, reject) {
                /**
                * Inject container if the service is a callback
                */
                if (typeof this.services[id] === 'function') {
                    this.services[id] = this.services[id](this);
                }

                resolve(this.services[id]);
            }.bind(this)
        );
    };

    /**
     * @param {string} id
     * @return boolean
     */
    has(id: string) {
        return !!this.services[id];
    };

    /**
     * @param {string} id
     * @param service
     * @return ContainerInterface
     */
    set(id: string, service: any) {
        this.services[id] = service;

        return this;
    };
}

