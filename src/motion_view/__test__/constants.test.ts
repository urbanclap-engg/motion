import {
	DEFAULT_TOTAL_DURATION,
	DEFAULT_DELAY,
	DEFAULT_OFFSET,
	DEFAULT_WIDTH,
	DEFAULT_HEIGHT,
	DEFAULT_HIDE_VIEW,
	DEFAULT_EASING_VALUES,
	DEFAULT_REPEAT_PROPS,
	DEFAULT_SPRING_PROPS,
} from '../constants';

describe('constants', () => {
	it('DEFAULT_TOTAL_DURATION, to be 1000', () => {
		expect(DEFAULT_TOTAL_DURATION).toBe(1000);
	});
	it('DEFAULT_DELAY, to be 0', () => {
		expect(DEFAULT_DELAY).toBe(0);
	});
	it('DEFAULT_OFFSET, to be 0', () => {
		expect(DEFAULT_OFFSET).toBe(0);
	});
	it('DEFAULT_WIDTH, to be 0', () => {
		expect(DEFAULT_WIDTH).toBe(0);
	});
	it('DEFAULT_HEIGHT, to be 0', () => {
		expect(DEFAULT_HEIGHT).toBe(0);
	});
	it('DEFAULT_HIDE_VIEW, to be false', () => {
		expect(DEFAULT_HIDE_VIEW).toBe(false);
	});
	it('DEFAULT_EASING_VALUES, to be { w: 0, x: 0, y: 1, z: 1 }', () => {
		expect(DEFAULT_EASING_VALUES).toEqual({
			w: 0,
			x: 0,
			y: 1,
			z: 1,
		});
	});
	it('DEFAULT_REPEAT_PROPS, to be { repeatCount: 0, loop: false, reverseOnRepeat: false }', () => {
		expect(DEFAULT_REPEAT_PROPS).toEqual({
			repeatCount: 0,
			loop: false,
			reverseOnRepeat: false,
		});
	});
	it('DEFAULT_SPRING_PROPS, to be { damping: 10, mass: 1, stiffness: 100, overshootClamping: false, restDisplacementThreshold: 0.01, restSpeedThreshold: 2 }', () => {
		expect(DEFAULT_SPRING_PROPS).toEqual({
			damping: 10,
			mass: 1,
			stiffness: 100,
			overshootClamping: false,
			restDisplacementThreshold: 0.01,
			restSpeedThreshold: 2,
		});
	});
});
