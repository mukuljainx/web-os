"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Acrylic = void 0;
var styled_components_1 = __importDefault(require("styled-components"));
exports.Acrylic = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  background: ", ";\n  backdrop-filter: blur(10px);\n"], ["\n  background: ",
    ";\n  backdrop-filter: blur(10px);\n"])), function (_a) {
    var theme = _a.theme;
    return theme.mode === "light"
        ? "rgba(255, 255, 255, 0.6);"
        : "rgba(0, 0, 0, 0.5);";
});
var templateObject_1;
//# sourceMappingURL=index.js.map