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
var folder_1 = __importDefault(require("apps/folder"));
var animatedFileWrapper_1 = __importDefault(require("atoms/animatedFileWrapper"));
var App = function (_a) {
    var app = _a.app, data = _a.data, id = _a.id, metaData = _a.metaData, style = _a.style, weight = _a.weight, onMouseDown = _a.onMouseDown;
    switch (app) {
        case "folder": {
            return (React.createElement(animatedFileWrapper_1.default, { style: style, metaData: metaData, weight: weight },
                React.createElement(folder_1.default, __assign({ onMouseDown: onMouseDown, metaData: metaData, key: id, appName: app, id: id }, data))));
        }
    }
    return null;
};
exports.default = App;
//# sourceMappingURL=index.js.map