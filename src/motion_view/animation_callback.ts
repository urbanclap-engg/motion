const onAnimationComplete = (
	isFinished?: boolean,
	onAnimationSuccess?: Function,
	onAnimationBreak?: Function,
) => {
	if (isFinished) {
		if (onAnimationSuccess) onAnimationSuccess();
	} else if (onAnimationBreak) onAnimationBreak();
};

export { onAnimationComplete };
