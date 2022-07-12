"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ripple_view_1 = __importDefault(require("./ripple_view/ripple_view"));
const motion_view_1 = __importDefault(require("./motion_view/motion_view"));
const Motion = {
    View: motion_view_1.default,
    Ripple: ripple_view_1.default,
};
exports.default = Motion;
__exportStar(require("./motion_view"), exports);
__exportStar(require("./ripple_view"), exports);
//# sourceMappingURL=index.js.map