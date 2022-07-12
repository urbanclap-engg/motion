import { InterpolationProps, MotionInterpolationConfig, OffsetProps, ParsedBaseMotionProps, ParsedCommonAnimationProps } from './types';
declare const getOffsetProps: (startTime: number, duration: number, totalDuration: number) => OffsetProps;
declare const getInterPolatedProps: (totalDuration: number, parsedAnimationProps?: ParsedCommonAnimationProps | undefined) => InterpolationProps | undefined;
export declare const getInterpolation: (offset: number, inputArr: number[], outputArr: number[]) => number;
declare const getInterPolationConfig: (parsedConfig: ParsedBaseMotionProps, totalDuration: number) => MotionInterpolationConfig;
export { getOffsetProps, getInterPolatedProps, getInterPolationConfig };
