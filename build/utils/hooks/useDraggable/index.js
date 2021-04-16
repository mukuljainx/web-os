"use strict";
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
var store_1 = __importDefault(require("./store"));
var dom_1 = require("utils/dom");
var useDraggable = function (_a) {
    var wrapperRef = _a.wrapperRef;
    var _b = store_1.default(), store = _b[0], actions = _b[1];
    var dragging = React.useRef(new Set());
    var handleWindowClick = React.useCallback(function () {
        actions.stop(Array.from(dragging.current));
        actions.unselect(Array.from(dragging.current));
        dragging.current.clear();
    }, []);
    var handleMouseDown = React.useCallback(function (event, id) {
        var coordinates = { x: event.clientX, y: event.clientY };
        event.stopPropagation();
        var multiple = false;
        if (event.ctrlKey || event.metaKey) {
            multiple = true;
        }
        var elementInState = dragging.current.has(id);
        if (!multiple) {
            if (!elementInState) {
                stop();
                dragging.current.add(id);
            }
        }
        else if (multiple) {
            if (elementInState) {
                actions.stop(id);
                actions.unselect(id);
            }
            else {
                dragging.current.add(id);
            }
        }
        if (dragging.current.size) {
            dragging.current.forEach(function (id) {
                actions.start(id, coordinates);
            });
            window.addEventListener("mousedown", handleWindowClick);
            window.addEventListener("mousemove", handleMouseMove);
            window.addEventListener("mouseup", handleMouseUp);
        }
    }, []);
    var stop = React.useCallback(function () {
        actions.stop(Array.from(dragging.current));
        actions.unselect(Array.from(dragging.current));
        dragging.current.clear();
    }, []);
    var handleMouseMove = React.useCallback(function (_a) {
        var clientX = _a.clientX, clientY = _a.clientY;
        if (wrapperRef.current &&
            !dom_1.isInside(wrapperRef.current, { left: clientX, top: clientY })) {
            stop();
            return;
        }
        actions.move(Array.from(dragging.current), { x: clientX, y: clientY });
    }, []);
    var handleMouseUp = React.useCallback(function () {
        actions.stop(Array.from(dragging.current));
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
    }, []);
    React.useEffect(function () {
        return function () { return window.removeEventListener("mousedown", handleWindowClick); };
    }, []);
    return { store: store, handleMouseDown: handleMouseDown };
};
exports.default = useDraggable;
//# sourceMappingURL=index.js.map