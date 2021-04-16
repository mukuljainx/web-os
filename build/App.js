"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var react_router_dom_1 = require("react-router-dom");
require("normalize.css");
var react_redux_1 = require("react-redux");
var styled_components_1 = require("styled-components");
require("theme/index.scss");
var store_1 = __importDefault(require("store"));
var theme_1 = __importDefault(require("theme"));
var auth_1 = __importDefault(require("auth"));
var base_1 = __importDefault(require("base"));
var store_2 = require("base/store");
var App = function () {
    React.useEffect(function () {
        window.os = __assign(__assign({}, window.os), { openApp: function (param) { return store_1.default.dispatch(store_2.openApp(param)); }, closeApp: function (param) { return store_1.default.dispatch(store_2.closeApp(param)); } });
        return function () {
            window.os = undefined;
        };
    }, []);
    return (React.createElement(react_redux_1.Provider, { store: store_1.default },
        React.createElement(styled_components_1.ThemeProvider, { theme: theme_1.default },
            React.createElement(react_router_dom_1.BrowserRouter, null,
                React.createElement(react_router_dom_1.Switch, null,
                    React.createElement(react_router_dom_1.Route, { path: "/auth", component: auth_1.default }),
                    React.createElement(react_router_dom_1.Route, { path: "/", component: base_1.default }))))));
};
exports.default = App;
//# sourceMappingURL=App.js.map