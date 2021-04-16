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
var React = __importStar(require("react"));
var styled_components_1 = __importDefault(require("styled-components"));
var Text = styled_components_1.default.p(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  width: 84px;\n  margin: 0;\n  padding: 2px 8px;\n  border-radius: 4px;\n  text-align: center;\n  color: ", ";\n  text-shadow: ", ";\n"], ["\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  width: 84px;\n  margin: 0;\n  padding: 2px 8px;\n  border-radius: 4px;\n  text-align: center;\n  color: ", ";\n  text-shadow: ", ";\n"])), function (_a) {
    var theme = _a.theme;
    return theme.icon.textColor;
}, function (_a) {
    var theme = _a.theme;
    return theme.icon.textShadow;
});
var Label = function (_a) {
    var name = _a.name;
    return React.createElement(Text, { className: "icon__label" }, name);
};
exports.default = Label;
var templateObject_1;
//# sourceMappingURL=label.js.map