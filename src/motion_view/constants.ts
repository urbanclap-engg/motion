import {
	AnimationBasedProps,
	EasingValues,
	RepeatProps,
	SpringProps,
} from './types';

const DEFAULT_TOTAL_DURATION = 1000;
const DEFAULT_DELAY = 0;
const DEFAULT_OFFSET = 0;
const DEFAULT_WIDTH = 0;
const DEFAULT_HEIGHT = 0;
const DEFAULT_HIDE_VIEW = false;
const DEFAULT_EASING_VALUES: EasingValues = {
	w: 0,
	x: 0,
	y: 1,
	z: 1,
};
const DEFAULT_REPEAT_PROPS: RepeatProps = {
	repeatCount: 0,
	loop: false,
	reverseOnRepeat: false,
};
const DEFAULT_SPRING_PROPS: SpringProps = {
	damping: 10,
	mass: 1,
	stiffness: 100,
	overshootClamping: false,
	restDisplacementThreshold: 0.01,
	restSpeedThreshold: 2,
};
const DEFAULT_ANIMATION_BASED_PROPS: AnimationBasedProps = {
	easingValues: DEFAULT_EASING_VALUES,
	repeatProps: DEFAULT_REPEAT_PROPS,
	springProps: DEFAULT_SPRING_PROPS,
};
export {
	DEFAULT_TOTAL_DURATION,
	DEFAULT_DELAY,
	DEFAULT_OFFSET,
	DEFAULT_WIDTH,
	DEFAULT_HEIGHT,
	DEFAULT_HIDE_VIEW,
	DEFAULT_EASING_VALUES,
	DEFAULT_REPEAT_PROPS,
	DEFAULT_SPRING_PROPS,
};
