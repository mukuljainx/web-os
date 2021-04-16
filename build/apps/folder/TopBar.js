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
var materialIcon_1 = __importDefault(require("atoms/materialIcon"));
var React = __importStar(require("react"));
var styled_components_1 = __importDefault(require("styled-components"));
var Wrapper = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  height: 40px;\n  border-bottom: 1px solid;\n  justify-content: space-between;\n"], ["\n  height: 40px;\n  border-bottom: 1px solid;\n  justify-content: space-between;\n"])));
var TopBar = function (_a) {
    var onPreviousClick = _a.onPreviousClick, onNextClick = _a.onNextClick, onCloseClick = _a.onCloseClick, __ = _a.ref, rest = __rest(_a, ["onPreviousClick", "onNextClick", "onCloseClick", "ref"]);
    return (React.createElement(Wrapper, __assign({}, rest, { className: "flex align-items-center" }),
        React.createElement("div", { className: "flex align-items-center" },
            React.createElement(materialIcon_1.default, { onClick: onPreviousClick, size: 32, name: "arrow_left" }),
            React.createElement(materialIcon_1.default, { onClick: onNextClick, size: 32, name: "arrow_right" })),
        React.createElement("div", { className: "flex align-items-center" },
            React.createElement(materialIcon_1.default, { onClick: onCloseClick, size: 24, name: "close" }))));
};
exports.default = TopBar;
var templateObject_1;
//# sourceMappingURL=TopBar.js.map