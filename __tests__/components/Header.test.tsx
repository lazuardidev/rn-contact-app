import React from 'react';
import {render} from '@testing-library/react-native';
import {Header} from '../../src/components/Header';

describe('Header Component', () => {
  it('renders correctly', () => {
    const {getByText} = render(<Header title="Test Title" />);

    expect(getByText('Test Title')).toBeTruthy();
  });

  it('displays the correct title', () => {
    const title = 'My Header Title';
    const {getByText} = render(<Header title={title} />);

    const titleElement = getByText(title);
    expect(titleElement).toBeTruthy();
    expect(titleElement.props.children).toBe(title);
  });
});
