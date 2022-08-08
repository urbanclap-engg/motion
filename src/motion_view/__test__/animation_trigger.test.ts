import { triggerAnimation } from '../animation_trigger';
import {
	DEFAULT_EASING_VALUES,
	DEFAULT_REPEAT_PROPS,
	DEFAULT_SPRING_PROPS,
} from '../constants';
import { AnimationStrategy } from '../enums';

const mockAnimationInitProps = {
	visibilityOffset: { value: 1 },
	setViewHidden: jest.fn(),
	onAnimationSuccess: jest.fn(),
	onAnimationBreak: jest.fn(),
	animationParams: { toValue: 1, duration: 1000 },
	hideViewPostAnimation: true,
};
const mockEasingValues = {
	w: 0,
	x: 0,
	y: 1,
	z: 1,
};
const mockRepeatProps = {
	repeatCount: 1,
	loop: false,
	reverseOnRepeat: false,
};
const mockSpringProps = {
	damping: 1,
	mass: 1,
	stiffness: 1,
	overshootClamping: true,
	restDisplacementThreshold: 1,
	restSpeedThreshold: 1,
};
const mockAnimationBasedProps = {
	easingValues: mockEasingValues,
	repeatProps: mockRepeatProps,
	springProps: mockSpringProps,
};

const mockRepeatAnimation = jest.fn().mockName('RepeatAnimateFn');
const mockSpringAnimation = jest.fn().mockName('SpringAnimateFn');
const mockAnimateFunction = jest.fn().mockName('animateFn');

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
