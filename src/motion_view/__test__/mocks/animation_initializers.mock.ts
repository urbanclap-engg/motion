const mockAnimationInitProps = {
	visibilityOffset: { value: 1 },
	setViewHidden: jest.fn(),
	onAnimationSuccess: jest.fn(),
	onAnimationBreak: jest.fn(),
	animationParams: { fromValue: 0, toValue: 100, duration: 1000 },
	hideViewPostAnimation: true,
};

const mockEasingValues = {
	w: 0,
	x: 0,
	y: 1,
	z: 1,
};
const mockRepeatProps = {
	repeatCount: 1,
	loop: false,
	reverseOnRepeat: true,
};
const mockSpringProps = {
	damping: 1,
	mass: 1,
	stiffness: 1,
	overshootClamping: true,
	restDisplacementThreshold: 1,
	restSpeedThreshold: 1,
};

export {
	mockAnimationInitProps,
	mockEasingValues,
	mockRepeatProps,
	mockSpringProps,
};
