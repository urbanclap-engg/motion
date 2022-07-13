import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { MotionInterpolationConfig } from './types';
import { getInterpolation } from './interpolation';

const useVisibilityStyle = (visibilityOffset: Animated.SharedValue<number>) => {
	const visibilityStyle = useAnimatedStyle(() => {
		return {
			opacity: visibilityOffset.value,
		};
	}, [visibilityOffset.value]);
	return {
		visibilityStyle,
	};
};

const useReanimatedStyles = (
	animationOffset: Animated.SharedValue<number>,
	interpolationConfig: Animated.SharedValue<MotionInterpolationConfig>,
) => {
	const {
		opacityProps,
		slideXAnimationProps,
		slideYAnimationProps,
		scaleXAnimationProps,
		scaleYAnimationProps,
	} = {
		...interpolationConfig.value,
	};

	const opacityStyle = useAnimatedStyle(() => {
		return opacityProps
			? {
					opacity: getInterpolation(
						animationOffset.value,
						opacityProps.inputArray,
						opacityProps.outputArray,
					),
			}
			: {};
	}, [opacityProps, interpolationConfig]);

	const slideStyle = useAnimatedStyle(() => {
		if (slideXAnimationProps && slideYAnimationProps) {
			return {
				transform: [
					{
						translateX: getInterpolation(
							animationOffset.value,
							slideXAnimationProps.inputArray,
							slideXAnimationProps.outputArray,
						),
						translateY: getInterpolation(
							animationOffset.value,
							slideYAnimationProps.inputArray,
							slideYAnimationProps.outputArray,
						),
					},
				],
			};
		}
		if (slideXAnimationProps) {
			return {
				transform: [
					{
						translateX: getInterpolation(
							animationOffset.value,
							slideXAnimationProps.inputArray,
							slideXAnimationProps.outputArray,
						),
					},
				],
			};
		}
		if (slideYAnimationProps) {
			return {
				transform: [
					{
						translateY: getInterpolation(
							animationOffset.value,
							slideYAnimationProps.inputArray,
							slideYAnimationProps.outputArray,
						),
					},
				],
			};
		}
		return {};
	}, [slideXAnimationProps, slideYAnimationProps, interpolationConfig]);

	const scaleStyle = useAnimatedStyle(() => {
		if (scaleXAnimationProps && scaleYAnimationProps) {
			return {
				transform: [
					{
						scale: getInterpolation(
							animationOffset.value,
							scaleXAnimationProps.inputArray,
							scaleXAnimationProps.outputArray,
						),
					},
				],
			};
		}
		if (scaleXAnimationProps) {
			return {
				transform: [
					{
						scaleX: getInterpolation(
							animationOffset.value,
							scaleXAnimationProps.inputArray,
							scaleXAnimationProps.outputArray,
						),
					},
				],
			};
		}
		if (scaleYAnimationProps) {
			return {
				transform: [
					{
						scaleY: getInterpolation(
							animationOffset.value,
							scaleYAnimationProps.inputArray,
							scaleYAnimationProps.outputArray,
						),
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

export { useVisibilityStyle, useReanimatedStyles };
