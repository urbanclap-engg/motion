import { triggerAnimation } from '../animation_trigger';
import {
	DEFAULT_EASING_VALUES,
	DEFAULT_REPEAT_PROPS,
	DEFAULT_SPRING_PROPS,
} from '../constants';
import { AnimationStrategy } from '../enums';
import {
	mockAnimationInitProps,
	mockAnimationBasedProps,
	mockAnimateFunction,
	mockSpringAnimation,
	mockRepeatAnimation,
	mockEasingValues,
	mockRepeatProps,
	mockSpringProps,
} from '../mocks';

beforeEach(() => {
	jest.resetAllMocks();
});

describe('triggerAnimation', () => {
	it('animation strategy passed as regular', () => {
		triggerAnimation(
			AnimationStrategy.REGULAR,
			mockAnimationInitProps,
			mockAnimationBasedProps,
			mockAnimateFunction,
			mockSpringAnimation,
			mockRepeatAnimation,
		);
		expect(mockAnimateFunction).toHaveBeenCalled();
		expect(mockAnimateFunction).toHaveBeenCalledWith(
			mockAnimationInitProps,
			mockEasingValues,
		);
	});
	it('animation strategy passed as regular, with easing undefined', () => {
		triggerAnimation(
			AnimationStrategy.REGULAR,
			mockAnimationInitProps,
			{ ...mockAnimationBasedProps, easingValues: undefined },
			mockAnimateFunction,
			mockSpringAnimation,
			mockRepeatAnimation,
		);
		expect(mockAnimateFunction).toHaveBeenCalled();
		expect(mockAnimateFunction).toHaveBeenCalledWith(
			mockAnimationInitProps,
			DEFAULT_EASING_VALUES,
		);
	});
	it('animation strategy passed as repeat', () => {
		triggerAnimation(
			AnimationStrategy.REPEAT,
			mockAnimationInitProps,
			mockAnimationBasedProps,
			mockAnimateFunction,
			mockSpringAnimation,
			mockRepeatAnimation,
		);
		expect(mockRepeatAnimation).toHaveBeenCalled();
		expect(mockRepeatAnimation).toHaveBeenCalledWith(
			mockRepeatProps,
			mockAnimationInitProps,
			mockEasingValues,
		);
	});
	it('animation strategy passed as repeat, easing not passed', () => {
		triggerAnimation(
			AnimationStrategy.REPEAT,
			mockAnimationInitProps,
			{ ...mockAnimationBasedProps, easingValues: undefined },
			mockAnimateFunction,
			mockSpringAnimation,
			mockRepeatAnimation,
		);
		expect(mockRepeatAnimation).toHaveBeenCalled();
		expect(mockRepeatAnimation).toHaveBeenCalledWith(
			mockRepeatProps,
			mockAnimationInitProps,
			DEFAULT_EASING_VALUES,
		);
	});
	it('animation strategy passed as repeat, repeat props not passed', () => {
		triggerAnimation(
			AnimationStrategy.REPEAT,
			mockAnimationInitProps,
			{ ...mockAnimationBasedProps, repeatProps: undefined },
			mockAnimateFunction,
			mockSpringAnimation,
			mockRepeatAnimation,
		);
		expect(mockRepeatAnimation).toHaveBeenCalled();
		expect(mockRepeatAnimation).toHaveBeenCalledWith(
			DEFAULT_REPEAT_PROPS,
			mockAnimationInitProps,
			DEFAULT_EASING_VALUES,
		);
	});
	it('animation strategy passed as spring', () => {
		triggerAnimation(
			AnimationStrategy.SPRING,
			mockAnimationInitProps,
			mockAnimationBasedProps,
			mockAnimateFunction,
			mockSpringAnimation,
			mockRepeatAnimation,
		);
		expect(mockSpringAnimation).toHaveBeenCalled();
		expect(mockSpringAnimation).toHaveBeenCalledWith(
			mockSpringProps,
			mockAnimationInitProps,
		);
	});
	it('animation strategy passed as spring, but spring props not passed', () => {
		triggerAnimation(
			AnimationStrategy.SPRING,
			mockAnimationInitProps,
			{ ...mockAnimationBasedProps, springProps: undefined },
			mockAnimateFunction,
			mockSpringAnimation,
			mockRepeatAnimation,
		);
		expect(mockSpringAnimation).toHaveBeenCalled();
		expect(mockSpringAnimation).toHaveBeenCalledWith(
			DEFAULT_SPRING_PROPS,
			mockAnimationInitProps,
		);
	});
});
