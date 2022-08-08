import {
	getInterPolatedProps,
	getInterpolationArrays,
	getInterPolationConfig,
	getOffsetProps,
	PositionBasedAnimationModifier,
} from '../interpolation';
import { InterpolationProps } from '../types';

beforeEach(() => {
	jest.resetAllMocks();
});

const mockPositionAnimationModifierProps = [
	{
		x: {
			fromValue: 0,
			toValue: 100,
			startTiming: 0,
			duration: 1000,
		},
		y: {
			fromValue: 0,
			toValue: 100,
			startTiming: 1000,
			duration: 1000,
		},
	},
	{
		y: {
			fromValue: 100,
			toValue: 0,
			startTiming: 2000,
			duration: 1000,
		},
	},
];

const mockParsedMotionProps = {
	opacityProps: [
		{
			fromValue: 0,
			toValue: 1,
			startTiming: 0,
			duration: 1000,
		},
	],
	slideAnimationProps: mockPositionAnimationModifierProps,
	scaleAnimationProps: mockPositionAnimationModifierProps,
};

describe('getOffsetProps', () => {
	it('startTime, duration, totalDuration passed, should return startInputOffset and endInputOffset', () => {
		const result = getOffsetProps(1, 2, 3);
		expect(result).toStrictEqual({
			startInputOffset: 0.3333333333333333,
			endInputOffset: 1,
		});
	});
});

describe('getInterPolatedProps', () => {
	it('total duration passed but parsed animation config was not passed, will return undefined', () => {
		const result = getInterPolatedProps(1);
		expect(result).toBeUndefined();
	});
	it('total duration and parsedAnimationProps both passed, interpolated props will be returned', () => {
		const result = getInterPolatedProps(1, {
			fromValue: 1,
			toValue: 2,
			startTiming: 1,
			duration: 2,
		});
		expect(result).toStrictEqual({
			fromValue: 1,
			toValue: 2,
			startInputOffset: 1,
			endInputOffset: 3,
		});
	});
});

describe('getInterpolationArrays', () => {
	it('interpolation config passed with empty input and output arrays, will return undefined', () => {
		const result = getInterpolationArrays([]);
		expect(result).toBeUndefined();
	});
	it('interpolation config passed with single element, will return interpolation arrays', () => {
		const result = getInterpolationArrays([
			{ startInputOffset: 1, endInputOffset: 2, fromValue: 1, toValue: 2 },
		]);
		expect(result).toStrictEqual({ inputArray: [1, 2], outputArray: [1, 2] });
	});
	it('interpolation config passed with multiple element with same toValue, will return interpolation arrays', () => {
		const result = getInterpolationArrays([
			{
				startInputOffset: 1,
				endInputOffset: 2,
				fromValue: 1,
				toValue: 2,
			},
			{
				startInputOffset: 3,
				endInputOffset: 4,
				fromValue: 2,
				toValue: 3,
			},
		]);
		expect(result).toStrictEqual({
			inputArray: [1, 2, 3, 4],
			outputArray: [1, 2, 2, 3],
		});
	});
	it('interpolation config passed with multiple element with different toValue, will return interpolation arrays', () => {
		const result = getInterpolationArrays([
			{
				startInputOffset: 1,
				endInputOffset: 2,
				fromValue: 1,
				toValue: 2,
			},
			{
				startInputOffset: 3,
				endInputOffset: 4,
				fromValue: 3,
				toValue: 4,
			},
			{
				startInputOffset: 5,
				endInputOffset: 6,
				fromValue: 4,
				toValue: 5,
			},
		]);
		expect(result).toStrictEqual({
			inputArray: [1, 2, 3, 4, 5, 6],
			outputArray: [1, 2, 3, 4, 4, 5],
		});
	});
});

describe('PositionBasedAnimationModifier', () => {
	it('x Array and y Array passed empty', () => {
		const xArray: InterpolationProps[] = [];
		const yArray: InterpolationProps[] = [];
		expect(xArray).toHaveLength(0);
		expect(yArray).toHaveLength(0);
		PositionBasedAnimationModifier(
			mockPositionAnimationModifierProps,
			3000,
			xArray,
			yArray,
		);
		expect(xArray).toHaveLength(1);
		expect(yArray).toHaveLength(2);
		expect(xArray[0]).toStrictEqual({
			fromValue: 0,
			toValue: 100,
			startInputOffset: 0,
			endInputOffset: 0.3333333333333333,
		});
		expect(yArray[0]).toStrictEqual({
			fromValue: 0,
			toValue: 100,
			startInputOffset: 0.3333333333333333,
			endInputOffset: 0.6666666666666666,
		});
		expect(yArray[1]).toStrictEqual({
			fromValue: 100,
			toValue: 0,
			startInputOffset: 0.6666666666666666,
			endInputOffset: 1,
		});
	});
});

describe('getInterPolationConfig', () => {
	it('parsedConfig and total duration passed correctly', () => {
		const result = getInterPolationConfig(mockParsedMotionProps, 3000);
		const expected = {
			opacityProps: {
				inputArray: [0, 0.3333333333333333],
				outputArray: [0, 1],
			},
			scaleXAnimationProps: {
				inputArray: [0, 0.3333333333333333],
				outputArray: [0, 100],
			},
			scaleYAnimationProps: {
				inputArray: [0.3333333333333333, 0.6666666666666666, 1],
				outputArray: [0, 100, 0],
			},
			slideXAnimationProps: {
				inputArray: [0, 0.3333333333333333],
				outputArray: [0, 100],
			},
			slideYAnimationProps: {
				inputArray: [0.3333333333333333, 0.6666666666666666, 1],
				outputArray: [0, 100, 0],
			},
		};
		expect(result).toStrictEqual(expected);
	});
	it('parsedConfig passed without opacityProps and total duration passed correctly, returned object will not have opacity', () => {
		const result = getInterPolationConfig(
			{ ...mockParsedMotionProps, opacityProps: [] },
			3000,
		);
		const expected = {
			opacityProps: undefined,
			scaleXAnimationProps: {
				inputArray: [0, 0.3333333333333333],
				outputArray: [0, 100],
			},
			scaleYAnimationProps: {
				inputArray: [0.3333333333333333, 0.6666666666666666, 1],
				outputArray: [0, 100, 0],
			},
			slideXAnimationProps: {
				inputArray: [0, 0.3333333333333333],
				outputArray: [0, 100],
			},
			slideYAnimationProps: {
				inputArray: [0.3333333333333333, 0.6666666666666666, 1],
				outputArray: [0, 100, 0],
			},
		};
		expect(result).toStrictEqual(expected);
	});
});
