import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Form } from '@rocketseat/unform';
import { MdCheck, MdChevronLeft } from 'react-icons/md';

import * as Yup from 'yup';

import { useDispatch } from 'react-redux';

import { addMonths, format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import api from '~/services/api';
import { formatPrice } from '~/util/format';

import ReactSelect from '../ReactSelect';
import DatePickerInput from '../DatePickerInput';
import ReactAsyncSelect from '../ReactAsyncSelect';

import { updateEnrollment } from '~/store/modules/enrollment/actions';

import {
  Container,
  Content,
  Label,
  InputControl,
  ActionsHeader,
} from '../Create/styles';

const schema = Yup.object().shape({
  student_id: Yup.number().required('O Aluno é obrigatorio'),
  plan_id: Yup.number().required('O plano é obrigatoria'),
  start_date: Yup.date().required('A data inicial é obrigatória'),
});

export default function Edit({ history }) {
  const [plans, setPlans] = useState();
  const [startDate, setStartDate] = useState('');
  const [planSelec, setPlanSelec] = useState('');
  const [totalPrice, setTotalPrice] = useState('');

  const enrollmentOld = history.location.state.enrollment;

  const dispatch = useDispatch();

  useEffect(() => {
    async function loadlans() {
      const response = await api.get('plans');

      const pSelect = response.data.find(
        plan => plan.id === enrollmentOld.plan_id
      );

      setPlanSelec(pSelect);

      setPlans(response.data);
    }

    setTotalPrice(formatPrice(enrollmentOld.price));
    setStartDate(enrollmentOld.start_date);

    loadlans();
  }, [enrollmentOld.plan_id, enrollmentOld.price, enrollmentOld.start_date]);

  const endDate = useMemo(() => {
    if (planSelec !== '' && startDate !== null) {
      const endDateFormatted = addMonths(startDate, planSelec.duration);

      setTotalPrice(formatPrice(planSelec.price * planSelec.duration));

      return format(endDateFormatted, "dd'/'MM'/'Y", { locale: pt });
    }

    if (enrollmentOld && planSelec === '') {
      return format(parseISO(enrollmentOld.end_date), "dd'/'MM'/'Y", {
        locale: pt,
      });
    }

    return '';
  }, [enrollmentOld, planSelec, startDate]);

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
      }, 1000);
    });

  function handleSubmit(data) {
    data.id = enrollmentOld.id;

    dispatch(updateEnrollment(data));
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit} schema={schema} initialData={enrollmentOld}>
        <ActionsHeader>
          <p>Edição de matrícula</p>
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
                <ReactAsyncSelect
                  name="student_id"
                  options={promiseOptions}
                  defaultValue={enrollmentOld.student}
                />
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
                  defaultValue={enrollmentOld.plan}
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
              <input name="end_date" type="text" value={endDate} readOnly />
            </InputControl>

            <InputControl>
              <Label>VALOR FINAL</Label>
              <input name="price" type="text" value={totalPrice} readOnly />
            </InputControl>
          </div>
        </Content>
      </Form>
    </Container>
  );
}
