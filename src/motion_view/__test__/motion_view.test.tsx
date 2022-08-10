import * as React from 'react';
import { render } from '@testing-library/react-native';
import { View } from 'react-native';
import MotionView from '../motion_view';

beforeEach(() => {
	jest.resetAllMocks();
});

describe('motion_view', () => {
	it('should render', () => {
		const { getByTestId, toJSON } = render(
			<MotionView>
				<View style={{ width: 100, height: 100, backgroundColor: 'red' }} />
			</MotionView>,
		);
		expect(getByTestId('motion_view')).toBeTruthy();
		const tree = toJSON();
		expect(tree).toMatchSnapshot();
	});
});
