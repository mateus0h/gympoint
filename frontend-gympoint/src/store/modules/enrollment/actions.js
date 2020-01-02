export function createEnrollment(student_id, plan_id, start_date) {
  return {
    type: '@enrollment/CREATE_ENROLLMENT',
    payload: { student_id, plan_id, start_date },
  };
}

export function updateEnrollment(data) {
  return {
    type: '@enrollment/UPDATE_ENROLLMENT',
    payload: { data },
  };
}

export function deleteEnrollment(id) {
  return {
    type: '@enrollment/DELETE_ENROLLMENT',
    payload: {
      idEnrollment: id,
    },
  };
}
