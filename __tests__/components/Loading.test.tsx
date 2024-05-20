import React from 'react';
import {render} from '@testing-library/react-native';
import {Loading} from '../../src/components/Loading';

describe('Loading Component', () => {
  it('renders correctly', () => {
    const {getByTestId} = render(<Loading />);

    expect(getByTestId('loading-indicator')).toBeTruthy();
  });

  it('displays ActivityIndicator with correct props', () => {
    const {getByTestId} = render(<Loading />);

    const loadingIndicator = getByTestId('loading-indicator');
    expect(loadingIndicator.props.size).toBe('large');
    expect(loadingIndicator.props.color).toBe('purple');
  });
});
