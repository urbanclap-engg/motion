"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.triggerAnimation = void 0;
const react_native_reanimated_1 = require("react-native-reanimated");
const animation_callback_1 = require("./animation_callback");
const constants_1 = require("./constants");
const enums_1 = require("./enums");
const getRepeatCount = (repeatProps) => {
    'worklet';
    if (repeatProps) {
        const { repeatCount, loop } = repeatProps;
        if (loop)
            return -1;
        if (repeatCount !== 0)
            return repeatCount;
    }
    return undefined;
};
const SpringAnimationFn = (springProps, animationInitProps) => {
    const { visibilityOffset, setViewHidden, onAnimationSuccess, onAnimationBreak, } = animationInitProps;
    const { damping, mass, stiffness, overshootClamping, restDisplacementThreshold, restSpeedThreshold, } = springProps;
    const { animationParams, hideViewPostAnimation } = animationInitProps;
    return react_native_reanimated_1.withSpring(animationParams.toValue, {
        damping,
        mass,
        stiffness,
        overshootClamping,
        restDisplacementThreshold,
        restSpeedThreshold,
    }, (isFinished) => {
        if (isFinished && hideViewPostAnimation) {
            visibilityOffset.value = 0;
            react_native_reanimated_1.runOnJS(setViewHidden)(true);
        }
        react_native_reanimated_1.runOnJS(animation_callback_1.onAnimationComplete)(isFinished, onAnimationSuccess, onAnimationBreak);
    });
};
const RepeatAnimateFn = (repeatProps, animationInitProps, easingValues) => {
    const { reverseOnRepeat } = repeatProps;
    const { visibilityOffset, setViewHidden, onAnimationSuccess, onAnimationBreak, } = animationInitProps;
    const { animationParams, hideViewPostAnimation } = animationInitProps;
    const repeatCount = getRepeatCount(repeatProps);
    return react_native_reanimated_1.withDelay(animationParams.delay || 0, react_native_reanimated_1.withRepeat(react_native_reanimated_1.withTiming(animationParams.toValue, {
        duration: animationParams.duration,
        easing: react_native_reanimated_1.Easing.bezier(easingValues.w, easingValues.x, easingValues.y, easingValues.z),
    }), repeatCount, reverseOnRepeat, (isFinished) => {
        if (isFinished && hideViewPostAnimation) {
            visibilityOffset.value = 0;
            react_native_reanimated_1.runOnJS(setViewHidden)(true);
        }
        react_native_reanimated_1.runOnJS(animation_callback_1.onAnimationComplete)(isFinished, onAnimationSuccess, onAnimationBreak);
    }));
};
const animateFn = (animationInitProps, easingValues) => {
    const { animationParams, hideViewPostAnimation, visibilityOffset, setViewHidden, onAnimationSuccess, onAnimationBreak, } = animationInitProps;
    return react_native_reanimated_1.withDelay(animationParams.delay || 0, react_native_reanimated_1.withTiming(animationParams.toValue, {
        duration: animationParams.duration,
        easing: react_native_reanimated_1.Easing.bezier(easingValues.w, easingValues.x, easingValues.y, easingValues.z),
    }, (isFinished) => {
        if (isFinished && hideViewPostAnimation) {
            visibilityOffset.value = 0;
            react_native_reanimated_1.runOnJS(setViewHidden)(true);
        }
        react_native_reanimated_1.runOnJS(animation_callback_1.onAnimationComplete)(isFinished, onAnimationSuccess, onAnimationBreak);
    }));
};
const triggerAnimation = (animationStrategy, animationInitProps, animationProps) => {
    const { easingValues, repeatProps, springProps } = animationProps;
    switch (animationStrategy) {
        case enums_1.AnimationStrategy.REGULAR:
            return animateFn(animationInitProps, easingValues || constants_1.DEFAULT_EASING_VALUES);
        case enums_1.AnimationStrategy.SPRING:
            return SpringAnimationFn(springProps || constants_1.DEFAULT_SPRING_PROPS, animationInitProps);
        case enums_1.AnimationStrategy.REPEAT:
            return RepeatAnimateFn(repeatProps || constants_1.DEFAULT_REPEAT_PROPS, animationInitProps, easingValues || constants_1.DEFAULT_EASING_VALUES);
    }
};
exports.triggerAnimation = triggerAnimation;
//# sourceMappingURL=animation_initializers.js.map