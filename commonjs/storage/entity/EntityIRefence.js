"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 */
class EntityIdentifier {
    /**
     * @inheritDoc
     */
    getId() {
        return this.id;
    }
    /**
     * @inheritDoc
     */
    setId(id) {
        this.id = id;
        return this;
    }
    /**
     * @return {string}
     */
    getCollection() {
        return this.collection;
    }
    /**
     * @param {string} collection
     * @return {this}
     */
    setCollection(collection) {
        this.collection = collection;
        return this;
    }
}
exports.EntityIdentifier = EntityIdentifier;
