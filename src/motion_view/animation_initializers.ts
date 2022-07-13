import {
	withDelay,
	withRepeat,
	withTiming,
	Easing,
	runOnJS,
	withSpring,
} from 'react-native-reanimated';
import { onAnimationComplete } from './animation_callback';
import {
	DEFAULT_EASING_VALUES,
	DEFAULT_REPEAT_PROPS,
	DEFAULT_SPRING_PROPS,
} from './constants';
import { AnimationStrategy } from './enums';
import {
	AnimationBasedProps,
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

const springAnimationFn = (springProps: SpringProps,animationInitProps: AnimationInitProps) => {
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
			if (isFinished && hideViewPostAnimation) {
				visibilityOffset.value = 0;
				runOnJS(setViewHidden)(true);
			}
			runOnJS(onAnimationComplete)(
				isFinished,
				onAnimationSuccess,
				onAnimationBreak,
			);
		},
	);
};

const repeatAnimateFn = (
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
				if (isFinished && hideViewPostAnimation) {
					visibilityOffset.value = 0;
					runOnJS(setViewHidden)(true);
				}
				runOnJS(onAnimationComplete)(
					isFinished,
					onAnimationSuccess,
					onAnimationBreak,
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
				if (isFinished && hideViewPostAnimation) {
					visibilityOffset.value = 0;
					runOnJS(setViewHidden)(true);
				}
				runOnJS(onAnimationComplete)(
					isFinished,
					onAnimationSuccess,
					onAnimationBreak,
				);
			},
		),
	);
};

const triggerAnimation = (
	animationStrategy: AnimationStrategy,
	animationInitProps: AnimationInitProps,
	animationProps: AnimationBasedProps,
): any => {
	const { easingValues, repeatProps, springProps } = animationProps;
	switch (animationStrategy) {
		case AnimationStrategy.REGULAR:
			return animateFn(
				animationInitProps,
				easingValues || DEFAULT_EASING_VALUES,
			);
		case AnimationStrategy.SPRING:
			return springAnimationFn(
				springProps || DEFAULT_SPRING_PROPS,
				animationInitProps,
			);
		case AnimationStrategy.REPEAT:
			return repeatAnimateFn(
				repeatProps || DEFAULT_REPEAT_PROPS,
				animationInitProps,
				easingValues || DEFAULT_EASING_VALUES,
			);
		default: 
			return animateFn(
				animationInitProps,
				easingValues || DEFAULT_EASING_VALUES,
			);
	}
};

export { triggerAnimation };
