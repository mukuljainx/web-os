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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.closeApp = exports.openApp = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var routes_1 = require("base/store/routes");
var initialState = {
    apps: {},
    routes: routes_1.getDefaultRoutes(),
    currentWeight: 0,
};
var baseSlice = toolkit_1.createSlice({
    name: "base",
    initialState: initialState,
    reducers: {
        openApp: function (state, action) {
            var newApp = action.payload;
            var instanceId = newApp.appName + "-" + newApp.id;
            var runningApp = state.apps[newApp.appName];
            if (runningApp) {
                runningApp.weight = state.currentWeight;
                var index = runningApp.instances.findIndex(function (instance) { return instance.id === instanceId; });
                if (index !== -1) {
                    var temp = runningApp.instances.splice(index, 1);
                    runningApp.instances.push(temp[0]);
                    return;
                }
                runningApp.instances.push(__assign(__assign({}, newApp), { id: instanceId }));
            }
            else {
                state.apps[newApp.appName] = {
                    initialWeight: state.currentWeight,
                    weight: state.currentWeight,
                    id: newApp.id,
                    name: newApp.appName,
                    instances: [__assign(__assign({}, newApp), { id: instanceId })],
                };
            }
            state.currentWeight++;
        },
        closeApp: function (state, action) {
            var app = state.apps[action.payload.appName];
            if (!app) {
                return;
            }
            if (app.instances.length === 1) {
                delete state.apps[action.payload.appName];
            }
            else {
                app.instances = app.instances.filter(function (instance) { return instance.id !== action.payload.instanceId; });
            }
        },
    },
});
exports.openApp = (_a = baseSlice.actions, _a.openApp), exports.closeApp = _a.closeApp;
exports.default = baseSlice.reducer;
//# sourceMappingURL=index.js.map