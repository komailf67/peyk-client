import { call, put, fork, all, takeEvery, select } from 'redux-saga/effects';
import { cargoServices } from '../../services/cargoService';
import CargoActions from '../actions/cargoActions';
import NotificationActions from '../actions/notificationActions';

function* handleCreateCargo(action) {
  try {
    const res = yield call(cargoServices.create, 'CREATE_CARGO', action.payload);
    const { data } = res;
    const { message } = data;

    yield put({
      type: CargoActions.CARGO.CREATE.SUCCESS,
    });
    yield put({
      type: NotificationActions.NOTIFICATION.SUCCESS.SET_SUCCESS_RESPONSE,
      payload: message,
    });
  } catch (err) {
    yield put({
      type: NotificationActions.NOTIFICATION.ERROR.SET_ERROR_RESPONSE,
      payload: err.response.data,
    });
    // yield put({ type: ActionTypes.AUTH.CHECK_PHONE.ERROR });
  }
}
function* handleGetCargoes(action) {
  try {
    const res = yield call(cargoServices.index, 'GET_CARGOES', action.payload);
    const { data } = res;

    yield put({
      type: CargoActions.CARGO.GET_CARGOES.SUCCESS,
      payload: data,
    });
  } catch (err) {
    yield put({
      type: NotificationActions.NOTIFICATION.ERROR.SET_ERROR_RESPONSE,
      payload: err.response.data,
    });
    // yield put({ type: ActionTypes.AUTH.CHECK_PHONE.ERROR });
  }
}
function* handlePayCargo(action) {
  try {
    const res = yield call(cargoServices.pay, 'PAY_CARGO', action.payload);
    const { data } = res;

    yield put({
      type: CargoActions.CARGO.PAY.SUCCESS,
      payload: data,
    });
  } catch (err) {
    yield put({
      type: NotificationActions.NOTIFICATION.ERROR.SET_ERROR_RESPONSE,
      payload: err.response.data,
    });
    // yield put({ type: ActionTypes.AUTH.CHECK_PHONE.ERROR });
  }
}

function* watchCreateCargo() {
  yield takeEvery(CargoActions.CARGO.CREATE.REQUESTING, handleCreateCargo);
}
function* watchGetCargoes() {
  yield takeEvery(CargoActions.CARGO.GET_CARGOES.REQUESTING, handleGetCargoes);
}
function* watchPayCargo() {
  yield takeEvery(CargoActions.CARGO.PAY.REQUESTING, handlePayCargo);
}

export default function* cargoSaga() {
  yield all([fork(watchCreateCargo), fork(watchGetCargoes), fork(watchPayCargo)]);
}
