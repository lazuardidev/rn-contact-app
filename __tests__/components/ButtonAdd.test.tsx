import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {ButtonAdd} from '../../src/components/ButtonAdd.tsx';

jest.mock('react-native-vector-icons/Ionicons', () => 'Ionicons');

describe('ButtonAdd Component', () => {
  it('renders correctly', () => {
    const {getByTestId} = render(<ButtonAdd onPress={() => {}} />);
    expect(getByTestId('button-add')).toBeTruthy();
  });

  it('calls onPress when the button is pressed', () => {
    const onPressMock = jest.fn();
    const {getByTestId} = render(<ButtonAdd onPress={onPressMock} />);
    fireEvent.press(getByTestId('button-add'));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });
});
