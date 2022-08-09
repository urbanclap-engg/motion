const mockVisibilityOffset = { value: 1 };
const mockAnimationOffset = { value: 1 };
const mockInterPolationProps = {
	inputArray: [0, 1],
	outputArray: [0, 1],
};
const mockInterpolationConfig = {
	value: {
		opacityProps: mockInterPolationProps,
		slideXAnimationProps: mockInterPolationProps,
		slideYAnimationProps: mockInterPolationProps,
		scaleXAnimationProps: mockInterPolationProps,
		scaleYAnimationProps: mockInterPolationProps,
	},
};

export { mockVisibilityOffset, mockAnimationOffset, mockInterpolationConfig };
