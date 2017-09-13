import { KioFragmentModel, KioPublicationModel } from 'kio-ng2-data';
export function isStateful(other) {
    return ('object' === typeof other
        &&
            'componentState' in other);
}
export function isNode(other) {
    return ('object' === typeof other
        &&
            'node' in other);
}
export function isData(other) {
    return ('object' === typeof other
        &&
            'onData' in other
        &&
            'contentStateChanges' in other);
}
export function isCollection(other) {
    return ('object' === typeof other
        &&
            'node' in other
        &&
            (other.node instanceof KioFragmentModel || other.node instanceof KioPublicationModel));
}
//# sourceMappingURL=index.js.map