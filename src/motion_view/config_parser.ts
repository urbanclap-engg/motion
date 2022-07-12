import {
	CommonAnimationProps,
	ParsedBaseMotionProps,
	ParsedCommonAnimationProps,
	ParsedPositionBasedAnimationProps,
	PositionBasedAnimationProps,
} from './types';

const stringParser = (t: string | number | undefined): number => {
	'worklet';

	if (t) {
		if (typeof t === 'string') {
			return parseFloat(t);
		}
		return t;
	}
	return 0;
};

const stringToNumberProcessor = (
	value: number | string,
	multiplier = 1,
): number => {
	'worklet';

	return typeof value === 'string'
		? (stringParser(value) / 100) * multiplier
		: value;
};

const configModifier = (
	animationConfig: CommonAnimationProps,
	multiplier = 1,
): ParsedCommonAnimationProps => {
	'worklet';

	return {
		...animationConfig,
		fromValue: stringToNumberProcessor(animationConfig.fromValue, multiplier),
		toValue: stringToNumberProcessor(animationConfig.toValue, multiplier),
	};
};

const configParser = (
	animationConfigs?: PositionBasedAnimationProps[],
	animatedWidth = 1,
	animatedHeight = 1,
): ParsedPositionBasedAnimationProps[] => {
	'worklet';

	const animationArray: ParsedPositionBasedAnimationProps[] = [];
	if (animationConfigs) {
		animationConfigs.map(
			(animationConfigsItem: PositionBasedAnimationProps) => {
				const animationArrayObject: ParsedPositionBasedAnimationProps = {};
				animationArrayObject.x = animationConfigsItem.x
					? configModifier(animationConfigsItem.x, animatedWidth)
					: undefined;
				animationArrayObject.y = animationConfigsItem.y
					? configModifier(animationConfigsItem.y, animatedHeight)
					: undefined;
				animationArrayObject.x || animationArrayObject.y
					? animationArray.push(animationArrayObject)
					: undefined;
			},
		);
	}
	return animationArray;
};

/**
 * the below params will come as an array and the logic needs to be modified as per the requirement i.e it should return the parameters as an array.
 * @param opacityProps
 * @param slideAnimationProps
 * @param scaleAnimationProps
 * @returns
 */
const getParsedConfig = (
	animatedWidth: number,
	animatedHeight: number,
	opacityProps?: CommonAnimationProps[],
	slideAnimationProps?: PositionBasedAnimationProps[],
	scaleAnimationProps?: PositionBasedAnimationProps[],
): ParsedBaseMotionProps => {
	'worklet';

	const opacityArr: ParsedCommonAnimationProps[] = [];
	if (opacityProps) {
		opacityProps.map((opacityPropsItem: CommonAnimationProps) => {
			opacityArr.push(configModifier(opacityPropsItem));
		});
	}

	return {
		opacityProps: opacityArr,
		slideAnimationProps: configParser(
			slideAnimationProps,
			animatedWidth,
			animatedHeight,
		),
		scaleAnimationProps: configParser(scaleAnimationProps),
	};
};

export { getParsedConfig };
