"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var toolkit_1 = require("@reduxjs/toolkit");
var redux_logger_1 = __importDefault(require("redux-logger"));
var reducer_1 = __importDefault(require("./reducer"));
exports.default = toolkit_1.configureStore({
    reducer: reducer_1.default,
    middleware: function (getDefaultMiddleware) { return getDefaultMiddleware().concat(redux_logger_1.default); },
});
//# sourceMappingURL=index.js.map