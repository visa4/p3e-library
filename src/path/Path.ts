/**
 *
 */
export class Path {

    /**
     * @type {string}
     */
    protected nameFile:string = '';

    /**
     * @type {string}
     */
    protected directory:string = '';

    /**
     * @type {string}
     */
    protected extension:string = '';


    /**
     * @param path
     */
    constructor(path) {

        if (!path) {
            return;
        }

        let nodePath = require('path');
        let extName = nodePath.extname(path);
        let directory = nodePath.basename(path);

        directory = directory ? directory + nodePath.sep : '';

        this.nameFile = nodePath.basename(path, extName);

        this.extension = extName.replace('.', '');

        this.directory = directory;
    }

    /**
     * @return {string}
     */
    public getPath() {
        let file = '';
        if (this.nameFile && this.extension) {
            file = `${this.nameFile}.${this.extension}`;
        }

        return `${this.directory}${file}`;
    }
}