import produce from 'immer';

const INITIAL_STATE = {
  helpOrder: null,
};

export default function helpOrder(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@helpOrder/RESPONSE_HELPORDER': {
        draft.helpOrder = action.payload.helpOrder;
        break;
      }

      default:
    }
  });
}
