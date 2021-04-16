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
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var useTypedReducer = function (actions, initialState) {
    var reducer = function (s, action) {
        if (!actions[action.type]) {
            throw new Error();
        }
        return actions[action.type].apply(actions, action.payload)(s);
    };
    var _a = React.useReducer(reducer, initialState), state = _a[0], dispatch = _a[1];
    var newActions = {};
    Object.keys(actions).forEach(function (actionName) {
        newActions[actionName] = function () {
            var payload = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                payload[_i] = arguments[_i];
            }
            return dispatch({ type: actionName, payload: payload });
        };
    });
    return [state, newActions];
};
exports.default = useTypedReducer;
//# sourceMappingURL=useTypedReducer.js.map