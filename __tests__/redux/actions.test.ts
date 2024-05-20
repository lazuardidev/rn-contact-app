import {
  ADD_CONTACTS,
  TOGGLE_FAVORITE,
  addContacts,
  toggleFavorite,
} from '../../src/hooks/actions/favorite.ts';
import {TContact} from '../../src/utils/type';

describe('Redux Actions', () => {
  it('should create an action to add contacts', () => {
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
        isFavorite: false,
      },
    ];
    const expectedAction = {
      type: ADD_CONTACTS,
      payload: contacts,
    };
    expect(addContacts(contacts)).toEqual(expectedAction);
  });

  it('should create an action to toggle favorite', () => {
    const id = '1';
    const expectedAction = {
      type: TOGGLE_FAVORITE,
      payload: id,
    };
    expect(toggleFavorite(id)).toEqual(expectedAction);
  });
});
