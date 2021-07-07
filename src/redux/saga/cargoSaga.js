import { call, put, fork, all, takeEvery, select } from 'redux-saga/effects';
import { BaseInfoServices } from '../../services/baseInfoServices';
import { cargoServices } from '../../services/cargoService';
import history from '../../utils/history';
// import { AuthService } from '../../services/authService';
// import API from '../../utils/API';
import AuthActions from '../actions/authActions';
import BaseInfoActions from '../actions/baseInfoActions';
import CargoActions from '../actions/cargoActions';
import { ActionTypes } from '../types';

function* handleCreateCargo(action) {
  try {
    const res = yield call(cargoServices.create, 'CREATE_CARGO', action.payload);
    const { data } = res;

    yield put({
      type: CargoActions.CARGO.CREATE.SUCCESS,
    });
  } catch (err) {
    // yield put({
    //   type: ActionTypes.NOTIFICATION.ERROR.SET_ERROR_RESPONSE,
    //   payload: err.response.data,
    // });
    // yield put({ type: ActionTypes.AUTH.CHECK_PHONE.ERROR });
  }
}

function* watchCreateCargo() {
  yield takeEvery(CargoActions.CARGO.CREATE.REQUESTING, handleCreateCargo);
}

export default function* cargoSaga() {
  yield all([fork(watchCreateCargo)]);
}
