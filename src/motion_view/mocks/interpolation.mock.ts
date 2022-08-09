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

export { mockPositionAnimationModifierProps, mockParsedMotionProps };
