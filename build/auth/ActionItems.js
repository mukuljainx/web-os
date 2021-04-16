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
var input_1 = __importStar(require("atoms/input"));
var materialIcon_1 = __importDefault(require("atoms/materialIcon"));
var If_1 = __importDefault(require("atoms/If"));
var BackButton = styled_components_1.default(input_1.Button)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  position: static;\n  margin-right: 4px;\n  border-color: white;\n  color: white;\n"], ["\n  position: static;\n  margin-right: 4px;\n  border-color: white;\n  color: white;\n"])));
var AuthDisplayString = styled_components_1.default.p(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  text-transform: capitalize;\n  color: ", ";\n  text-shadow: ", ";\n  margin: 16px 0 40px;\n  ", "\n"], ["\n  text-transform: capitalize;\n  color: ", ";\n  text-shadow: ", ";\n  margin: 16px 0 40px;\n  ", "\n"])), function (_a) {
    var theme = _a.theme;
    return theme.icon.textColor;
}, function (_a) {
    var theme = _a.theme;
    return theme.icon.textShadow;
}, function (_a) {
    var selected = _a.selected;
    return (selected ? "margin-bottom: 16px" : "");
});
var ActionItems = function (_a) {
    var actions = ["login", "signup", "guest"];
    var _b = React.useState(null), selected = _b[0], setSelected = _b[1];
    var filteredActions = actions.filter(function (a) {
        return selected ? a === selected : true;
    });
    var handleActionClick = function (event) {
        setSelected(event.currentTarget.getAttribute("data-id"));
    };
    var handleBackClick = function (event) {
        event.stopPropagation();
        setSelected(null);
    };
    return filteredActions.map(function (action) { return (React.createElement("div", { "data-id": action, className: "auth__button flex flex-column align-items-center", key: action, onClick: handleActionClick },
        React.createElement("div", { className: "auth__button__image" }),
        React.createElement(AuthDisplayString, { selected: action === selected }, action),
        React.createElement(If_1.default, { condition: selected === "guest" },
            React.createElement("div", { className: "flex align-items-center" },
                React.createElement(BackButton, { onClick: handleBackClick },
                    React.createElement(materialIcon_1.default, { name: "west" })),
                React.createElement(input_1.default, { withForm: true, onSubmit: function (value) {
                        console.log(value);
                    } }))))); });
};
exports.default = ActionItems;
var templateObject_1, templateObject_2;
//# sourceMappingURL=ActionItems.js.map