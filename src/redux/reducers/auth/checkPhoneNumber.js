import produce from 'immer';
import AuthActions from '../../actions/authActions';

export const initialState = {
  list: [],
  requesting: false,
  success: false,
  error: false,
  phoneNumber: false,
};

/* eslint-disable default-case, no-param-reassign */
const checkPhoneNumber = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case AuthActions.AUTH.CHECK_PHONE.REQUESTING:
        draft.requesting = true;
        draft.success = false;
        draft.error = false;
        return draft;
      case AuthActions.AUTH.CHECK_PHONE.SUCCESS:
        draft.list = action.payload;
        draft.requesting = false;
        draft.success = true;
        draft.error = false;
        return draft;
      case AuthActions.AUTH.CHECK_PHONE.ERROR:
        draft.list = [];
        draft.requesting = false;
        draft.success = false;
        draft.error = true;
        return draft;
      case AuthActions.AUTH.CHECK_PHONE.EMPTY:
        draft.list = [];
        draft.requesting = false;
        draft.success = false;
        draft.error = true;
        return draft;
      case AuthActions.AUTH.CHECK_PHONE.SAVE_PHONE_NUMBER:
        draft.phoneNumber = action.payload;
        return draft;
      default:
        return draft;
    }
  });

export default checkPhoneNumber;
