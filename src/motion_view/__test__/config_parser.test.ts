import {
	configModifier,
	configParser,
	getParsedConfig,
	stringParser,
	stringToNumberProcessor,
} from '../config_parser';

beforeEach(() => {
	jest.resetAllMocks();
});

const mockParseFloat = jest.fn();

describe('config_parser', () => {
	describe('stringParser', () => {
		it('string is passed as input, string in form of number will be returned', () => {
			const string = '1';
			const result = stringParser(string);
			mockParseFloat.mockReturnValue(1);
			expect(result).toBe(1);
		});
		it('string is passed as number, number will be returned', () => {
			const string = 1;
			const result = stringParser(string);
			expect(result).toBe(1);
		});
		it('string is passed as undefined, 0 will be returned', () => {
			const string = NaN;
			const result = stringParser(string);
			expect(result).toBe(0);
		});
	});

	describe('stringToNumberProcessor', () => {
		it('value passed as a string, it will be converted into number and used as a percentage', () => {
			const value = '10';
			const multiplier = 1;
			const result = stringToNumberProcessor(value);
			expect(result).toBe((stringParser(value) / 100) * multiplier);
		});
		it('value passed as a number, it will be returned as it is', () => {
			const value = 10;
			const result = stringToNumberProcessor(value);
			expect(result).toBe(value);
		});
	});

	describe('configModifier', () => {
		it('props passed correctly, animation config will be modified correctly', () => {
			const MOCK_COMMON_ANIMATION_PROPS = {
				fromValue: 0,
				toValue: 1,
				startTiming: 0,
				duration: 1000,
			};
			const MOCK_MULTIPLIER = 1;
			const result = configModifier(MOCK_COMMON_ANIMATION_PROPS);
			const expectedResult = {
				...MOCK_COMMON_ANIMATION_PROPS,
				fromValue: stringToNumberProcessor(
					MOCK_COMMON_ANIMATION_PROPS.fromValue,
					MOCK_MULTIPLIER,
				),
				toValue: stringToNumberProcessor(
					MOCK_COMMON_ANIMATION_PROPS.toValue,
					MOCK_MULTIPLIER,
				),
			};
			expect(result).toEqual(expectedResult);
		});
	});

	describe('configParser', () => {
		it('animationConfigs passed with both x and y, modified animationConfig will have both x and y', () => {
			const MOCK_ANIMATION_CONFIGS = [
				{
					x: {
						fromValue: 0,
						toValue: 1,
						startTiming: 0,
						duration: 1000,
					},
					y: {
						fromValue: 0,
						toValue: 1,
						startTiming: 0,
						duration: 1000,
					},
				},
			];
			const MOCK_ANIMATED_WIDTH = 1;
			const MOCK_ANIMATED_HEIGHT = 1;
			const result = configParser(
				MOCK_ANIMATION_CONFIGS,
				MOCK_ANIMATED_WIDTH,
				MOCK_ANIMATED_HEIGHT,
			);
			const expectedResult = [
				{
					x: {
						fromValue: stringToNumberProcessor(
							MOCK_ANIMATION_CONFIGS[0].x.fromValue,
							MOCK_ANIMATED_WIDTH,
						),
						toValue: stringToNumberProcessor(
							MOCK_ANIMATION_CONFIGS[0].x.toValue,
							MOCK_ANIMATED_WIDTH,
						),
						startTiming: MOCK_ANIMATION_CONFIGS[0].x.startTiming,
						duration: MOCK_ANIMATION_CONFIGS[0].x.duration,
					},
					y: {
						fromValue: stringToNumberProcessor(
							MOCK_ANIMATION_CONFIGS[0].y.fromValue,
							MOCK_ANIMATED_HEIGHT,
						),
						toValue: stringToNumberProcessor(
							MOCK_ANIMATION_CONFIGS[0].y.toValue,
							MOCK_ANIMATED_HEIGHT,
						),
						startTiming: MOCK_ANIMATION_CONFIGS[0].y.startTiming,
						duration: MOCK_ANIMATION_CONFIGS[0].y.duration,
					},
				},
			];
			expect(result).toEqual(expectedResult);
		});
		it('animationConfigs passed with only x, modified animationConfig will have only x', () => {
			const MOCK_ANIMATION_CONFIGS = [
				{
					x: {
						fromValue: 1,
						toValue: 2,
						startTiming: 1000,
						duration: 1000,
					},
				},
			];
			const MOCK_ANIMATED_WIDTH = 1;
			const MOCK_ANIMATED_HEIGHT = 1;
			const result = configParser(
				MOCK_ANIMATION_CONFIGS,
				MOCK_ANIMATED_WIDTH,
				MOCK_ANIMATED_HEIGHT,
			);
			const expectedResult = [
				{
					x: {
						fromValue: stringToNumberProcessor(
							MOCK_ANIMATION_CONFIGS[0].x.fromValue,
							MOCK_ANIMATED_WIDTH,
						),
						toValue: stringToNumberProcessor(
							MOCK_ANIMATION_CONFIGS[0].x.toValue,
							MOCK_ANIMATED_WIDTH,
						),
						startTiming: MOCK_ANIMATION_CONFIGS[0].x.startTiming,
						duration: MOCK_ANIMATION_CONFIGS[0].x.duration,
					},
				},
			];
			expect(result).toEqual(expectedResult);
		});
		it('animationConfigs passed with only y, modified animationConfig will have both x and y', () => {
			const MOCK_ANIMATION_CONFIGS = [
				{
					y: {
						fromValue: 0,
						toValue: 1,
						startTiming: 0,
						duration: 1000,
					},
				},
			];
			const MOCK_ANIMATED_WIDTH = 1;
			const MOCK_ANIMATED_HEIGHT = 1;
			const result = configParser(
				MOCK_ANIMATION_CONFIGS,
				MOCK_ANIMATED_WIDTH,
				MOCK_ANIMATED_HEIGHT,
			);
			const expectedResult = [
				{
					y: {
						fromValue: stringToNumberProcessor(
							MOCK_ANIMATION_CONFIGS[0].y.fromValue,
							MOCK_ANIMATED_HEIGHT,
						),
						toValue: stringToNumberProcessor(
							MOCK_ANIMATION_CONFIGS[0].y.toValue,
							MOCK_ANIMATED_HEIGHT,
						),
						startTiming: MOCK_ANIMATION_CONFIGS[0].y.startTiming,
						duration: MOCK_ANIMATION_CONFIGS[0].y.duration,
					},
				},
			];
			expect(result).toEqual(expectedResult);
		});

		it('animationConfigs passed without x or y, modified animationConfig will have both x and y', () => {
			const MOCK_ANIMATION_CONFIGS = [{}];
			const MOCK_ANIMATED_WIDTH = 1;
			const MOCK_ANIMATED_HEIGHT = 1;
			const result = configParser(
				MOCK_ANIMATION_CONFIGS,
				MOCK_ANIMATED_WIDTH,
				MOCK_ANIMATED_HEIGHT,
			);
			expect(result).toHaveLength(0);
		});
	});

	describe('getParsedConfig', () => {
		it('All opacity, slide and scale props passed, animationConfig will modified correctly', () => {
			const MOCK_ANIMATED_WIDTH = 1;
			const MOCK_ANIMATED_HEIGHT = 1;
			const MOCK_OPACITY_PROPS = [
				{
					fromValue: 0,
					toValue: 1,
					startTiming: 0,
					duration: 1000,
				},
			];
			const MOCK_SLIDE_PROPS = [
				{
					x: {
						fromValue: 0,
						toValue: 1,
						startTiming: 0,
						duration: 1000,
					},
				},
			];
			const MOCK_SCALE_PROPS = [
				{
					x: {
						fromValue: 0,
						toValue: 1,
						startTiming: 0,
						duration: 1000,
					},
					y: {
						fromValue: 0,
						toValue: 1,
						startTiming: 0,
						duration: 1000,
					},
				},
			];
			const result = getParsedConfig(
				MOCK_ANIMATED_WIDTH,
				MOCK_ANIMATED_HEIGHT,
				MOCK_OPACITY_PROPS,
				MOCK_SLIDE_PROPS,
				MOCK_SCALE_PROPS,
			);
			const expectedResult = {
				opacityProps: [
					{
						fromValue: stringToNumberProcessor(
							MOCK_OPACITY_PROPS[0].fromValue,
							MOCK_ANIMATED_WIDTH,
						),
						toValue: stringToNumberProcessor(
							MOCK_OPACITY_PROPS[0].toValue,
							MOCK_ANIMATED_WIDTH,
						),
						startTiming: MOCK_OPACITY_PROPS[0].startTiming,
						duration: MOCK_OPACITY_PROPS[0].duration,
					},
				],
				slideAnimationProps: [
					{
						x: {
							fromValue: stringToNumberProcessor(
								MOCK_SLIDE_PROPS[0].x.fromValue,
								MOCK_ANIMATED_HEIGHT,
							),
							toValue: stringToNumberProcessor(
								MOCK_SLIDE_PROPS[0].x.toValue,
								MOCK_ANIMATED_HEIGHT,
							),
							startTiming: MOCK_SLIDE_PROPS[0].x.startTiming,
							duration: MOCK_SLIDE_PROPS[0].x.duration,
						},
						y: undefined,
					},
				],
				scaleAnimationProps: [
					{
						x: {
							fromValue: stringToNumberProcessor(
								MOCK_SCALE_PROPS[0].x.fromValue,
								MOCK_ANIMATED_WIDTH,
							),
							toValue: stringToNumberProcessor(
								MOCK_SCALE_PROPS[0].x.toValue,
								MOCK_ANIMATED_WIDTH,
							),
							startTiming: MOCK_SCALE_PROPS[0].x.startTiming,
							duration: MOCK_SCALE_PROPS[0].x.duration,
						},
						y: {
							fromValue: stringToNumberProcessor(
								MOCK_SCALE_PROPS[0].y.fromValue,
								MOCK_ANIMATED_HEIGHT,
							),
							toValue: stringToNumberProcessor(
								MOCK_SCALE_PROPS[0].y.toValue,
								MOCK_ANIMATED_HEIGHT,
							),
							startTiming: MOCK_SCALE_PROPS[0].y.startTiming,
							duration: MOCK_SCALE_PROPS[0].y.duration,
						},
					},
				],
			};
			expect(result).toEqual(expectedResult);
		});
	});
});
