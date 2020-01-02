import produce from 'immer';

const INITIAL_STATE = {
  student: null,
};

export default function student(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@student/CREATE_STUDENT': {
        draft.student = action.payload.student;
        break;
      }
      case '@student/UPDATE_STUDENT': {
        draft.student = action.payload.student;
        break;
      }
      case '@student/DELETE_STUDENT': {
        draft.student = action.payload.student;
        break;
      }
      default:
    }
  });
}
