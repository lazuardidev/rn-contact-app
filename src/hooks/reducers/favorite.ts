import {TContact} from '../../utils/type';

type State = {
  contacts: TContact[];
};

const initialState: State = {
  contacts: [],
};

export const contactsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'ADD_CONTACTS':
      return {...state, contacts: action.payload};
    case 'TOGGLE_FAVORITE':
      return {
        ...state,
        contacts: state.contacts.map(contact =>
          contact.id === action.payload
            ? {...contact, isFavorite: !contact.isFavorite}
            : contact,
        ),
      };
    default:
      return state;
  }
};
