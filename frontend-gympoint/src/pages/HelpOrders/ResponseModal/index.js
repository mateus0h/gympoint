import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import ReactModal from 'react-modal';
import * as Yup from 'yup';

import { responseHelpOrder } from '~/store/modules/helpOrder/actions';

import { Container } from './styles';

ReactModal.setAppElement('#root');

const schema = Yup.object().shape({
  answer: Yup.string().required('O resposta é obrigatória'),
});

export default function Modal(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState('');

  const dispatch = useDispatch();
  useEffect(() => {
    setQuestion(props.question);
    setIsOpen(props.isOpen);
  }, [props]);

  function handleSubmit({ answer }) {
    const id = props.idQuestion;

    props.listHelpOrder(id);

    dispatch(responseHelpOrder(answer, id));
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <ReactModal
        style={{
          overlay: {
            zIndex: 5,
            backgroundColor: 'rgba(0,0,0,0.7)',
          },
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '435px',
            background: '#FFFFFF',
          },
        }}
        isOpen={isOpen}
        onRequestClose={closeModal}
      >
        <Form schema={schema} onSubmit={handleSubmit}>
          <Container>
            <div>PERGUNTA DO ALUNO</div>
            <p>{question}</p>
            <div>SUA RESPOSTA</div>
            <Input multiline name="answer" type="text" />
            <button type="submit">Responder aluno</button>
          </Container>
        </Form>
      </ReactModal>
    </>
  );
}
