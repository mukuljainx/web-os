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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var useHistory = function (initialPath) {
    var _a = React.useState([initialPath]), history = _a[0], setHistory = _a[1];
    var _b = React.useState(0), current = _b[0], setCurrent = _b[1];
    React.useEffect(function () {
        setCurrent(history.length - 1);
    }, [history]);
    var getCurrent = function () { return history[current]; };
    var push = React.useCallback(function (path) {
        setHistory(function (prevHistory) {
            return __spreadArray(__spreadArray([], prevHistory.slice(0, current + 1)), [path]);
        });
    }, [current]);
    var navigate = React.useCallback(function (step) {
        setCurrent(function (c) {
            var next = c + step;
            if (step > -1) {
                next = Math.min(history.length - 1, next);
            }
            else {
                next = Math.max(0, next);
            }
            return next;
        });
    }, [history]);
    return {
        getCurrent: getCurrent,
        push: push,
        navigate: navigate,
        __: {
            history: history,
            current: current,
        },
    };
};
exports.default = useHistory;
//# sourceMappingURL=index.js.map