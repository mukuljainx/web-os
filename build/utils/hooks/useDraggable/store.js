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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialState = void 0;
var useTypedReducer_1 = __importDefault(require("utils/hooks/useTypedReducer"));
useTypedReducer_1.default;
var getInitialElementState = function () { return ({
    translate: { x: 0, y: 0 },
    initial: { x: 0, y: 0 },
    last: { x: 0, y: 0 },
    selected: true,
}); };
exports.initialState = { elements: {} };
var reducer = {
    start: function (id, coordinate) { return function (state) {
        var _a, _b;
        var element = state.elements[id];
        if (!element) {
            return {
                elements: __assign(__assign({}, state.elements), (_a = {}, _a[id] = __assign(__assign({}, getInitialElementState()), { id: id, initial: coordinate, selected: true }), _a)),
            };
        }
        else {
            return {
                elements: __assign(__assign({}, state.elements), (_b = {}, _b[id] = __assign(__assign({}, element), { initial: coordinate, selected: true }), _b)),
            };
        }
    }; },
    move: function (id, coordinate) { return function (state) {
        var ids = typeof id === "string" ? [id] : id;
        var elements = state.elements;
        ids.forEach(function (itemId) {
            elements[itemId] = __assign(__assign({}, elements[itemId]), { translate: {
                    x: elements[itemId].last.x + coordinate.x - elements[itemId].initial.x,
                    y: elements[itemId].last.y + coordinate.y - elements[itemId].initial.y,
                } });
        });
        return { elements: elements };
    }; },
    stop: function (id) { return function (state) {
        var ids = typeof id === "string" ? [id] : id;
        var elements = __assign({}, state.elements);
        ids.forEach(function (itemId) {
            elements[itemId] = __assign(__assign({}, elements[itemId]), { last: elements[itemId].translate });
        });
        return { elements: elements };
    }; },
    unselect: function (id) { return function (state) {
        var ids = typeof id === "string" ? [id] : id;
        var elements = __assign({}, state.elements);
        ids.forEach(function (itemId) {
            elements[itemId] = __assign(__assign({}, elements[itemId]), { selected: false });
        });
        return { elements: elements };
    }; },
};
var useStore = function () {
    return useTypedReducer_1.default(reducer, __assign({}, exports.initialState));
};
exports.default = useStore;
//# sourceMappingURL=store.js.map