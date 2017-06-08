"use strict";
/**
 * Component Routing Module
 */
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const mock = require("./mocking");
exports.mock = mock;
var mocking_1 = require("./mocking");
exports.ContentMockingService = mocking_1.ContentMockingService;
__export(require("./component"));
var store_1 = require("./store");
exports.Store = store_1.default;
var query_1 = require("./query");
exports.Query = query_1.default;
__export(require("./query/interfaces"));
//# sourceMappingURL=index.js.map