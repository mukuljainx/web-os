"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var icons_1 = __importDefault(require("atoms/icons"));
var React = __importStar(require("react"));
var styled_components_1 = __importDefault(require("styled-components"));
var styled_1 = require("atoms/styled");
var react_1 = require("@fluentui/react");
var Wrapper = styled_components_1.default(styled_1.Acrylic)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  width: 100%;\n  height: 52px;\n  position: fixed;\n  bottom: 0;\n  justify-content: space-between;\n"], ["\n  display: flex;\n  width: 100%;\n  height: 52px;\n  position: fixed;\n  bottom: 0;\n  justify-content: space-between;\n"])));
var AppBar = function (_a) {
    var apps = _a.apps;
    var sortedApps = Object.values(apps).sort(function (a, b) {
        return a.initialWeight > b.initialWeight ? 1 : -1;
    });
    return (React.createElement(Wrapper, { "data-id": "app-bar" },
        React.createElement("div", null, sortedApps.map(function (app) { return (React.createElement("div", null,
            React.createElement(icons_1.default, { key: app.id, name: app.id }))); })),
        React.createElement("div", null,
            React.createElement(react_1.Icon, { iconName: "ChevronUp" }))));
};
exports.default = AppBar;
var templateObject_1;
//# sourceMappingURL=index.js.map