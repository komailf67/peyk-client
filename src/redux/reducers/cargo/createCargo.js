import produce from 'immer';
import CargoActions from '../../actions/cargoActions';

export const initialState = {
  requesting: false,
  success: false,
  error: false,
};

/* eslint-disable default-case, no-param-reassign */
const createCargo = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case CargoActions.CARGO.CREATE.REQUESTING:
        draft.requesting = true;
        draft.success = false;
        draft.error = false;
        return draft;
      case CargoActions.CARGO.CREATE.SUCCESS:
        draft.requesting = false;
        draft.success = true;
        draft.error = false;
        return draft;
      case CargoActions.CARGO.CREATE.ERROR:
        draft.requesting = false;
        draft.success = false;
        draft.error = true;
        return draft;
      case CargoActions.CARGO.CREATE.FORM_SUBMIT_STATE:
        draft.success = action.payload;
        return draft;
      default:
        return draft;
    }
  });

export default createCargo;
