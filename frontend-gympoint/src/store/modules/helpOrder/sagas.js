import { takeLatest, call, all } from 'redux-saga/effects';

import { toast } from 'react-toastify';

import api from '~/services/api';

function* setResponseHelpOrder({ payload }) {
  try {
    const { id, answer } = payload;

    yield call(api.post, `/help-orders/${id}/answer`, {
      id,
      answer,
    });

    toast.success('Aluno respondido com sucesso!');
  } catch (err) {
    toast.error(err.response.data.error);
  }
}

export default all([
  takeLatest('@helpOrder/RESPONSE_HELPORDER', setResponseHelpOrder),
]);
