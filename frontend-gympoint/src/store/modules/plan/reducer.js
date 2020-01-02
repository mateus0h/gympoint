import produce from 'immer';

const INITIAL_STATE = {
  plan: null,
};

export default function student(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@plan/CREATE_PLAN': {
        draft.plan = action.payload.plan;
        break;
      }
      case '@plan/UPDATE_PLAN': {
        draft.plan = action.payload.plan;
        break;
      }
      case '@plan/DELETE_PLAN': {
        draft.plan = action.payload.plan;
        break;
      }
      default:
    }
  });
}
