import { takeLatest, call, all } from 'redux-saga/effects';

import { toast } from 'react-toastify';

import history from '~/services/history';

import api from '~/services/api';

export function* setPlan({ payload }) {
  try {
    const { title, duration, price } = payload;

    yield call(api.post, 'plans', {
      title,
      duration,
      price,
    });

    history.push('/plans');

    toast.success('Plano cadastrado com sucesso!');
  } catch (err) {
    toast.error(err.response.data.error);
  }
}

export function* updatePlan({ payload }) {
  try {
    const { id, title, duration, price } = payload.data;

    yield call(api.put, `/plans/${id}`, {
      title,
      duration,
      price,
    });

    toast.success('Informações alteradas com sucesso!');
  } catch (err) {
    toast.error(err.response.data.error);
  }
}

export function* deletePlan({ payload }) {
  try {
    yield call(api.delete, `/plans/${payload.idPlan}`);

    toast.success('Plano deletado com sucesso!');
  } catch (err) {
    toast.error(err.response.data.error);
  }
}

export default all([
  takeLatest('@plan/CREATE_PLAN', setPlan),
  takeLatest('@plan/UPDATE_PLAN', updatePlan),
  takeLatest('@plan/DELETE_PLAN', deletePlan),
]);
