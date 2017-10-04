export function dasherize(source) {
    function replaceMatch(match, found, pos) {
        if (pos > 0 && found !== undefined) {
            return '-' + match;
        }
        else {
            return match;
        }
    }
    return source
        .replace(/([A-Z]{1}[a-z]+|[A-Z]{1,}$)?/g, replaceMatch)
        .split('-').map(function (p) { return p.replace(/([A-Z]+)/, replaceMatch); })
        .join('-').toLowerCase();
}
//# sourceMappingURL=dasherize.js.map