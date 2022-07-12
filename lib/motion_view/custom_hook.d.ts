import Animated from 'react-native-reanimated';
import { MotionInterpolationConfig } from './types';
declare const useVisibilityStyle: (visibilityOffset: Animated.SharedValue<number>) => {
    visibilityStyle: {
        opacity: number;
    };
};
declare const useReanimatedStyles: (animationOffset: Animated.SharedValue<number>, interpolationConfig: Animated.SharedValue<MotionInterpolationConfig>) => {
    opacityStyle: {
        opacity: number;
    } | {
        opacity?: undefined;
    };
    slideStyle: {
        transform: {
            translateX: number;
            translateY: number;
        }[];
    } | {
        transform: {
            translateX: number;
        }[];
    } | {
        transform: {
            translateY: number;
        }[];
    } | {
        transform?: undefined;
    };
    scaleStyle: {
        transform: {
            scale: number;
        }[];
    } | {
        transform: {
            scaleX: number;
        }[];
    } | {
        transform: {
            scaleY: number;
        }[];
    } | {
        transform?: undefined;
    };
};
export { useVisibilityStyle, useReanimatedStyles };
