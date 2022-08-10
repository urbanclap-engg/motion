import {
	mockEasingValues,
	mockRepeatProps,
	mockSpringProps,
} from './animation_initializers.mock';

const mockAnimationBasedProps = {
	easingValues: mockEasingValues,
	repeatProps: mockRepeatProps,
	springProps: mockSpringProps,
};

const mockRepeatAnimation = jest.fn().mockName('RepeatAnimateFn');
const mockSpringAnimation = jest.fn().mockName('SpringAnimateFn');
const mockAnimateFunction = jest.fn().mockName('animateFn');

export {
	mockEasingValues,
	mockRepeatProps,
	mockSpringProps,
	mockAnimationBasedProps,
	mockRepeatAnimation,
	mockSpringAnimation,
	mockAnimateFunction,
};
