import * as React from 'react';
import { render } from '@testing-library/react-native';
import { View } from 'react-native';
import Ripple from '../ripple_view';

beforeEach(() => {
	jest.resetAllMocks();
});

describe('motion_view', () => {
	it('should render', () => {
		const { getByTestId, toJSON } = render(
			<Ripple>
				<View style={{ width: 100, height: 100, backgroundColor: 'red' }} />
			</Ripple>,
		);
		expect(getByTestId('ripple_view')).toBeTruthy();
		const tree = toJSON();
		expect(tree).toMatchSnapshot();
	});
});
