"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var toolkit_1 = require("@reduxjs/toolkit");
var store_1 = __importDefault(require("auth/store"));
var store_2 = __importDefault(require("base/store"));
var rootReducer = toolkit_1.combineReducers({ auth: store_1.default, base: store_2.default });
exports.default = rootReducer;
//# sourceMappingURL=reducer.js.map