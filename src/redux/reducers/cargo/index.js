import { combineReducers } from 'redux';

import createCargo from './createCargo';
import cargoes from './cargoes';

const auth = combineReducers({
  createCargo: createCargo,
  cargoes,
});

export default auth;
