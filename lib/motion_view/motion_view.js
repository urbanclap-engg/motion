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
const react_1 = __importStar(require("react"));
const react_native_reanimated_1 = __importStar(require("react-native-reanimated"));
const config_parser_1 = require("./config_parser");
const custom_hook_1 = require("./custom_hook");
const constants_1 = require("./constants");
const interpolation_1 = require("./interpolation");
const animation_params_1 = require("./animation_params");
const animation_initializers_1 = require("./animation_initializers");
const enums_1 = require("./enums");
const MotionView = ({ animationStrategy = enums_1.AnimationStrategy.REGULAR, opacityProps, slideAnimationProps, scaleAnimationProps, animationBasedProps, totalDuration = constants_1.DEFAULT_TOTAL_DURATION, delay = constants_1.DEFAULT_DELAY, hideViewPostAnimation = constants_1.DEFAULT_HIDE_VIEW, onAnimationSuccess, onAnimationBreak, overrideStyle, children, }) => {
    const animationOffset = react_native_reanimated_1.useSharedValue(constants_1.DEFAULT_OFFSET);
    const childrenHeight = react_native_reanimated_1.useSharedValue(constants_1.DEFAULT_HEIGHT);
    const childrenWidth = react_native_reanimated_1.useSharedValue(constants_1.DEFAULT_WIDTH);
    const visibilityOffset = react_native_reanimated_1.useSharedValue(constants_1.DEFAULT_OFFSET);
    const interpolationConfig = react_native_reanimated_1.useSharedValue({});
    const [startAnimation, setStartAnimation] = react_1.useState(false);
    const [viewHidden, setViewHidden] = react_1.useState(false);
    const onLayout = (event) => {
        childrenHeight.value = event.nativeEvent.layout.height;
        childrenWidth.value = event.nativeEvent.layout.width;
    };
    const animationParams = animation_params_1.getAnimationParams(totalDuration, delay);
    react_native_reanimated_1.useAnimatedReaction(() => {
        return childrenHeight.value;
    }, (childrenHeightCheck) => {
        if (childrenHeightCheck > 0) {
            const parsedConfig = config_parser_1.getParsedConfig(childrenWidth.value, childrenHeight.value, opacityProps, slideAnimationProps, scaleAnimationProps);
            interpolationConfig.value = interpolation_1.getInterPolationConfig(parsedConfig, totalDuration);
            react_native_reanimated_1.runOnJS(setStartAnimation)(true);
        }
    }, [childrenHeight]);
    const { opacityStyle, slideStyle, scaleStyle } = Object.assign({}, custom_hook_1.useReanimatedStyles(animationOffset, interpolationConfig));
    const { visibilityStyle } = custom_hook_1.useVisibilityStyle(visibilityOffset);
    react_1.useEffect(() => {
        if (startAnimation) {
            if (visibilityOffset.value !== 1) {
                visibilityOffset.value = react_native_reanimated_1.withTiming(1, {
                    duration: opacityProps ? opacityProps[0].duration : 0,
                });
            }
            const animationInitProps = {
                visibilityOffset,
                animationParams,
                hideViewPostAnimation,
                setViewHidden,
                onAnimationSuccess,
                onAnimationBreak,
            };
            const _animationBasedProps = {
                easingValues: (animationBasedProps === null || animationBasedProps === void 0 ? void 0 : animationBasedProps.easingValues) || constants_1.DEFAULT_EASING_VALUES,
                repeatProps: (animationBasedProps === null || animationBasedProps === void 0 ? void 0 : animationBasedProps.repeatProps) || constants_1.DEFAULT_REPEAT_PROPS,
                springProps: (animationBasedProps === null || animationBasedProps === void 0 ? void 0 : animationBasedProps.springProps) || constants_1.DEFAULT_SPRING_PROPS,
            };
            animationOffset.value = animation_initializers_1.triggerAnimation(animationStrategy, animationInitProps, _animationBasedProps);
        }
    }, [startAnimation]);
    return viewHidden ? null : (react_1.default.createElement(react_native_reanimated_1.default.View, { style: [
            overrideStyle,
            visibilityStyle,
            opacityStyle,
            slideStyle,
            scaleStyle,
        ], onLayout: childrenHeight.value === 0 || childrenWidth.value === 0
            ? onLayout
            : undefined }, children));
};
exports.default = MotionView;
//# sourceMappingURL=motion_view.js.map