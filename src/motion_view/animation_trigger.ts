import {
	DEFAULT_EASING_VALUES,
	DEFAULT_SPRING_PROPS,
	DEFAULT_REPEAT_PROPS,
} from './constants';
import { AnimationStrategy } from './enums';
import { AnimationInitProps, AnimationBasedProps } from './types';

const triggerAnimation = (
	animationStrategy: AnimationStrategy,
	animationInitProps: AnimationInitProps,
	animationProps: AnimationBasedProps,
	animateFn: Function,
	SpringAnimationFn: Function,
	RepeatAnimateFn: Function,
): any => {
	const { easingValues, repeatProps, springProps } = animationProps;
	switch (animationStrategy) {
		case AnimationStrategy.REGULAR:
			return animateFn(
				animationInitProps,
				easingValues || DEFAULT_EASING_VALUES,
			);
		case AnimationStrategy.SPRING:
			return SpringAnimationFn(
				springProps || DEFAULT_SPRING_PROPS,
				animationInitProps,
			);
		case AnimationStrategy.REPEAT:
			return RepeatAnimateFn(
				repeatProps || DEFAULT_REPEAT_PROPS,
				animationInitProps,
				easingValues || DEFAULT_EASING_VALUES,
			);
	}
};

export { triggerAnimation };
