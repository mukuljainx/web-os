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
var core_1 = require("@react-spring/core");
var web_1 = require("@react-spring/web");
var React = __importStar(require("react"));
var styled_components_1 = __importDefault(require("styled-components"));
var AnimatedWrapper = styled_components_1.default(web_1.animated.div)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  z-index: ", ";\n  position: absolute;\n  overflow: auto;\n"], ["\n  z-index: ", ";\n  position: absolute;\n  overflow: auto;\n"])), function (_a) {
    var theme = _a.theme;
    return theme.zIndex.contextMenu;
});
var ItemWrapper = styled_components_1.default.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  padding: 12px 8px;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  &:hover {\n    background: ", ";\n  }\n"], ["\n  padding: 12px 8px;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  &:hover {\n    background: ", ";\n  }\n"])), function (_a) {
    var theme = _a.theme;
    return theme.colors.plainHover;
});
var Wrapper = styled_components_1.default.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  background: ", ";\n  width: 200px;\n  border-radius: ", "px;\n\n  ", " {\n    ", "\n  }\n"], ["\n  background: ", ";\n  width: 200px;\n  border-radius: ", "px;\n\n  ", " {\n    ",
    "\n  }\n"])), function (_a) {
    var theme = _a.theme;
    return theme.colors.plain;
}, function (_a) {
    var theme = _a.theme;
    return theme.borderRadius;
}, ItemWrapper, function (_a) {
    var theme = _a.theme;
    return "\n    &:first-child {\n      border-top-left-radius: " + theme.borderRadius + "px;\n      border-top-right-radius: " + theme.borderRadius + "px;\n    }\n    &:last-child {\n      border-bottom-left-radius: " + theme.borderRadius + "px;\n      border-bottom-right-radius: " + theme.borderRadius + "px;\n    }";
});
var ContextMenu = function (_a) {
    var wrapperRef = _a.wrapperRef, items = _a.items;
    var _b = React.useState({ show: false, style: {} }), state = _b[0], setState = _b[1];
    var handleContextMenuClick = React.useCallback(function (event) {
        event.preventDefault();
        setState({
            style: { left: event.clientX, top: event.clientY },
            show: true,
        });
    }, []);
    var hideMenu = React.useCallback(function () {
        setState(function (prev) { return (__assign(__assign({}, prev), { show: false })); });
    }, []);
    var handleItemClick = React.useCallback(function (event) {
        var i = parseInt(event.currentTarget.getAttribute("data-index"), 10);
        items[i].action(items[i].label, items[i].id);
    }, []);
    React.useEffect(function () {
        var _a, _b;
        (_a = wrapperRef.current) === null || _a === void 0 ? void 0 : _a.addEventListener("contextmenu", handleContextMenuClick);
        (_b = wrapperRef.current) === null || _b === void 0 ? void 0 : _b.addEventListener("mousedown", hideMenu);
        return function () {
            var _a, _b;
            (_a = wrapperRef.current) === null || _a === void 0 ? void 0 : _a.removeEventListener("mousedown", handleContextMenuClick);
            (_b = wrapperRef.current) === null || _b === void 0 ? void 0 : _b.removeEventListener("contextmenu", hideMenu);
        };
    }, [wrapperRef]);
    var transition = core_1.useTransition(state.show, {
        from: { height: 0 },
        enter: { height: items.length * 42 },
        leave: { height: 0 },
    });
    return transition(function (style, item, __, index) {
        return item && (React.createElement(AnimatedWrapper, { key: index, style: __assign(__assign({}, style), state.style) },
            React.createElement(Wrapper, null, items.map(function (item, j) { return (React.createElement(ItemWrapper, { key: j, "data-index": j, onClick: handleItemClick }, item.label)); }))));
    });
};
exports.default = ContextMenu;
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=index.js.map