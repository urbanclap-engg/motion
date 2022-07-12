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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const react_native_gesture_handler_1 = require("react-native-gesture-handler");
const react_native_reanimated_1 = __importStar(require("react-native-reanimated"));
const Ripple = ({ style, onTap, containerWidth = 'auto', containerHeight = 'auto', disabled = false, children, }) => {
    const rippleDuration = 1000;
    const centerX = react_native_reanimated_1.useSharedValue(0);
    const centerY = react_native_reanimated_1.useSharedValue(0);
    const scale = react_native_reanimated_1.useSharedValue(0);
    const aRef = react_native_reanimated_1.useAnimatedRef();
    const width = react_native_reanimated_1.useSharedValue(0);
    const height = react_native_reanimated_1.useSharedValue(0);
    const rippleOpacity = react_native_reanimated_1.useSharedValue(1);
    const tapGestureEvent = react_native_reanimated_1.useAnimatedGestureHandler({
        onStart: (tapEvent) => {
            const layout = react_native_reanimated_1.measure(aRef);
            width.value = layout.width;
            height.value = layout.height;
            centerX.value = tapEvent.x;
            centerY.value = tapEvent.y;
            rippleOpacity.value = 1;
            scale.value = 0;
            scale.value = react_native_reanimated_1.withTiming(1, { duration: rippleDuration });
        },
        onActive: () => {
            if (onTap)
                react_native_reanimated_1.runOnJS(onTap)();
        },
        onFinish: () => {
            rippleOpacity.value = react_native_reanimated_1.withTiming(0);
        },
    });
    const styles = react_native_1.StyleSheet.create({
        dimensions: {
            height: containerHeight,
            width: containerWidth,
            overflow: 'hidden',
        },
    });
    const rStyle = react_native_reanimated_1.useAnimatedStyle(() => {
        const circleRadius = Math.sqrt(Math.pow(width.value, 2) + Math.pow(height.value, 2));
        const translateX = centerX.value - circleRadius;
        const translateY = centerY.value - circleRadius;
        return {
            width: circleRadius * 2,
            height: circleRadius * 2,
            borderRadius: circleRadius,
            opacity: rippleOpacity.value,
            backgroundColor: 'rgba(0,0,0,0.2)',
            position: 'absolute',
            top: 0,
            left: 0,
            transform: [
                { translateX },
                { translateY },
                {
                    scale: scale.value,
                },
            ],
        };
    });
    // const onLayout
    return disabled ? (react_1.default.createElement(react_1.default.Fragment, null, children)) : (
    /* @ts-ignore: Ignoring presence of isForced in ViewProps */
    react_1.default.createElement(react_native_gesture_handler_1.GestureHandlerRootView, { isForced: true },
        react_1.default.createElement(react_native_1.View, { ref: aRef, style: [style, styles.dimensions] },
            react_1.default.createElement(react_native_gesture_handler_1.TapGestureHandler, { onGestureEvent: tapGestureEvent },
                react_1.default.createElement(react_native_reanimated_1.default.View, { style: [{ overflow: 'hidden' }] },
                    children,
                    react_1.default.createElement(react_native_reanimated_1.default.View, { style: rStyle }))))));
};
exports.default = Ripple;
//# sourceMappingURL=ripple_view.js.map