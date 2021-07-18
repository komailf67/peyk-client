import { combineReducers } from 'redux';

import createCargo from './createCargo';
import cargoes from './cargoes';
import gatewayData from './gatewayData';

const auth = combineReducers({
  createCargo: createCargo,
  cargoes,
  gatewayData,
});

export default auth;
