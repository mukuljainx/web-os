"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sizeChart = void 0;
var React = __importStar(require("react"));
var styled_components_1 = __importDefault(require("styled-components"));
require("./icons.scss");
var image_1 = __importDefault(require("./image"));
var label_1 = __importDefault(require("./label"));
var Wrapper = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  &:focus {\n    outline: none;\n  }\n  .icon__image,\n  .icon__label {\n    &:focus {\n      outline: none;\n    }\n  }\n  ", "\n"], ["\n  &:focus {\n    outline: none;\n  }\n  .icon__image,\n  .icon__label {\n    &:focus {\n      outline: none;\n    }\n  }\n  ",
    "\n"])), function (_a) {
    var highlight = _a.highlight;
    return highlight
        ? "\n    .icon__image {\n      // margin-bottom: 2px;\n      padding: 0px;\n      border-radius: 4px;\n      border: 2px solid var(--icon-border-color);\n    }\n    .icon__label {\n      background: var(--icon-text-background);\n    }\n  "
        : "";
});
exports.sizeChart = { DESKTOP: 64 };
var Icon = function (_a) {
    var type = _a.type, name = _a.name, label = _a.label, innnerRef = _a.innnerRef, rest = __rest(_a, ["type", "name", "label", "innnerRef"]);
    if (type === "DESKTOP") {
        return (React.createElement(Wrapper, __assign({}, rest, { ref: innnerRef, className: "inline-flex flex-column justify-content-center align-items-center icon " + (rest.className || "") }),
            React.createElement(image_1.default, { name: name, size: exports.sizeChart[type] }),
            React.createElement(label_1.default, { name: label || "" })));
    }
    return React.createElement(image_1.default, { name: name, size: exports.sizeChart["DESKTOP"] || 24 });
};
exports.default = Icon;
var templateObject_1;
//# sourceMappingURL=index.js.map