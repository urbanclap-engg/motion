import { getAnimationParams } from '../animation_params';

describe('getAnimationParams', () => {
	test('should return the correct animation params', () => {
		const duration = 100;
		const delay = 50;
		const result = getAnimationParams(duration, delay);
		expect(result).toEqual({
			toValue: 1,
			duration,
			delay,
		});
	});
});
