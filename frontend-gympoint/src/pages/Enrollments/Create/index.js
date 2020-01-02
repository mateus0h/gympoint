import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import { MdCheck, MdChevronLeft } from 'react-icons/md';

import * as Yup from 'yup';

import { useDispatch } from 'react-redux';

import { addMonths, format } from 'date-fns';

import api from '~/services/api';
import { formatPrice } from '~/util/format';

import ReactSelect from '../ReactSelect';
import DatePickerInput from '../DatePickerInput';
import ReactAsyncSelect from '../ReactAsyncSelect';

import { createEnrollment } from '~/store/modules/enrollment/actions';

import {
  Container,
  Content,
  Label,
  InputControl,
  ActionsHeader,
} from './styles';

const schema = Yup.object().shape({
  student_id: Yup.string().required('O Aluno é obrigatorio'),
  plan_id: Yup.string().required('O plano é obrigatoria'),
  start_date: Yup.date().required('A data inicial é obrigatória'),
});

export default function Create() {
  const [plans, setPlans] = useState();
  const [startDate, setStartDate] = useState(null);
  const [planSelec, setPlanSelec] = useState('');
  const [totalPrice, setTotalPrice] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    async function loadlans() {
      const response = await api.get('plans');
      setPlans(response.data);
    }

    loadlans();
  }, [setPlans]);

  const endDate = useMemo(() => {
    if (planSelec !== '') {
      setTotalPrice(formatPrice(planSelec.duration * planSelec.price));
    }

    if (startDate !== null && planSelec !== '') {
      const endDateFormatted = addMonths(startDate, planSelec.duration);

      return format(endDateFormatted, "dd'/'MM'/'Y");
    }
    return '';
  }, [planSelec, startDate]);

  const filterStudents = inputValue => {
    async function loadStudents() {
      const response = await api.get(`students/?name=${inputValue}`);

      return response.data;
    }

    return loadStudents();
  };

  const promiseOptions = inputValue =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve(filterStudents(inputValue));
      }, 100);
    });

  function handleSubmit({ student_id, plan_id, start_date }) {
    dispatch(createEnrollment(student_id, plan_id, start_date));
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit} schema={schema}>
        <ActionsHeader>
          <p>Cadastro de matrícula</p>
          <div>
            <Link to="/enrollments">
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
              <Label>ALUNO</Label>
              <div className="divSelectColumn">
                <ReactAsyncSelect name="student_id" options={promiseOptions} />
              </div>
            </InputControl>
          </div>

          <div className="inputColumn">
            <InputControl>
              <Label>PLANO</Label>
              <div className="divSelectRow">
                <ReactSelect
                  className="basic-single"
                  classNamePrefix="select"
                  onChange={plan => setPlanSelec(plan)}
                  options={plans}
                  name="plan_id"
                />
              </div>
            </InputControl>

            <InputControl>
              <Label>DATA DE INÍCIO</Label>
              <DatePickerInput
                name="start_date"
                onChangeDate={data => setStartDate(data)}
              />
            </InputControl>

            <InputControl>
              <Label>DATA DE TÉRMINO</Label>
              <Input name="end_date" type="text" value={endDate} readOnly />
            </InputControl>

            <InputControl>
              <Label>VALOR FINAL</Label>
              <Input name="price" type="text" value={totalPrice} readOnly />
            </InputControl>
          </div>
        </Content>
      </Form>
    </Container>
  );
}
