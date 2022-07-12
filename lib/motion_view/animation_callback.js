"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onAnimationComplete = void 0;
const onAnimationComplete = (isFinished, onAnimationSuccess, onAnimationBreak) => {
    if (isFinished) {
        if (onAnimationSuccess)
            onAnimationSuccess();
    }
    else if (onAnimationBreak)
        onAnimationBreak();
};
exports.onAnimationComplete = onAnimationComplete;
//# sourceMappingURL=animation_callback.js.map