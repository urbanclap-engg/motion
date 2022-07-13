import { interpolate } from 'react-native-reanimated';
import {
	InterPolationArrays,
	InterpolationProps,
	MotionInterpolationConfig,
	OffsetProps,
	ParsedBaseMotionProps,
	ParsedCommonAnimationProps,
	ParsedPositionBasedAnimationProps,
} from './types';

const getOffsetProps = (
	startTime: number,
	duration: number,
	totalDuration: number,
): OffsetProps => {
	'worklet';

	const endTime = startTime + duration;
	const startInputOffset = startTime / totalDuration;
	const endInputOffset = endTime / totalDuration;
	return {
		startInputOffset,
		endInputOffset,
	};
};

const getInterPolatedProps = (
	totalDuration: number,
	parsedAnimationProps?: ParsedCommonAnimationProps,
): InterpolationProps | undefined => {
	'worklet';

	if (!parsedAnimationProps) return undefined;
	const offsetProps = getOffsetProps(
		parsedAnimationProps.startTiming,
		parsedAnimationProps.duration,
		totalDuration,
	);
	return {
		fromValue: parsedAnimationProps.fromValue,
		toValue: parsedAnimationProps.toValue,
		startInputOffset: offsetProps.startInputOffset,
		endInputOffset: offsetProps.endInputOffset,
	};
};

export const getInterpolation = (
	offset: number,
	inputArr: number[],
	outputArr: number[],
) => {
	'worklet';

	return interpolate(offset, inputArr, outputArr, 'clamp');
};

const getInterpolationArrays = (
	interpolationConfig: InterpolationProps[],
): InterPolationArrays | undefined => {
	'worklet';

	const inputArray: number[] = [];
	const outputArray: number[] = [];

	interpolationConfig.map(
		(interpolationConfigItem: InterpolationProps, index: number) => {
			if (index === 0) {
				inputArray.push(
					interpolationConfigItem.startInputOffset,
					interpolationConfigItem.endInputOffset,
				);
				outputArray.push(
					interpolationConfigItem.fromValue,
					interpolationConfigItem.toValue,
				);
			} else if (
				interpolationConfigItem.startInputOffset !==
				inputArray[inputArray.length - 1]
			) {
				inputArray.push(
					interpolationConfigItem.startInputOffset,
					interpolationConfigItem.endInputOffset,
				);
				outputArray.push(
					interpolationConfigItem.fromValue,
					interpolationConfigItem.toValue,
				);
			} else {
				inputArray.push(interpolationConfigItem.endInputOffset);
				outputArray.push(interpolationConfigItem.toValue);
			}
			return undefined;
		},
	);

	if (inputArray.length === 0 || outputArray.length === 0) return undefined;
	return {
		inputArray,
		outputArray,
	};
};

const positionBasedAnimationModifier = (
	animationProps: ParsedPositionBasedAnimationProps[],
	totalDuration: number,
	xArr: InterpolationProps[],
	yArr: InterpolationProps[],
) => {
	'worklet';

	if (animationProps.length > 0) {
		animationProps.map(
			(animationPropsItem: ParsedPositionBasedAnimationProps) => {
				if (animationPropsItem.x) {
					const xArrItem = getInterPolatedProps(
						totalDuration,
						animationPropsItem.x,
					);
					xArrItem ? xArr.push(xArrItem) : null;
				}
				if (animationPropsItem.y) {
					const yArrItem = getInterPolatedProps(
						totalDuration,
						animationPropsItem.y,
					);
					yArrItem ? yArr.push(yArrItem) : null;
				}
				return undefined;
			},
		);
	}
};

const getInterPolationConfig = (
	parsedConfig: ParsedBaseMotionProps,
	totalDuration: number,
): MotionInterpolationConfig => {
	'worklet';

	const opacityArr: InterpolationProps[] = [];
	const slideXArr: InterpolationProps[] = [];
	const slideYArr: InterpolationProps[] = [];
	const scaleXArr: InterpolationProps[] = [];
	const scaleYArr: InterpolationProps[] = [];
	const { opacityProps, slideAnimationProps, scaleAnimationProps } =
		parsedConfig;

	if (opacityProps.length > 0) {
		opacityProps.map((opacityPropsItem: ParsedCommonAnimationProps) => {
			const opacityArrItem = getInterPolatedProps(
				totalDuration,
				opacityPropsItem,
			);
			opacityArrItem ? opacityArr.push(opacityArrItem) : null;
			return undefined;
		});
	}
	positionBasedAnimationModifier(
		slideAnimationProps,
		totalDuration,
		slideXArr,
		slideYArr,
	);
	positionBasedAnimationModifier(
		scaleAnimationProps,
		totalDuration,
		scaleXArr,
		scaleYArr,
	);

	return {
		opacityProps: getInterpolationArrays(opacityArr),
		slideXAnimationProps: getInterpolationArrays(slideXArr),
		slideYAnimationProps: getInterpolationArrays(slideYArr),
		scaleXAnimationProps: getInterpolationArrays(scaleXArr),
		scaleYAnimationProps: getInterpolationArrays(scaleYArr),
	};
};

export { getOffsetProps, getInterPolatedProps, getInterPolationConfig };
