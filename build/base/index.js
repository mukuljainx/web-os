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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var react_router_dom_1 = require("react-router-dom");
var react_redux_1 = require("react-redux");
var iconInterface_1 = __importDefault(require("molecules/iconInterface"));
var helper_1 = require("base/helper");
var desktop_1 = __importDefault(require("base/desktop"));
var apps_1 = __importDefault(require("apps"));
var styled_components_1 = __importDefault(require("styled-components"));
var useDraggable_1 = __importDefault(require("utils/hooks/useDraggable"));
var contextMenu_1 = __importDefault(require("molecules/contextMenu"));
var appBar_1 = __importDefault(require("./appBar"));
var Wrapper = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  width: 100%;\n  height: 100%;\n"], ["\n  width: 100%;\n  height: 100%;\n"])));
var Base = function (_a) {
    var wrapperRef = React.useRef(null);
    var user = react_redux_1.useSelector(function (state) { return state.auth.user; });
    var routesMap = react_redux_1.useSelector(function (state) { return state.base.routes; });
    var openedApps = react_redux_1.useSelector(function (state) { return state.base.apps; });
    var _b = useDraggable_1.default({ wrapperRef: wrapperRef }), store = _b.store, handleMouseDown = _b.handleMouseDown;
    if (!user) {
        return React.createElement(react_router_dom_1.Redirect, { to: "/auth" });
    }
    var routes = React.useMemo(function () {
        return helper_1.getRoutes(routesMap[0], user.name).sort(function (a, b) {
            return a.path.length < b.path.length ? 1 : -1;
        });
    }, [routesMap]);
    var desktopRoutes = React.useMemo(function () { return routes.find(function (route) { return route.file.id === "desktop"; }); }, [routesMap]);
    React.useEffect(function () {
        window.os = __assign(__assign({}, window.os), { wrapper: wrapperRef.current });
    }, []);
    var MenuItemAction = React.useCallback(function (label, id) {
        console.log(label, id);
    }, []);
    var menuItems = [
        { label: "New Folder", action: MenuItemAction, id: "new-folder" },
        { label: "Get Info", action: MenuItemAction, id: "get-info" },
        {
            label: "Change Desktop Background",
            action: MenuItemAction,
            id: "change-desktop-background",
        },
    ];
    return (React.createElement(desktop_1.default, null,
        React.createElement(Wrapper, { ref: wrapperRef },
            React.createElement(contextMenu_1.default, { wrapperRef: wrapperRef, items: menuItems }),
            Object.values(openedApps).map(function (app) {
                return (React.createElement(React.Fragment, null, app.instances.map(function (instance, index) {
                    var _a, _b, _c;
                    var dragId = instance.id;
                    return (React.createElement(apps_1.default, { weight: app.weight + index, onMouseDown: function (event) { return handleMouseDown(event, dragId); }, style: {
                            transform: ((_a = store.elements[dragId]) === null || _a === void 0 ? void 0 : _a.translate.x)
                                ? "translate(" + ((_b = store.elements[dragId]) === null || _b === void 0 ? void 0 : _b.translate.x) + "px, " + ((_c = store.elements[dragId]) === null || _c === void 0 ? void 0 : _c.translate.y) + "px)"
                                : undefined,
                        }, key: dragId, app: instance.appName, data: instance.data, id: instance.id, metaData: instance.metaData }));
                })));
            }),
            React.createElement(iconInterface_1.default, { user: user.name, files: desktopRoutes.files }),
            React.createElement(appBar_1.default, { apps: openedApps }))));
};
exports.default = React.memo(Base);
var templateObject_1;
//# sourceMappingURL=index.js.map