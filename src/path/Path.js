/**
 *
 */
export class Path {
    /**
     * @param path
     */
    constructor(path) {
        /**
         * @type {string}
         */
        this.nameFile = '';
        /**
         * @type {string}
         */
        this.directory = '';
        /**
         * @type {string}
         */
        this.extension = '';
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
    getPath() {
        let file = '';
        if (this.nameFile && this.extension) {
            file = `${this.nameFile}.${this.extension}`;
        }
        return `${this.directory}${file}`;
    }
}
//# sourceMappingURL=Path.js.map