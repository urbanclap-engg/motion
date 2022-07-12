import { CommonAnimationProps, ParsedBaseMotionProps, PositionBasedAnimationProps } from './types';
/**
 * the below params will come as an array and the logic needs to be modified as per the requirement i.e it should return the parameters as an array.
 * @param opacityProps
 * @param slideAnimationProps
 * @param scaleAnimationProps
 * @returns
 */
declare const getParsedConfig: (animatedWidth: number, animatedHeight: number, opacityProps?: CommonAnimationProps[] | undefined, slideAnimationProps?: PositionBasedAnimationProps[] | undefined, scaleAnimationProps?: PositionBasedAnimationProps[] | undefined) => ParsedBaseMotionProps;
export { getParsedConfig };
