import { withSpring, withRepeat, withTiming } from 'react-native-reanimated';
import {
	animateFn,
	getRepeatCount,
	postAnimationCallback,
	RepeatAnimateFn,
	SpringAnimationFn,
} from '../animation_initializers';
import {
	mockAnimationInitProps,
	mockEasingValues,
	mockRepeatProps,
	mockSpringProps,
} from '../mocks';

beforeEach(() => {
	jest.resetAllMocks();
});

describe('animation_initializers', () => {
	describe('getRepeatCount', () => {
		it('should return undefined, if no repeat props are passed', () => {
			expect(getRepeatCount()).toBeUndefined();
		});
		it('should return undefined, if repeatCount is 0', () => {
			expect(getRepeatCount({ repeatCount: 0 })).toBeUndefined();
		});
		it('should return -1, if loop is true', () => {
			expect(getRepeatCount({ loop: true })).toBe(-1);
		});
		it('should return repeatCount, if repeatCount is not 0', () => {
			expect(getRepeatCount({ repeatCount: 1 })).toBe(1);
		});
	});

	describe('postAnimationCallback', () => {
		it('test', () => {
			const booleans = {
				isFinished: true,
				hideViewPostAnimation: true,
			};
			const visibilityOffset = { value: 1 };
			const callbacks = {
				setViewHidden: jest.fn(),
				onAnimationSuccess: jest.fn(),
				onAnimationBreak: jest.fn(),
			};
			postAnimationCallback(booleans, visibilityOffset, callbacks);
			expect(callbacks.setViewHidden).toHaveBeenCalledWith(true);
		});
	});

	describe('SpringAnimationFn', () => {
		it('should return a spring animation function', () => {
			expect(typeof SpringAnimationFn).toBe('function');
		});
		it('should return a spring animation function with the correct arguments', () => {
			const springProps = mockSpringProps;
			const animationInitProps = mockAnimationInitProps;
			const { animationParams, hideViewPostAnimation } = animationInitProps;
			SpringAnimationFn(springProps, animationInitProps);
			expect(withSpring).toHaveBeenCalled();
			expect(withSpring).toHaveBeenCalledWith(
				animationParams.toValue,
				springProps,
				expect.any(Function),
			);
			expect(hideViewPostAnimation).toBe(true);
		});
	});

	describe('RepeatAnimateFn', () => {
		it('should return a repeat animation function', () => {
			expect(typeof RepeatAnimateFn).toBe('function');
		});
		it('should return a repeat animation function with the correct arguments', () => {
			const repeatProps = mockRepeatProps;
			const animationInitProps = mockAnimationInitProps;
			const easingValues = mockEasingValues;
			const { hideViewPostAnimation } = animationInitProps;
			const { repeatCount, reverseOnRepeat } = repeatProps;
			RepeatAnimateFn(repeatProps, animationInitProps, easingValues);
			expect(withTiming).toHaveBeenCalled();
			expect(withTiming).toHaveBeenCalledWith(
				animationInitProps.animationParams.toValue,
				{ duration: animationInitProps.animationParams.duration },
			);
			expect(withRepeat).toHaveBeenCalled();
			expect(withRepeat).toHaveBeenCalledTimes(repeatCount);
			expect(withRepeat).toHaveBeenCalledWith(
				withTiming(animationInitProps.animationParams.toValue, {
					duration: animationInitProps.animationParams.duration,
				}),
				repeatCount,
				reverseOnRepeat,
				expect.any(Function),
			);
			expect(hideViewPostAnimation).toBe(true);
		});
	});

	describe('animateFn', () => {
		it('should return a regular animation function', () => {
			expect(typeof animateFn).toBe('function');
		});
		it('should return a regular animation function with the correct arguments', () => {
			const animationInitProps = mockAnimationInitProps;
			const easingValues = mockEasingValues;
			const { hideViewPostAnimation } = animationInitProps;
			animateFn(animationInitProps, easingValues);
			expect(withTiming).toHaveBeenCalled();
			expect(withTiming).toHaveBeenCalledWith(
				animationInitProps.animationParams.toValue,
				{ duration: animationInitProps.animationParams.duration },
				expect.any(Function),
			);
			expect(hideViewPostAnimation).toBe(true);
		});
	});
});
