import React from 'react';
import {render} from '@testing-library/react-native';
import {NoData} from '../../src/components/NoData';

describe('NoData Component', () => {
  it('renders correctly', () => {
    const {getByText} = render(<NoData />);

    expect(getByText('No Data')).toBeTruthy();
    expect(getByText('Pull to Refresh')).toBeTruthy();
  });
});
