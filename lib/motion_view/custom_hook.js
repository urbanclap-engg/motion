"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useReanimatedStyles = exports.useVisibilityStyle = void 0;
const react_native_reanimated_1 = require("react-native-reanimated");
const interpolation_1 = require("./interpolation");
const useVisibilityStyle = (visibilityOffset) => {
    const visibilityStyle = react_native_reanimated_1.useAnimatedStyle(() => {
        return {
            opacity: visibilityOffset.value,
        };
    }, [visibilityOffset.value]);
    return {
        visibilityStyle,
    };
};
exports.useVisibilityStyle = useVisibilityStyle;
const useReanimatedStyles = (animationOffset, interpolationConfig) => {
    const { opacityProps, slideXAnimationProps, slideYAnimationProps, scaleXAnimationProps, scaleYAnimationProps, } = Object.assign({}, interpolationConfig.value);
    const opacityStyle = react_native_reanimated_1.useAnimatedStyle(() => {
        return opacityProps
            ? {
                opacity: interpolation_1.getInterpolation(animationOffset.value, opacityProps.inputArray, opacityProps.outputArray),
            }
            : {};
    }, [opacityProps, interpolationConfig]);
    const slideStyle = react_native_reanimated_1.useAnimatedStyle(() => {
        if (slideXAnimationProps && slideYAnimationProps) {
            return {
                transform: [
                    {
                        translateX: interpolation_1.getInterpolation(animationOffset.value, slideXAnimationProps.inputArray, slideXAnimationProps.outputArray),
                        translateY: interpolation_1.getInterpolation(animationOffset.value, slideYAnimationProps.inputArray, slideYAnimationProps.outputArray),
                    },
                ],
            };
        }
        if (slideXAnimationProps) {
            return {
                transform: [
                    {
                        translateX: interpolation_1.getInterpolation(animationOffset.value, slideXAnimationProps.inputArray, slideXAnimationProps.outputArray),
                    },
                ],
            };
        }
        if (slideYAnimationProps) {
            return {
                transform: [
                    {
                        translateY: interpolation_1.getInterpolation(animationOffset.value, slideYAnimationProps.inputArray, slideYAnimationProps.outputArray),
                    },
                ],
            };
        }
        return {};
    }, [slideXAnimationProps, slideYAnimationProps, interpolationConfig]);
    const scaleStyle = react_native_reanimated_1.useAnimatedStyle(() => {
        if (scaleXAnimationProps && scaleYAnimationProps) {
            return {
                transform: [
                    {
                        scale: interpolation_1.getInterpolation(animationOffset.value, scaleXAnimationProps.inputArray, scaleXAnimationProps.outputArray),
                    },
                ],
            };
        }
        if (scaleXAnimationProps) {
            return {
                transform: [
                    {
                        scaleX: interpolation_1.getInterpolation(animationOffset.value, scaleXAnimationProps.inputArray, scaleXAnimationProps.outputArray),
                    },
                ],
            };
        }
        if (scaleYAnimationProps) {
            return {
                transform: [
                    {
                        scaleY: interpolation_1.getInterpolation(animationOffset.value, scaleYAnimationProps.inputArray, scaleYAnimationProps.outputArray),
                    },
                ],
            };
        }
        return {};
    }, [scaleXAnimationProps, scaleYAnimationProps, interpolationConfig]);
    return {
        opacityStyle,
        slideStyle,
        scaleStyle,
    };
};
exports.useReanimatedStyles = useReanimatedStyles;
//# sourceMappingURL=custom_hook.js.map