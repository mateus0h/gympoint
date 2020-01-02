import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { MdCheck, MdChevronLeft } from 'react-icons/md';
import { updatePlan } from '~/store/modules/plan/actions';
import { formatPrice } from '~/util/format';

import {
  Container,
  Content,
  Label,
  InputControl,
  ActionsHeader,
} from '../create/styles';

const schema = Yup.object().shape({
  title: Yup.string().required('O Título é obrigatorio'),
  duration: Yup.string().required('A Duração é obrigatoria'),
  price: Yup.string().required('O preço é obrigatório'),
});

export default function Edit({ history }) {
  const [plan, setPlan] = useState([]);

  const dispatch = useDispatch();

  const planOld = history.location.state.plan;

  useEffect(() => {
    setPlan({
      duration: planOld.duration,
      price: planOld.price,
    });
  }, [planOld.duration, planOld.price]);

  function handleSubmit(data) {
    data.id = planOld.id;

    dispatch(updatePlan(data));
  }

  const totalPrice = useMemo(() => {
    let total = 0.0;

    if (plan.duration && plan.price) {
      total = plan.duration * plan.price;
    }

    return formatPrice(total);
  }, [plan.duration, plan.price]);

  return (
    <Container>
      <Form initialData={planOld} schema={schema} onSubmit={handleSubmit}>
        <ActionsHeader>
          <p>Edição de plano</p>
          <div>
            <Link to="/plans">
              <button id="back" type="button">
                <MdChevronLeft size={25} color="#FFFF" />
                <div>VOLTAR</div>
              </button>
            </Link>
            <button id="save" type="submit">
              <MdCheck size={20} color="#FFFF" />
              <div>SALVAR</div>
            </button>
          </div>
        </ActionsHeader>

        <Content>
          <div className="inputRow">
            <InputControl>
              <Label>TÍTULO DO PLANO</Label>
              <Input name="title" type="text" />
            </InputControl>
          </div>

          <div className="inputColumn">
            <InputControl>
              <Label>DURAÇÃO (em meses)</Label>
              <Input
                name="duration"
                id="duration"
                type="number"
                onChange={e => setPlan({ ...plan, duration: e.target.value })}
              />
            </InputControl>

            <InputControl>
              <Label>PREÇO MENSAL</Label>
              <Input
                name="price"
                type="number"
                onChange={e => setPlan({ ...plan, price: e.target.value })}
              />
            </InputControl>

            <InputControl>
              <Label>PREÇO TOTAL</Label>
              <Input
                name="priceMonthly"
                type="text"
                readOnly
                value={totalPrice}
              />
            </InputControl>
          </div>
        </Content>
      </Form>
    </Container>
  );
}
