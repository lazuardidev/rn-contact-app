import {
  ADD_CONTACTS,
  TOGGLE_FAVORITE,
} from '../../src/hooks/actions/favorite.ts';
import {contactsReducer} from '../../src/hooks/reducers/favorite.ts';
import {TContact} from '../../src/utils/type';

describe('Contacts Reducer', () => {
  const initialState = {
    contacts: [],
  };

  it('should return the initial state', () => {
    expect(contactsReducer(undefined, {type: undefined})).toEqual(initialState);
  });

  it('should handle ADD_CONTACTS', () => {
    const contacts: TContact[] = [
      {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        age: 22,
        photo: '',
        isFavorite: false,
      },
      {
        id: '2',
        firstName: 'Doe',
        lastName: 'John',
        age: 22,
        photo: '',
        isFavorite: true,
      },
    ];
    const action = {
      type: ADD_CONTACTS,
      payload: contacts,
    };
    const expectedState = {
      contacts: contacts,
    };
    expect(contactsReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle TOGGLE_FAVORITE', () => {
    const initialStateWithContacts = {
      contacts: [
        {
          id: '1',
          firstName: 'John',
          lastName: 'Doe',
          age: 22,
          photo: '',
          isFavorite: false,
        },
        {
          id: '2',
          firstName: 'Doe',
          lastName: 'John',
          age: 22,
          photo: '',
          isFavorite: true,
        },
      ],
    };
    const action = {
      type: TOGGLE_FAVORITE,
      payload: '1',
    };
    const expectedState = {
      contacts: [
        {
          id: '1',
          firstName: 'John',
          lastName: 'Doe',
          age: 22,
          photo: '',
          isFavorite: true,
        },
        {
          id: '2',
          firstName: 'Doe',
          lastName: 'John',
          age: 22,
          photo: '',
          isFavorite: true,
        },
      ],
    };
    expect(contactsReducer(initialStateWithContacts, action)).toEqual(
      expectedState,
    );
  });
});
