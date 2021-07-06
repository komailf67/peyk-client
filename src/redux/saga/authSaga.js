import { call, put, fork, all, takeEvery, select } from 'redux-saga/effects';
import { AuthService } from '../../services/authService';
import history from '../../utils/history';
// import { AuthService } from '../../services/authService';
// import API from '../../utils/API';
import AuthActions from '../actions/authActions';
import { ActionTypes } from '../types';

function* handleCheckPhone(action) {
  try {
    // const res = yield call(AuthService.checkPhone, 'checkPhone', action.payload);
    // const { data } = res;

    yield put({
      type: AuthActions.AUTH.CHECK_PHONE.SUCCESS,
      // payload: data.data.phone,
      payload: '989144062667',
    });
    yield call(forwardTo, '/auth/login');

    // history.push('/auth/login');
  } catch (err) {
    // yield put({
    //   type: ActionTypes.NOTIFICATION.ERROR.SET_ERROR_RESPONSE,
    //   payload: err.response.data,
    // });
    // yield put({ type: ActionTypes.AUTH.CHECK_PHONE.ERROR });
  }
}
function forwardTo(location) {
  history.push(location);
}
function* handleCheckSms(action) {
  try {
    const res = yield call(AuthService.login, 'login', action.payload);
    const { data } = res;
    localStorage.setItem('access_token', data.data.token);

    yield put({
      type: AuthActions.AUTH.CHECK_SMS_CODE.SUCCESS,
    });
  } catch (err) {
    // yield put({
    //   type: ActionTypes.NOTIFICATION.ERROR.SET_ERROR_RESPONSE,
    //   payload: err.response.data,
    // });
    // yield put({ type: ActionTypes.AUTH.CHECK_PHONE.ERROR });
  }
}

function* watchCheckPhone() {
  yield takeEvery(AuthActions.AUTH.CHECK_PHONE.REQUESTING, handleCheckPhone);
}

function* watchCheckSmsCode() {
  yield takeEvery(AuthActions.AUTH.CHECK_SMS_CODE.REQUESTING, handleCheckSms);
}

export default function* authSaga() {
  yield all([fork(watchCheckPhone), fork(watchCheckSmsCode)]);
}
