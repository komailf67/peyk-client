import { combineReducers } from 'redux';
import auth from './auth';
import baseInfo from './baseInfo';
import cargo from './cargo';

const rootReducer = combineReducers({
  auth,
  baseInfo,
  cargo,
});

export default rootReducer;
