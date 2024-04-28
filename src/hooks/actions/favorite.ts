import {TContact} from '../../utils/type';

export const addContacts = (contacts: TContact[]) => ({
  type: 'ADD_CONTACTS',
  payload: contacts,
});

export const toggleFavorite = (id: string) => ({
  type: 'TOGGLE_FAVORITE',
  payload: id,
});
