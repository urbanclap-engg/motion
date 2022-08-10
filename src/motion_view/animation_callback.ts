const onAnimationComplete = (
	isFinished?: boolean,
	onAnimationSuccess?: Function,
	onAnimationBreak?: Function,
) => {
	if (isFinished && onAnimationSuccess) onAnimationSuccess();
	else if (!isFinished && onAnimationBreak) onAnimationBreak();
};

export { onAnimationComplete };
