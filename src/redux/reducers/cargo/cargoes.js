import produce from 'immer';
import CargoActions from '../../actions/cargoActions';

export const initialState = {
  list: [],
  requesting: false,
  success: false,
  error: false,
};

const cargoes = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case CargoActions.CARGO.GET_CARGOES.REQUESTING:
        draft.requesting = true;
        draft.success = false;
        draft.error = false;
        return draft;
      case CargoActions.CARGO.GET_CARGOES.SUCCESS:
        draft.list = action.payload;
        draft.requesting = false;
        draft.success = true;
        draft.error = false;
        return draft;
      case CargoActions.CARGO.GET_CARGOES.ERROR:
        draft.requesting = false;
        draft.success = false;
        draft.error = true;
        return draft;
      default:
        return draft;
    }
  });

export default cargoes;
