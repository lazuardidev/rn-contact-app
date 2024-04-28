const initialState = {
  contacts: [],
};

export const contactsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_CONTACTS':
      // console.log('call ADD_CONTACTS', action.payload);
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
