export function createPlan(title, duration, price) {
  return {
    type: '@plan/CREATE_PLAN',
    payload: { title, duration, price },
  };
}

export function updatePlan(data) {
  return {
    type: '@plan/UPDATE_PLAN',
    payload: { data },
  };
}

export function deletePlan(id) {
  return {
    type: '@plan/DELETE_PLAN',
    payload: {
      idPlan: id,
    },
  };
}
