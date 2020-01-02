import { takeLatest, call, all } from 'redux-saga/effects';

import { toast } from 'react-toastify';

import history from '~/services/history';

import api from '~/services/api';

export function* setStudent({ payload }) {
  try {
    const { name, email, age, weight, height } = payload;

    yield call(api.post, 'students', {
      name,
      email,
      age,
      weight,
      height,
    });

    history.push('/students');
    toast.success('Aluno cadastrado com sucesso!');
  } catch (err) {
    toast.error(err.response.data.error);
  }
}

export function* updateStudent({ payload }) {
  try {
    const { id, name, email, age, weight, height } = payload.data;

    yield call(api.put, `/students/${id}`, {
      name,
      email,
      age,
      weight,
      height,
    });

    toast.success('Informações alteradas com sucesso!');
  } catch (err) {
    toast.error(err.response.data.error);
  }
}

export function* deleteStudent({ payload }) {
  try {
    yield call(api.delete, `/students/${payload.idStudent}`);

    toast.success('Aluno deletado com sucesso!');
  } catch (err) {
    toast.error(err.response.data.error);
  }
}

export default all([
  takeLatest('@student/CREATE_STUDENT', setStudent),
  takeLatest('@student/UPDATE_STUDENT', updateStudent),
  takeLatest('@student/DELETE_STUDENT', deleteStudent),
]);
