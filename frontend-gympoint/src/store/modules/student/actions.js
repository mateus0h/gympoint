export function createStudent(name, email, age, weight, height) {
  return {
    type: '@student/CREATE_STUDENT',
    payload: { name, email, age, weight, height },
  };
}

export function updateStudent(data) {
  return {
    type: '@student/UPDATE_STUDENT',
    payload: { data },
  };
}

export function deleteStudent(id) {
  return {
    type: '@student/DELETE_STUDENT',
    payload: {
      idStudent: id,
    },
  };
}
