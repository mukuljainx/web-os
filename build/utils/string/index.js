"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interpolate = void 0;
var interpolate = function (s, map) {
    var values = Object.values(map);
    var keys = Object.keys(map);
    return new (Function.bind.apply(Function, __spreadArray(__spreadArray([void 0], keys), ["return `" + s + "`;"])))()(values);
};
exports.interpolate = interpolate;
//# sourceMappingURL=index.js.map