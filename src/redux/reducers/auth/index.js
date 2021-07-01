import { combineReducers } from 'redux';

import checkPhoneNumber from './checkPhoneNumber';

const auth = combineReducers({
  checkPhoneNumber,
});

export default auth;
