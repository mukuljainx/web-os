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
var styled_components_1 = __importDefault(require("styled-components"));
var react_spring_1 = require("react-spring");
var dom_1 = require("utils/dom");
var theme_1 = __importDefault(require("theme"));
var AnimatedWrapper = styled_components_1.default(react_spring_1.animated.div)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  position: fixed;\n"], ["\n  position: fixed;\n"])));
var TransitFolder = function (_a) {
    var children = _a.children, x = _a.x, y = _a.y, left = _a.left, top = _a.top, styleX = _a.styleX, weight = _a.weight;
    var transition = react_spring_1.useTransition(true, {
        from: {
            scale: 0.01,
            x: 0,
            y: 0,
        },
        enter: { scale: 1, x: 100 + x, y: 100 + y },
        leave: { opacity: 0.33 },
    });
    var transform = styleX.transform;
    return transition(function (style) { return (React.createElement(AnimatedWrapper, { style: __assign(__assign({}, style), { left: left,
            top: top,
            transform: transform, zIndex: theme_1.default.zIndex.app + weight }) }, children)); });
};
var AnimatedFileWrapper = function (_a) {
    var children = _a.children, metaData = _a.metaData, style = _a.style, weight = _a.weight;
    var _b = React.useState({
        show: false,
        adjust: {
            left: 0,
            top: 0,
        },
    }), state = _b[0], setState = _b[1];
    var ref = React.useRef(null);
    React.useEffect(function () {
        if (!ref.current) {
            return;
        }
        var element = ref.current;
        var _a = element.getBoundingClientRect(), left = _a.left, top = _a.top, right = _a.right, bottom = _a.bottom;
        var coordinates = {
            left: left + 100,
            right: right + 100,
            top: top + 100,
            bottom: bottom + 100,
        };
        var elementOverflowing = !dom_1.isInside(window.os.wrapper, coordinates);
        var adjust = { left: 0, top: 0 };
        if (elementOverflowing) {
            adjust = dom_1.getOverflowAdjust(window.os.wrapper, coordinates);
        }
        setState(function (prevState) { return (__assign(__assign({}, prevState), { show: true, adjust: adjust })); });
    }, []);
    var position = metaData.mousePosition;
    if (!state.show) {
        return (React.createElement("div", { style: {
                position: "fixed",
                opacity: 0,
                left: position.x,
                top: position.y,
            }, ref: ref }, children));
    }
    return (React.createElement(TransitFolder, { weight: weight, styleX: style, left: position.x, top: position.y, x: state.adjust.left, y: state.adjust.top },
        React.createElement("div", { style: { position: "fixed" }, ref: ref }, children)));
};
exports.default = AnimatedFileWrapper;
var templateObject_1;
//# sourceMappingURL=index.js.map