"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_SPRING_PROPS = exports.DEFAULT_REPEAT_PROPS = exports.DEFAULT_EASING_VALUES = exports.DEFAULT_HIDE_VIEW = exports.DEFAULT_HEIGHT = exports.DEFAULT_WIDTH = exports.DEFAULT_OFFSET = exports.DEFAULT_DELAY = exports.DEFAULT_TOTAL_DURATION = void 0;
const DEFAULT_TOTAL_DURATION = 1000;
exports.DEFAULT_TOTAL_DURATION = DEFAULT_TOTAL_DURATION;
const DEFAULT_DELAY = 0;
exports.DEFAULT_DELAY = DEFAULT_DELAY;
const DEFAULT_OFFSET = 0;
exports.DEFAULT_OFFSET = DEFAULT_OFFSET;
const DEFAULT_WIDTH = 0;
exports.DEFAULT_WIDTH = DEFAULT_WIDTH;
const DEFAULT_HEIGHT = 0;
exports.DEFAULT_HEIGHT = DEFAULT_HEIGHT;
const DEFAULT_HIDE_VIEW = false;
exports.DEFAULT_HIDE_VIEW = DEFAULT_HIDE_VIEW;
const DEFAULT_EASING_VALUES = {
    w: 0,
    x: 0,
    y: 1,
    z: 1,
};
exports.DEFAULT_EASING_VALUES = DEFAULT_EASING_VALUES;
const DEFAULT_REPEAT_PROPS = {
    repeatCount: 0,
    loop: false,
    reverseOnRepeat: false,
};
exports.DEFAULT_REPEAT_PROPS = DEFAULT_REPEAT_PROPS;
const DEFAULT_SPRING_PROPS = {
    damping: 10,
    mass: 1,
    stiffness: 100,
    overshootClamping: false,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 2,
};
exports.DEFAULT_SPRING_PROPS = DEFAULT_SPRING_PROPS;
const DEFAULT_ANIMATION_BASED_PROPS = {
    easingValues: DEFAULT_EASING_VALUES,
    repeatProps: DEFAULT_REPEAT_PROPS,
    springProps: DEFAULT_SPRING_PROPS,
};
//# sourceMappingURL=constants.js.map