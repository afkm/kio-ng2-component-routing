export function inheritAnnotation(parentAnnotation, childAnnotation) {
    var out = Object.assign({}, childAnnotation);
    Object.keys(parentAnnotation).forEach(function (key) {
        if (!childAnnotation.hasOwnProperty(key)) {
            out[key] = parentAnnotation[key];
        }
    });
    return out;
}
//# sourceMappingURL=inherit.js.map