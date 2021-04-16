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
exports.Button = void 0;
var materialIcon_1 = __importDefault(require("atoms/materialIcon"));
var React = __importStar(require("react"));
var styled_components_1 = __importDefault(require("styled-components"));
exports.Button = styled_components_1.default.button(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  background: none;\n  position: absolute;\n  right: 2px;\n  top: 2px;\n  padding: 1px 0;\n  ", "\n  &:focus {\n    outline: none;\n  }\n"], ["\n  background: none;\n  position: absolute;\n  right: 2px;\n  top: 2px;\n  padding: 1px 0;\n  ",
    "\n  &:focus {\n    outline: none;\n  }\n"])), function (_a) {
    var input = _a.theme.input;
    return "\n    border: 2px solid " + input.actionButton.color + ";\n    color: " + input.actionButton.color + ";\n    border-radius: " + input.actionButton.borderRadius + ";\n    height: " + (input.height - 4) + "px;\n    width: " + (input.height - 4) + "px;\n  ";
});
var InputWrapper = styled_components_1.default.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  border-radius: ", "px;\n  position: relative;\n  input {\n    ", "\n    background: rgba(255,255,255,0.6);\n    border: none;\n    padding: 0 16px;\n    &:focus {\n      outline: none;\n    }\n  }\n"], ["\n  border-radius: ", "px;\n  position: relative;\n  input {\n    ",
    "\n    background: rgba(255,255,255,0.6);\n    border: none;\n    padding: 0 16px;\n    &:focus {\n      outline: none;\n    }\n  }\n"])), function (_a) {
    var theme = _a.theme;
    return theme.input.borderRadius;
}, function (_a) {
    var input = _a.theme.input;
    return "\n      border-radius: " + input.borderRadius + "px;\n      height: " + input.height + "px;\n      font-size: " + input.fontSize + "px;\n    ";
});
var Input = function (_a) {
    var withForm = _a.withForm, onSubmit = _a.onSubmit, props = __rest(_a, ["withForm", "onSubmit"]);
    return (React.createElement(InputWrapper, { onSubmit: withForm && onSubmit
            ? function (event) {
                onSubmit(event.target
                    .elements[0].value);
                event.preventDefault();
            }
            : undefined, as: withForm ? "form" : undefined },
        React.createElement("input", __assign({}, props)),
        withForm && (React.createElement(exports.Button, { type: "submit" },
            React.createElement(materialIcon_1.default, { size: 14, bold: true, type: "two-tone", name: "east" })))));
};
exports.default = Input;
var templateObject_1, templateObject_2;
//# sourceMappingURL=index.js.map