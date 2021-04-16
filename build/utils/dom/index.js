"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOverflowAdjust = exports.isInside = void 0;
var isInside = function (element, coordinate) {
    var _a = element.getBoundingClientRect(), left = _a.left, right = _a.right, bottom = _a.bottom, top = _a.top;
    if (!coordinate.right || !coordinate.bottom) {
        if (coordinate.left > right || coordinate.left < left) {
            return false;
        }
        if (coordinate.top > bottom || coordinate.top < top) {
            return false;
        }
    }
    else {
        if (coordinate.left < left ||
            coordinate.top < top ||
            coordinate.right > right ||
            coordinate.bottom > bottom) {
            return false;
        }
    }
    return true;
};
exports.isInside = isInside;
var getOverflowAdjust = function (element, coordinate) {
    var _a = element.getBoundingClientRect(), left = _a.left, right = _a.right, bottom = _a.bottom, top = _a.top;
    var horizontallyAdjustable = true;
    var verticallyAdjustable = true;
    var leftAdjust = 0;
    var topAdjust = 0;
    if ((coordinate.left < left && coordinate.right > right) ||
        (coordinate.left > left && coordinate.right < right)) {
        horizontallyAdjustable = false;
    }
    if ((coordinate.top < top && coordinate.bottom > bottom) ||
        (coordinate.top > top && coordinate.bottom < bottom)) {
        verticallyAdjustable = false;
    }
    if (verticallyAdjustable) {
        if (coordinate.top < top) {
            topAdjust = top - coordinate.top;
        }
        else {
            topAdjust = bottom - coordinate.bottom;
        }
    }
    if (horizontallyAdjustable) {
        if (coordinate.left < left) {
            leftAdjust = left - coordinate.left;
        }
        else {
            leftAdjust = right - coordinate.right;
        }
    }
    return { left: leftAdjust, top: topAdjust };
};
exports.getOverflowAdjust = getOverflowAdjust;
//# sourceMappingURL=index.js.map