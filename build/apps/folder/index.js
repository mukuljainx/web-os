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
var react_redux_1 = require("react-redux");
var SideBar_1 = __importDefault(require("./SideBar"));
var TopBar_1 = __importDefault(require("./TopBar"));
var Content_1 = __importDefault(require("./Content"));
var helper_1 = require("base/helper");
var useHistory_1 = __importDefault(require("utils/hooks/useHistory"));
var string_1 = require("utils/string");
var Wrapper = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  height: 100%;\n"], ["\n  height: 100%;\n"])));
var Container = styled_components_1.default.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  &:focus {\n    outline: none;\n  }\n  z-index: 11;\n  width: 720px;\n  height: 480px;\n  overflow: auto;\n  resize: both;\n  background: white;\n"], ["\n  &:focus {\n    outline: none;\n  }\n  z-index: 11;\n  width: 720px;\n  height: 480px;\n  overflow: auto;\n  resize: both;\n  background: white;\n"])));
var Folder = function (_a) {
    var path = _a.path, appName = _a.appName, id = _a.id, onMouseDown = _a.onMouseDown;
    var _b = useHistory_1.default(path), getCurrent = _b.getCurrent, push = _b.push, navigate = _b.navigate;
    var isMetaKey = React.useRef(false);
    var wrapperRef = React.useRef(null);
    var routesMap = react_redux_1.useSelector(function (state) { return state.base.routes; });
    var userName = react_redux_1.useSelector(function (state) { return state.auth.user.name; });
    var routes = React.useMemo(function () {
        return helper_1.getRoutes(routesMap[0], userName).sort(function (a, b) {
            return a.path.length < b.path.length ? 1 : -1;
        });
    }, [routesMap]);
    var currentRoute = routes.find(function (r) { return r.path === getCurrent(); });
    var fileAction = React.useCallback(function (path) {
        push(string_1.interpolate(path, { user: userName }));
    }, [push]);
    React.useEffect(function () {
        var _a;
        (_a = wrapperRef.current) === null || _a === void 0 ? void 0 : _a.focus();
    }, [getCurrent()]);
    var previousRoute = React.useCallback(function () {
        navigate(-1);
    }, [navigate]);
    var nextRoute = React.useCallback(function () {
        navigate(1);
    }, [navigate]);
    var handleClose = React.useCallback(function () {
        window.os.closeApp({ appName: appName, instanceId: id });
    }, []);
    if (!currentRoute) {
        throw Error("No matching route for: " + getCurrent());
    }
    var handleKeyDown = React.useCallback(function (event) {
        event.preventDefault();
        event.stopPropagation();
        if (isMetaKey.current) {
            switch (event.code) {
                case "KeyW": {
                    handleClose();
                    return;
                }
                case "ArrowUp": {
                    var currentRoute_1 = getCurrent();
                    if (currentRoute_1 === "/")
                        return;
                    var newRoute = getCurrent().split("/");
                    newRoute.pop();
                    push(newRoute.join("/") || "/");
                    return;
                }
            }
        }
        if (event.code === "MetaLeft" || event.code === "MetaRight") {
            isMetaKey.current = true;
        }
    }, [navigate, push, getCurrent]);
    var handleKeyUp = React.useCallback(function (event) {
        event.preventDefault();
        if (event.code === "MetaLeft" || event.code === "MetaRight") {
            isMetaKey.current = false;
        }
    }, []);
    return (React.createElement(Container, { ref: wrapperRef, tabIndex: 0, onKeyUp: handleKeyUp, onKeyDown: handleKeyDown },
        React.createElement(Wrapper, { className: "flex" },
            React.createElement(SideBar_1.default, null),
            React.createElement(Wrapper, { className: "flex flex-column flex-grow" },
                React.createElement(TopBar_1.default, { onMouseDown: onMouseDown, onNextClick: nextRoute, onPreviousClick: previousRoute, onCloseClick: handleClose }),
                React.createElement(Content_1.default, { fileAction: fileAction, user: userName, files: currentRoute.files })))));
};
exports.default = Folder;
var templateObject_1, templateObject_2;
//# sourceMappingURL=index.js.map