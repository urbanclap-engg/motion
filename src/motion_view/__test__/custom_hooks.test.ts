import { useReanimatedStyles, useVisibilityStyle } from '../custom_hooks';
import { getInterpolation } from '../interpolation';
import {
	mockVisibilityOffset,
	mockAnimationOffset,
	mockInterpolationConfig,
} from '../mocks';

beforeEach(() => {
	jest.resetAllMocks();
});

describe('custom_hooks', () => {
	it('visibilityOffset, visibilityOffset passed to useAnimatedStyle', () => {
		const result = useVisibilityStyle(mockVisibilityOffset);
		expect(result.visibilityStyle.opacity).toBe(mockVisibilityOffset.value);
	});

	describe('useReanimatedStyles', () => {
		it('opacity, slide and scaleProps passed, object with opacityStyle will be returned', () => {
			const result = useReanimatedStyles(
				mockAnimationOffset,
				mockInterpolationConfig,
			);
			const {
				opacityProps,
				slideXAnimationProps,
				slideYAnimationProps,
				scaleXAnimationProps,
			} = mockInterpolationConfig.value;
			expect(result.opacityStyle.opacity).toBe(
				getInterpolation(
					mockAnimationOffset.value,
					opacityProps.inputArray,
					opacityProps.outputArray,
				),
			);
			expect(result.slideStyle.transform).toStrictEqual([
				{
					translateX: getInterpolation(
						mockAnimationOffset.value,
						slideXAnimationProps.inputArray,
						slideXAnimationProps.outputArray,
					),
					translateY: getInterpolation(
						mockAnimationOffset.value,
						slideYAnimationProps.inputArray,
						slideYAnimationProps.outputArray,
					),
				},
			]);
			expect(result.scaleStyle.transform).toStrictEqual([
				{
					scale: getInterpolation(
						mockAnimationOffset.value,
						scaleXAnimationProps.inputArray,
						scaleXAnimationProps.outputArray,
					),
				},
			]);
		});
		it('only scaleXAnimationProps Passed, children should scale in X direction', () => {
			const result = useReanimatedStyles(mockAnimationOffset, {
				...mockInterpolationConfig,
				value: {
					...mockInterpolationConfig.value,
					scaleYAnimationProps: undefined,
				},
			});
			const { scaleXAnimationProps } = mockInterpolationConfig.value;
			expect(result.scaleStyle.transform).toStrictEqual([
				{
					scaleX: getInterpolation(
						mockAnimationOffset.value,
						scaleXAnimationProps.inputArray,
						scaleXAnimationProps.outputArray,
					),
				},
			]);
		});
		it('only scaleYAnimationProps Passed, children should scale in Y direction', () => {
			const result = useReanimatedStyles(mockAnimationOffset, {
				...mockInterpolationConfig,
				value: {
					...mockInterpolationConfig.value,
					scaleXAnimationProps: undefined,
				},
			});
			const { scaleYAnimationProps } = mockInterpolationConfig.value;
			expect(result.scaleStyle.transform).toStrictEqual([
				{
					scaleY: getInterpolation(
						mockAnimationOffset.value,
						scaleYAnimationProps.inputArray,
						scaleYAnimationProps.outputArray,
					),
				},
			]);
		});
	});
});
