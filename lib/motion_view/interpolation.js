"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInterPolationConfig = exports.getInterPolatedProps = exports.getOffsetProps = exports.getInterpolation = void 0;
const react_native_reanimated_1 = require("react-native-reanimated");
const getOffsetProps = (startTime, duration, totalDuration) => {
    'worklet';
    const endTime = startTime + duration;
    const startInputOffset = startTime / totalDuration;
    const endInputOffset = endTime / totalDuration;
    return {
        startInputOffset,
        endInputOffset,
    };
};
exports.getOffsetProps = getOffsetProps;
const getInterPolatedProps = (totalDuration, parsedAnimationProps) => {
    'worklet';
    if (!parsedAnimationProps)
        return undefined;
    const offsetProps = getOffsetProps(parsedAnimationProps.startTiming, parsedAnimationProps.duration, totalDuration);
    return {
        fromValue: parsedAnimationProps.fromValue,
        toValue: parsedAnimationProps.toValue,
        startInputOffset: offsetProps.startInputOffset,
        endInputOffset: offsetProps.endInputOffset,
    };
};
exports.getInterPolatedProps = getInterPolatedProps;
const getInterpolation = (offset, inputArr, outputArr) => {
    'worklet';
    return react_native_reanimated_1.interpolate(offset, inputArr, outputArr, 'clamp');
};
exports.getInterpolation = getInterpolation;
const getInterpolationArrays = (interpolationConfig) => {
    'worklet';
    const inputArray = [];
    const outputArray = [];
    interpolationConfig.map((interpolationConfigItem, index) => {
        if (index === 0) {
            inputArray.push(interpolationConfigItem.startInputOffset, interpolationConfigItem.endInputOffset);
            outputArray.push(interpolationConfigItem.fromValue, interpolationConfigItem.toValue);
        }
        else if (interpolationConfigItem.startInputOffset !==
            inputArray[inputArray.length - 1]) {
            inputArray.push(interpolationConfigItem.startInputOffset, interpolationConfigItem.endInputOffset);
            outputArray.push(interpolationConfigItem.fromValue, interpolationConfigItem.toValue);
        }
        else {
            inputArray.push(interpolationConfigItem.endInputOffset);
            outputArray.push(interpolationConfigItem.toValue);
        }
    });
    if (inputArray.length === 0 || outputArray.length === 0)
        return undefined;
    return {
        inputArray,
        outputArray,
    };
};
const PositionBasedAnimationModifier = (animationProps, totalDuration, xArr, yArr) => {
    'worklet';
    if (animationProps.length > 0) {
        animationProps.map((animationPropsItem) => {
            if (animationPropsItem.x) {
                const xArrItem = getInterPolatedProps(totalDuration, animationPropsItem.x);
                xArrItem ? xArr.push(xArrItem) : null;
            }
            if (animationPropsItem.y) {
                const yArrItem = getInterPolatedProps(totalDuration, animationPropsItem.y);
                yArrItem ? yArr.push(yArrItem) : null;
            }
        });
    }
};
const getInterPolationConfig = (parsedConfig, totalDuration) => {
    'worklet';
    const opacityArr = [];
    const slideXArr = [];
    const slideYArr = [];
    const scaleXArr = [];
    const scaleYArr = [];
    const { opacityProps, slideAnimationProps, scaleAnimationProps } = parsedConfig;
    if (opacityProps.length > 0) {
        opacityProps.map((opacityPropsItem) => {
            const opacityArrItem = getInterPolatedProps(totalDuration, opacityPropsItem);
            opacityArrItem ? opacityArr.push(opacityArrItem) : null;
        });
    }
    PositionBasedAnimationModifier(slideAnimationProps, totalDuration, slideXArr, slideYArr);
    PositionBasedAnimationModifier(scaleAnimationProps, totalDuration, scaleXArr, scaleYArr);
    return {
        opacityProps: getInterpolationArrays(opacityArr),
        slideXAnimationProps: getInterpolationArrays(slideXArr),
        slideYAnimationProps: getInterpolationArrays(slideYArr),
        scaleXAnimationProps: getInterpolationArrays(scaleXArr),
        scaleYAnimationProps: getInterpolationArrays(scaleYArr),
    };
};
exports.getInterPolationConfig = getInterPolationConfig;
//# sourceMappingURL=interpolation.js.map