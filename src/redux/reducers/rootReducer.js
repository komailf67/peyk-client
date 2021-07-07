import { combineReducers } from 'redux';
import auth from './auth';
import baseInfo from './baseInfo';
import cargo from './cargo';
import notification from './notification';

const rootReducer = combineReducers({
  auth,
  baseInfo,
  cargo,
  notification,
});

export default rootReducer;
