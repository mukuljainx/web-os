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
var react_spring_1 = require("react-spring");
var react_redux_1 = require("react-redux");
var react_router_dom_1 = require("react-router-dom");
var input_1 = __importStar(require("atoms/input"));
var materialIcon_1 = __importDefault(require("atoms/materialIcon"));
var If_1 = __importDefault(require("atoms/If"));
var store_1 = require("auth/store");
var BackButton = styled_components_1.default(input_1.Button)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  position: static;\n  margin-right: 4px;\n"], ["\n  position: static;\n  margin-right: 4px;\n"])));
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
var AuthImage = styled_components_1.default.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  border-radius: 50%;\n  width: 100px;\n  height: 100px;\n  background: white;\n"], ["\n  border-radius: 50%;\n  width: 100px;\n  height: 100px;\n  background: white;\n"])));
var ActionWrapper = styled_components_1.default(react_spring_1.animated.div)(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  width: 202px;\n  cursor: pointer;\n  ", ";\n  &:not(:last-child) {\n    margin-right: 40px;\n  }\n"], ["\n  width: 202px;\n  cursor: pointer;\n  ",
    ";\n  &:not(:last-child) {\n    margin-right: 40px;\n  }\n"])), function (_a) {
    var $show = _a.$show;
    return !$show
        ? "\n    opacity: 0;\n    z-index: -2;\n    "
        : "";
});
var Auth = function () {
    var actions = ["login", "signup", "guest"];
    var dispatch = react_redux_1.useDispatch();
    var user = react_redux_1.useSelector(function (state) { return state.auth.user; });
    var _a = React.useState(null), selected = _a[0], setSelected = _a[1];
    var x = react_spring_1.useSpring({ x: 0 }).x;
    var handleActionClick = function (event) {
        setSelected(event.currentTarget.getAttribute("data-id"));
    };
    var handleBackClick = function (event) {
        event.stopPropagation();
        setSelected(null);
    };
    React.useEffect(function () {
        if (selected === "guest") {
            x.start({ from: 0, to: -242 });
        }
    }, [selected]);
    if (user) {
        return React.createElement(react_router_dom_1.Redirect, { to: "/" });
    }
    return (React.createElement("div", { style: {
            backgroundImage: "url(" + require("display/wallpaper/default.jpg").default + ")",
        }, className: "image-cover" },
        React.createElement("div", { className: "flex align-items-center justify-content-center auth h-100" },
            React.createElement("div", { className: "flex" }, actions.map(function (action) { return (React.createElement(ActionWrapper, { "$show": !selected || selected === action, style: action === "guest" ? { x: x } : {}, "data-id": action, className: "flex flex-column align-items-center", key: action, onClick: handleActionClick },
                React.createElement(AuthImage, null),
                React.createElement(AuthDisplayString, { selected: action === selected }, action),
                React.createElement(If_1.default, { condition: selected === "guest" && action === "guest" },
                    React.createElement("div", { className: "flex align-items-center" },
                        React.createElement(BackButton, { onClick: handleBackClick },
                            React.createElement(materialIcon_1.default, { name: "west", bold: true, type: "round", size: 14 })),
                        React.createElement(input_1.default, { withForm: true, onSubmit: function (value) {
                                dispatch(store_1.guestAccess(value));
                            } }))))); })))));
};
exports.default = Auth;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
//# sourceMappingURL=index.js.map