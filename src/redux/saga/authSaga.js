import { call, put, fork, all, takeEvery, select } from 'redux-saga/effects';
import { AuthService } from '../../services/authService';
// import { AuthService } from '../../services/authService';
// import API from '../../utils/API';
import AuthActions from '../actions/authActions';
import { ActionTypes } from '../types';

function* handleCheckPhone(action) {
  try {
    const res = yield call(AuthService.checkPhone, 'checkPhone', action.payload);
    // yield put({
    //   type: ActionTypes.AUTH.CHECK_PHONE.SUCCESS,
    //   payload: res.body,
    // });
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

export default function* authSaga() {
  yield all([fork(watchCheckPhone)]);
}
