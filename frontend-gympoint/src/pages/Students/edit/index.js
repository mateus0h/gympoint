import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { MdCheck, MdChevronLeft } from 'react-icons/md';

import { updateStudent } from '~/store/modules/student/actions';
import {
  Container,
  Content,
  Label,
  InputControl,
  ActionsHeader,
} from '../create/styles';

const schema = Yup.object().shape({
  name: Yup.string().required('O Nome é obrigatório'),
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O email é obrigatório'),
  age: Yup.string().required('A idade é obrigatória'),
  weight: Yup.string().required('O peso é obrigatório'),
  height: Yup.string().required('A altura é obrigatória'),
});

export default function Edit({ history }) {
  const dispatch = useDispatch();

  const { student } = history.location.state;

  function handleSubmit(data) {
    data.id = student.id;
    dispatch(updateStudent(data));
  }
  return (
    <Container>
      <Form initialData={student} schema={schema} onSubmit={handleSubmit}>
        <ActionsHeader>
          <p>Edição de aluno</p>
          <div>
            <Link to="/students">
              <button id="back" type="button">
                <MdChevronLeft size={25} color="#FFFF" />
                <div>VOLTAR</div>
              </button>
            </Link>
            <button id="save" type="submit">
              <MdCheck size={18} color="#FFFF" />
              <div>SALVAR</div>
            </button>
          </div>
        </ActionsHeader>
        <Content>
          <div className="inputRow">
            <InputControl>
              <Label>NOME COMPLETO</Label>
              <Input name="name" type="text" placeholder="John Doe" />
            </InputControl>

            <InputControl>
              <Label>ENDEREÇO DE E-MAIL</Label>
              <Input
                name="email"
                type="email"
                placeholder="exemplo@gmail.com"
              />
            </InputControl>
          </div>

          <div className="inputColumn">
            <InputControl>
              <Label>IDADE</Label>
              <Input name="age" type="number" />
            </InputControl>

            <InputControl>
              <Label>PESO (em kg)</Label>
              <Input name="weight" type="number" />
            </InputControl>

            <InputControl>
              <Label>ALTURA (em cm)</Label>
              <Input name="height" type="number" />
            </InputControl>
          </div>
        </Content>
      </Form>
    </Container>
  );
}
