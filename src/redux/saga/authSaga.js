import { call, put, fork, all, takeEvery, select } from 'redux-saga/effects';
import { AuthService } from '../../services/authService';
import history from '../../utils/history';
import AuthActions from '../actions/authActions';
import RedirectActions from '../actions/redirectActions';
import NotificationActions from '../actions/notificationActions';

function* handleCheckPhone(action) {
  try {
    const res = yield call(AuthService.checkPhone, 'checkPhone', action.payload);
    const { data } = res;
    const { message } = data;
    yield put({
      type: AuthActions.AUTH.CHECK_PHONE.SUCCESS,
      // payload: data.data.phone,
      payload: data?.data?.phone,
    });
    yield put({
      type: NotificationActions.NOTIFICATION.SUCCESS.SET_SUCCESS_RESPONSE,
      payload: message,
    });
    yield put({
      type: RedirectActions.FILL,
      payload: '/auth/login',
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

function* handleCheckSms(action) {
  try {
    const res = yield call(AuthService.login, 'login', action.payload);
    const { data } = res;
    const { message } = data;
    /**
     * userinfo set in redux in utils/api file
     * because after login, when the next api called, localStorage.getItem('userInfo) returns null
     */
    if (data.data?.name === null) {
      yield put({ type: AuthActions.AUTH.CHANGE_FULLNAME_MODAL_STATUS, payload: true });
    } else {
      yield put({
        type: NotificationActions.NOTIFICATION.SUCCESS.SET_SUCCESS_RESPONSE,
        payload: message,
      });
      yield put({
        type: RedirectActions.FILL,
        payload: '/new-service',
      });
    }

    // yield put({
    //   type: AuthActions.AUTH.CHECK_SMS_CODE.SUCCESS,
    // });
  } catch (err) {
    yield put({
      type: NotificationActions.NOTIFICATION.ERROR.SET_ERROR_RESPONSE,
      payload: err.response.data,
    });
  }
}
function* handleUpdateFullName(action) {
  try {
    const res = yield call(AuthService.update, action.payload);
    const { data } = res;
    const { message } = data;
    /**
     * userinfo set in redux in utils/api file
     * because after login, when the next api called, localStorage.getItem('access_token) returns null
     */
    const a = JSON.parse(localStorage.getItem('userInfo'));
    localStorage.setItem('userInfo', JSON.stringify({ ...a, name: data.data.name }));
    yield put({ type: AuthActions.AUTH.CHANGE_FULLNAME_MODAL_STATUS, payload: false });
    yield put({
      type: NotificationActions.NOTIFICATION.SUCCESS.SET_SUCCESS_RESPONSE,
      payload: message,
    });
    yield put({
      type: RedirectActions.FILL,
      payload: '/new-service',
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
function* watchUpdateProfile() {
  yield takeEvery(AuthActions.AUTH.UPDATE_PROFILE.REQUESTING, handleUpdateFullName);
}
export default function* authSaga() {
  yield all([fork(watchCheckPhone), fork(watchCheckSmsCode), fork(watchUpdateProfile)]);
}
