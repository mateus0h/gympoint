import produce from 'immer';

const INITIAL_STATE = {
  enrollment: null,
};

export default function enrollment(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@enrollment/CREATE_ENROLLMENT': {
        draft.enrollment = action.payload.enrollment;
        break;
      }
      case '@enrollment/UPDATE_ENROLLMENT': {
        draft.enrollment = action.payload.enrollment;
        break;
      }
      case '@enrollment/DELETE_ENROLLMENT': {
        draft.enrollment = action.payload.enrollment;
        break;
      }
      default:
    }
  });
}
