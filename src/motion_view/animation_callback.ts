const onAnimationComplete = (
	isFinished?: boolean,
	onAnimationSuccess?: any,
	onAnimationBreak?: any,
) => {
	if (isFinished) {
		if (onAnimationSuccess) onAnimationSuccess();
	} else if (onAnimationBreak) onAnimationBreak();
};

export { onAnimationComplete };
