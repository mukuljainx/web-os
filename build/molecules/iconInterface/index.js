"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
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
var styled_components_1 = __importDefault(require("styled-components"));
var React = __importStar(require("react"));
var string_1 = require("utils/string");
var helper_1 = require("base/helper");
var useDraggable_1 = __importDefault(require("utils/hooks/useDraggable"));
var icons_1 = __importDefault(require("atoms/icons"));
var Wrapper = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  overflow: hidden;\n  height: 100%;\n  width: 100%;\n"], ["\n  overflow: hidden;\n  height: 100%;\n  width: 100%;\n"])));
var IconLayout = function (_a) {
    var files = _a.files, user = _a.user, fileAction = _a.fileAction;
    var wrapperRef = React.useRef(null);
    var _b = useDraggable_1.default({ wrapperRef: wrapperRef }), store = _b.store, handleMouseDown = _b.handleMouseDown;
    return (React.createElement(Wrapper, { "data-id": "icon-interface", ref: wrapperRef }, files.map(function (file, index) {
        var _a, _b, _c;
        var fileName = string_1.interpolate(file.name, { user: user });
        var path = helper_1.getPath(file, user);
        var dragId = file.id + index;
        return (React.createElement(icons_1.default, { tabIndex: 0, type: "DESKTOP", onMouseDown: function (event) {
                handleMouseDown(event, dragId);
            }, style: {
                transform: "translate(" + ((_a = store.elements[dragId]) === null || _a === void 0 ? void 0 : _a.translate.x) + "px, " + ((_b = store.elements[dragId]) === null || _b === void 0 ? void 0 : _b.translate.y) + "px)",
            }, highlight: (_c = store.elements[dragId]) === null || _c === void 0 ? void 0 : _c.selected, onDoubleClick: function (event) {
                if (fileAction) {
                    fileAction(path);
                }
                else {
                    window.os.openApp({
                        appName: file.appName,
                        id: file.id,
                        name: file.name,
                        sleepTimeout: 1000,
                        data: { path: path },
                        metaData: {
                            mousePosition: {
                                x: event.clientX,
                                y: event.clientY,
                            },
                        },
                    });
                }
            }, name: file.icon, label: fileName, key: dragId, id: file.id }));
    })));
};
exports.default = IconLayout;
var templateObject_1;
//# sourceMappingURL=index.js.map