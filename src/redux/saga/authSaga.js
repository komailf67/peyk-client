import { call, put, fork, all, takeEvery, select } from 'redux-saga/effects';
import { AuthService } from '../../services/authService';
import history from '../../utils/history';
import AuthActions from '../actions/authActions';
import NotificationActions from '../actions/notificationActions';

function* handleCheckPhone(action) {
  try {
    const res = yield call(AuthService.checkPhone, 'checkPhone', action.payload);
    const { data } = res;
    const { message } = data;
    yield put({
      type: AuthActions.AUTH.CHECK_PHONE.SUCCESS,
      // payload: data.data.phone,
      payload: '989144062667',
    });
    yield put({
      type: NotificationActions.NOTIFICATION.SUCCESS.SET_SUCCESS_RESPONSE,
      payload: message,
    });
    // yield call(forwardTo, '/auth/login');

    // history.push('/auth/login');
  } catch (err) {
    yield put({
      type: NotificationActions.NOTIFICATION.ERROR.SET_ERROR_RESPONSE,
      payload: err.response.data,
    });
  }
}
function forwardTo(location) {
  history.push(location);
}
function* handleCheckSms(action) {
  try {
    const res = yield call(AuthService.login, 'login', action.payload);
    const { data } = res;
    const { message } = data;
    localStorage.setItem('access_token', data.data.token);

    yield put({
      type: AuthActions.AUTH.CHECK_SMS_CODE.SUCCESS,
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
