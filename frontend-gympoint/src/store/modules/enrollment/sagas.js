import { takeLatest, call, all } from 'redux-saga/effects';

import { toast } from 'react-toastify';

import history from '~/services/history';

import api from '~/services/api';

function* setEnrollment({ payload }) {
  try {
    const { student_id, plan_id, start_date } = payload;

    yield call(api.post, 'enrollments', {
      student_id,
      plan_id,
      start_date,
    });

    history.push('/enrollments');

    toast.success('Matricula efetuada com sucesso!');
  } catch (err) {
    toast.error(err.response.data.error);
  }
}

export function* updateEnrollment({ payload }) {
  try {
    const { id, student_id, plan_id, start_date } = payload.data;
    yield call(api.put, `/enrollments/${id}`, {
      student_id,
      plan_id,
      start_date,
    });
    toast.success('Informações alteradas com sucesso!');
  } catch (err) {
    toast.error(err.response.data.error);
  }
}

export function* deleteEnrollment({ payload }) {
  try {
    yield call(api.delete, `/enrollments/${payload.idEnrollment}`);

    toast.success('Matrícula deletada com sucesso!');
  } catch (err) {
    toast.error(err.response.data.error);
  }
}

export default all([
  takeLatest('@enrollment/CREATE_ENROLLMENT', setEnrollment),
  takeLatest('@enrollment/UPDATE_ENROLLMENT', updateEnrollment),
  takeLatest('@enrollment/DELETE_ENROLLMENT', deleteEnrollment),
]);
