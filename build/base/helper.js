"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRoutes = exports.getPath = void 0;
var string_1 = require("utils/string");
var getPath = function (file, user) {
    var path = (file.parent === "/" ? "" : file.parent) + "/" + file.name;
    return string_1.interpolate(path, { user: user }).replace(" ", "-");
};
exports.getPath = getPath;
var getRoutes = function (root, user) {
    var inner = function (root, user) {
        var routes = [];
        root.files.forEach(function (file) {
            if (file.isFolder) {
                routes.push({ path: exports.getPath(file, user), files: file.files, file: file });
                routes.push.apply(routes, inner(file, user));
            }
        });
        return routes;
    };
    return __spreadArray(__spreadArray([], inner(root, user)), [{ path: "/", file: root, files: root.files }]);
};
exports.getRoutes = getRoutes;
//# sourceMappingURL=helper.js.map