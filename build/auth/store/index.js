"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.guestAccess = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var initialState = {
    user: localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user"))
        : undefined,
};
var authSlice = toolkit_1.createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        guestAccess: function (state, action) {
            var user = {
                name: action.payload,
                guest: true,
            };
            localStorage.setItem("user", JSON.stringify(user));
            state.user = user;
        },
    },
});
exports.guestAccess = authSlice.actions.guestAccess;
exports.default = authSlice.reducer;
//# sourceMappingURL=index.js.map