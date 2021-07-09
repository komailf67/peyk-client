import { combineReducers } from 'redux';
import auth from './auth';
import baseInfo from './baseInfo';
import cargo from './cargo';
import notification from './notification';
import redirect from './redirect';

const rootReducer = combineReducers({
  auth,
  baseInfo,
  cargo,
  notification,
  redirect,
});

export default rootReducer;
