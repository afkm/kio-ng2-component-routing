import { KioFragmentModel } from 'kio-ng2-data';
import { cuid } from './cuid';
import { mockContentFromString } from './content';
export var mockFragment = function (children, modifiers) {
    if (modifiers === void 0) { modifiers = []; }
    return new KioFragmentModel({
        cuid: cuid(),
        modifiers: modifiers,
        children: children.map(function (child) {
            if (child.isKioNode)
                return child;
            if (Array.isArray(child)) {
                return mockFragment(child[0], child[1]);
            }
            return mockContentFromString(child);
        })
    });
};
//# sourceMappingURL=fragment.js.map