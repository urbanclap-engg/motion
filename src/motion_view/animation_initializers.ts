import Animated, {
	withDelay,
	withRepeat,
	withTiming,
	Easing,
	runOnJS,
	withSpring,
} from 'react-native-reanimated';
import { onAnimationComplete } from './animation_callback';
import {
	AnimationInitProps,
	EasingValues,
	RepeatProps,
	SpringProps,
} from './types';

const getRepeatCount = (repeatProps?: RepeatProps) => {
	'worklet';

	if (repeatProps) {
		const { repeatCount, loop } = repeatProps;
		if (loop) return -1;
		if (repeatCount !== 0) return repeatCount;
	}
	return undefined;
};

const postAnimationCallback = (
	booleans: {
		isFinished?: boolean;
		hideViewPostAnimation: boolean;
	},
	visibilityOffset: Animated.SharedValue<number>,
	callbacks: {
		setViewHidden: (hidden: boolean) => void;
		onAnimationSuccess?: () => void;
		onAnimationBreak?: () => void;
	},
) => {
	const { isFinished, hideViewPostAnimation } = booleans;
	const { setViewHidden, onAnimationSuccess, onAnimationBreak } = callbacks;
	if (isFinished && hideViewPostAnimation) {
		visibilityOffset.value = 0;
		setViewHidden(true);
	}
	onAnimationComplete(
		isFinished,
		onAnimationSuccess,
		onAnimationBreak,
	);
};

const SpringAnimationFn = (
	springProps: SpringProps,
	animationInitProps: AnimationInitProps,
) => {
	const {
		visibilityOffset,
		setViewHidden,
		onAnimationSuccess,
		onAnimationBreak,
	} = animationInitProps;
	const {
		damping,
		mass,
		stiffness,
		overshootClamping,
		restDisplacementThreshold,
		restSpeedThreshold,
	} = springProps;
	const { animationParams, hideViewPostAnimation } = animationInitProps;
	return withSpring(
		animationParams.toValue,
		{
			damping,
			mass,
			stiffness,
			overshootClamping,
			restDisplacementThreshold,
			restSpeedThreshold,
		},
		(isFinished) => {
			runOnJS(postAnimationCallback)(
				{ isFinished, hideViewPostAnimation },
				visibilityOffset,
				{ setViewHidden, onAnimationSuccess, onAnimationBreak },
			);
		},
	);
};

const RepeatAnimateFn = (
	repeatProps: RepeatProps,
	animationInitProps: AnimationInitProps,
	easingValues: EasingValues,
) => {
	const { reverseOnRepeat } = repeatProps;
	const {
		visibilityOffset,
		setViewHidden,
		onAnimationSuccess,
		onAnimationBreak,
	} = animationInitProps;
	const { animationParams, hideViewPostAnimation } = animationInitProps;
	const repeatCount = getRepeatCount(repeatProps);
	return withDelay(
		animationParams.delay || 0,
		withRepeat(
			withTiming(animationParams.toValue, {
				duration: animationParams.duration,
				easing: Easing.bezier(
					easingValues.w,
					easingValues.x,
					easingValues.y,
					easingValues.z,
				),
			}),
			repeatCount,
			reverseOnRepeat,
			(isFinished) => {
				runOnJS(postAnimationCallback)(
					{ isFinished, hideViewPostAnimation },
					visibilityOffset,
					{ setViewHidden, onAnimationSuccess, onAnimationBreak },
				);
			},
		),
	);
};

const animateFn = (
	animationInitProps: AnimationInitProps,
	easingValues: EasingValues,
) => {
	const {
		animationParams,
		hideViewPostAnimation,
		visibilityOffset,
		setViewHidden,
		onAnimationSuccess,
		onAnimationBreak,
	} = animationInitProps;

	return withDelay(
		animationParams.delay || 0,
		withTiming(
			animationParams.toValue,
			{
				duration: animationParams.duration,
				easing: Easing.bezier(
					easingValues.w,
					easingValues.x,
					easingValues.y,
					easingValues.z,
				),
			},
			(isFinished) => {
				runOnJS(postAnimationCallback)(
					{ isFinished, hideViewPostAnimation },
					visibilityOffset,
					{ setViewHidden, onAnimationSuccess, onAnimationBreak },
				);
			},
		),
	);
};

export {
	getRepeatCount,
	postAnimationCallback,
	SpringAnimationFn,
	RepeatAnimateFn,
	animateFn,
};
