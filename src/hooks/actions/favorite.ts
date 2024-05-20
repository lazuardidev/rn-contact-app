import {TContact} from '../../utils/type';

export const ADD_CONTACTS = 'ADD_CONTACTS';
export const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE';

export const addContacts = (contacts: TContact[]) => ({
  type: ADD_CONTACTS,
  payload: contacts,
});

export const toggleFavorite = (id: string) => ({
  type: TOGGLE_FAVORITE,
  payload: id,
});
