import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {ContactSection} from '../../src/components/ContactSection';
import {TContactSectionData} from '../../src/utils/type';

jest.mock('react-native-vector-icons/Ionicons', () => 'Ionicons');

describe('ContactSection Component', () => {
  const mockHandleNavigateToDetail = jest.fn();
  const mockHandleToogleFavorites = jest.fn();

  const sections: TContactSectionData[] = [
    {
      letter: 'A',
      items: [
        {
          id: '1',
          firstName: 'Alice',
          lastName: 'Smith',
          age: 20,
          photo: 'https://example.com/photo1.jpg',
          isFavorite: false,
        },
        {
          id: '2',
          firstName: 'Alex',
          lastName: 'Johnson',
          photo: '',
          age: 20,
          isFavorite: true,
        },
      ],
    },
  ];

  const setup = () => {
    return render(
      <ContactSection
        sections={sections}
        handleNavigateToDetail={mockHandleNavigateToDetail}
        handleToogleFavorites={mockHandleToogleFavorites}
      />,
    );
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const {getByText} = setup();
    expect(getByText('Alice Smith')).toBeTruthy();
    expect(getByText('Alex Johnson')).toBeTruthy();
  });

  it('calls handleNavigateToDetail when a contact is pressed', () => {
    const {getByText} = setup();
    fireEvent.press(getByText('Alice Smith'));
    expect(mockHandleNavigateToDetail).toHaveBeenCalledWith(
      sections[0].items[0],
    );
  });

  it('calls handleToogleFavorites when the favorite button is pressed', () => {
    const {getAllByTestId} = setup();
    const favoriteButtons = getAllByTestId('favorite-button');
    fireEvent.press(favoriteButtons[0]);
    expect(mockHandleToogleFavorites).toHaveBeenCalledWith(
      sections[0].items[0],
    );
  });
});
