import produce from 'immer';
import AuthActions from '../../actions/authActions';

const userData = JSON.parse(localStorage.getItem('userInfo'));
export const initialState = {
  details: userData ?? {},
};

const userInfo = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case AuthActions.AUTH.USER_INFO.FILL:
        draft.details = action.payload;
        return draft;
      default:
        return draft;
    }
  });

export default userInfo;
