import { onAnimationComplete } from '../animation_callback';
import { mockOnAnimationBreak, mockOnAnimationSuccess } from '../mocks';

beforeEach(() => {
	jest.resetAllMocks();
});

describe('onAnimationComplete', () => {
	it('if animation finished, onAnimationSuccess called', () => {
		const isFinished = true;
		const onAnimationSuccess = mockOnAnimationSuccess;
		const onAnimationBreak = mockOnAnimationBreak;
		onAnimationComplete(isFinished, onAnimationSuccess, onAnimationBreak);
		expect(mockOnAnimationSuccess).toHaveBeenCalled();
		expect(mockOnAnimationBreak).not.toHaveBeenCalled();
	});

	it('if animation is not finished, onAnimationBreak called', () => {
		const isFinished = false;
		const onAnimationSuccess = mockOnAnimationSuccess;
		const onAnimationBreak = mockOnAnimationBreak;
		onAnimationComplete(isFinished, onAnimationSuccess, onAnimationBreak);
		expect(mockOnAnimationBreak).toHaveBeenCalled();
		expect(mockOnAnimationSuccess).not.toHaveBeenCalled();
	});

	it('if animation is not finished, onAnimationBreak and onAnimationSuccess has also not been passed', () => {
		const isFinished = false;
		const result = onAnimationComplete(isFinished);
		expect(result).toBeUndefined();
	});
});
