import {combineReducers} from 'redux';
import {contactsReducer} from './reducers/favorite';

const rootReducer = combineReducers({
  contacts: contactsReducer,
});

export default rootReducer;
