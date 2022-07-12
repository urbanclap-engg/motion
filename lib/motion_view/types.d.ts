import Animated from 'react-native-reanimated';
import { AnimationStrategy } from './enums';
declare type AnimationProps = {
    toValue: number;
    duration?: number;
    delay?: number;
};
/**
 * @param startInputOffset as our all the animations will be based on single animationOffset and rest will be interpolation the startInputOffset will be the starting point at which the animation should start.
 * @param startInputOffset as our all the animations will be based on single animationOffset and rest will be interpolation the endInputOffset will be the starting point at which the animation should enf.
 */
declare type OffsetProps = {
    startInputOffset: number;
    endInputOffset: number;
};
/**
 * @description the interpolationProps will be used to build interpolationConfig
 */
declare type InterpolationProps = OffsetProps & {
    fromValue: number;
    toValue: number;
};
/**
 * @description the values for Easing.bezier in order w, x, y, z.
 */
declare type EasingValues = {
    w: number;
    x: number;
    y: number;
    z: number;
};
/**
 * @description Interpolation Config will be config of props are those props which will consist the entire data that from which offset to which offset the animation would run.
 */
declare type InterPolationConfig = {
    opacityProps?: InterpolationProps[];
    slideXAnimationProps?: InterpolationProps[];
    slideYAnimationProps?: InterpolationProps[];
    scaleXAnimationProps?: InterpolationProps[];
    scaleYAnimationProps?: InterpolationProps[];
};
/**
 * @param fromValue the value from which the animation should starts.
 */
/**
 * @param toValue the value upto which the animation should go.
 */
/**
 * @param startTiming is the value at which the animation should start in milliseconds.
 */
/**
 * @param duration is the value upto which the animation should run in milliseconds starting from startTiming.
 */
declare type CommonAnimationProps = {
    fromValue: number | string;
    toValue: number | string;
    startTiming: number;
    duration: number;
};
/**
 * @param x is used when we want animation animation horizontally
 */
/**
 * @param y is used when we want animation animation vertically
 */
declare type PositionBasedAnimationProps = {
    x?: CommonAnimationProps;
    y?: CommonAnimationProps;
};
/**
 * @param opacityProps will take an object as input which will define fromValue, toValue, startTiming and Duration.
 * @param slideAnimationParams will take an object as input which will define x and y which inturn will be objects defining fromValue, toValue, startTiming and Duration.
 * @param scaleAnimationProps will take an object as input which will define x and y which inturn will be objects defining fromValue, toValue, startTiming and Duration.
 * @param delay is a number and will define delay in starting the animation if not passed taken as 0 ms.
 * @param totalDuration is a number will define for how long entire animation will last in milliSeconds and is 1 second if not passed.
 * @param hideView is a boolean prop which will define if view needs to be hidden post animation and it is false by default.
 * @param easingValues excepts an object consisting w,x,y,z which will define the easing bezier for animation.
 */
declare type AnimationStylingProps = {
    opacityProps?: CommonAnimationProps[];
    slideAnimationProps?: PositionBasedAnimationProps[];
    scaleAnimationProps?: PositionBasedAnimationProps[];
    delay?: number;
    totalDuration?: number;
    hideViewPostAnimation?: boolean;
};
/**
 * @param onAnimationSuccess excepts a function which will run when animation has been executed successfully.
 * @param onAnimationBreak excepts a function which will run when animation does not executed successfully due to some reason.
 * @param overrideStyle is a style parameter if user wants to override style in any case.
 */
declare type BaseMotionProps = AnimationStylingProps & {
    animationStrategy?: AnimationStrategy;
    animationBasedProps?: AnimationBasedProps;
    onAnimationSuccess?(): void;
    onAnimationBreak?(): void;
    overrideStyle?: any;
};
/**
 * @description parsed config not to be exposed
 */
declare type ParsedCommonAnimationProps = {
    fromValue: number;
    toValue: number;
    startTiming: number;
    duration: number;
};
/**
 * @description parsed config not to be exposed
 */
declare type ParsedPositionBasedAnimationProps = {
    x?: ParsedCommonAnimationProps;
    y?: ParsedCommonAnimationProps;
};
/**
 * @description parsed config not to be exposed
 */
declare type ParsedBaseMotionProps = {
    opacityProps: ParsedCommonAnimationProps[];
    slideAnimationProps: ParsedPositionBasedAnimationProps[];
    scaleAnimationProps: ParsedPositionBasedAnimationProps[];
};
/**
 * @description input and output arrays required for  interpolation
 */
declare type InterPolationArrays = {
    inputArray: number[];
    outputArray: number[];
};
/**
 * @description interpolation arrays for opacity, slide and scale
 */
declare type MotionInterpolationConfig = {
    opacityProps?: InterPolationArrays;
    slideXAnimationProps?: InterPolationArrays;
    slideYAnimationProps?: InterPolationArrays;
    scaleXAnimationProps?: InterPolationArrays;
    scaleYAnimationProps?: InterPolationArrays;
};
declare type RepeatProps = {
    repeatCount?: number;
    loop?: boolean;
    reverseOnRepeat?: boolean;
};
declare type SpringProps = {
    damping?: number;
    mass?: number;
    stiffness?: number;
    overshootClamping?: boolean;
    restDisplacementThreshold?: number;
    restSpeedThreshold?: number;
};
declare type AnimationBasedProps = {
    easingValues?: EasingValues;
    repeatProps?: RepeatProps;
    springProps?: SpringProps;
};
declare type AnimationInitProps = {
    visibilityOffset: Animated.SharedValue<number>;
    animationParams: AnimationProps;
    hideViewPostAnimation: boolean;
    setViewHidden: (hidden: boolean) => void;
    onAnimationSuccess?: () => void;
    onAnimationBreak?: () => void;
};
export { AnimationProps, OffsetProps, InterpolationProps, EasingValues, InterPolationConfig, CommonAnimationProps, PositionBasedAnimationProps, AnimationStylingProps, BaseMotionProps, ParsedCommonAnimationProps, ParsedPositionBasedAnimationProps, ParsedBaseMotionProps, InterPolationArrays, MotionInterpolationConfig, RepeatProps, SpringProps, AnimationBasedProps, AnimationInitProps, };
