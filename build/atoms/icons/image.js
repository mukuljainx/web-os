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
var availableIcons = new Set([
    "desktop",
    "library",
    "music",
    "system",
    "user",
    "applications",
]);
var Image = function (_a) {
    var name = _a.name, size = _a.size;
    var iconName = "generic";
    if (availableIcons.has(name)) {
        iconName = name;
    }
    return (React.createElement("img", { height: size, width: size, className: "icon__image", src: require("./assets/" + iconName + ".png").default }));
};
exports.default = Image;
//# sourceMappingURL=image.js.map