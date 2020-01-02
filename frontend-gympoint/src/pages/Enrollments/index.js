import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { MdAdd, MdCheckCircle } from 'react-icons/md';

import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import { deleteEnrollment } from '~/store/modules/enrollment/actions';

import api from '~/services/api';
import Loading from '~/components/Loading';

import { Container, Content, Actions, EnrollmentTable } from './styles';

export default function Enrollments() {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    async function loadEnrollments() {
      const response = await api.get('enrollments');

      const data = response.data.map(enrollment => {
        const startDateFormatted = format(
          parseISO(enrollment.start_date),
          "d 'de' MMMM 'de' Y",
          { locale: pt }
        );

        const endDateFormatted = format(
          parseISO(enrollment.end_date),
          "d 'de' MMMM 'de' Y",
          { locale: pt }
        );

        const start_date = parseISO(enrollment.start_date);
        const plan_id = enrollment.plan.id;
        const student_id = enrollment.student.id;

        return {
          ...enrollment,
          plan_id,
          student_id,
          startDateFormatted,
          endDateFormatted,
          start_date,
        };
      });

      setEnrollments(data);
      setLoading(false);
    }

    loadEnrollments();
  }, []);

  function handleDelete(idEnrollment, aluno) {
    if (window.confirm(`Deseja apagar a matricula do aluno ${aluno} ?`)) {
      dispatch(deleteEnrollment(idEnrollment));

      const newList = enrollments.filter(item => item.id !== idEnrollment);

      setEnrollments(newList);
    }
  }

  return loading ? (
    <Loading />
  ) : (
    <Container>
      <Actions>
        <p>Gerenciado matrículas</p>
        <div>
          <Link to="/enrollments/create">
            <button type="button">
              <MdAdd size={20} color="#FFFF" />
              <div>CADASTRAR</div>
            </button>
          </Link>
        </div>
      </Actions>
      <Content>
        <EnrollmentTable>
          <thead>
            <tr>
              <th>ALUNO</th>
              <th className="alignCenter">PLANO</th>
              <th className="alignCenter">INÍCIO</th>
              <th className="alignCenter">TÉRMINO</th>
              <th className="alignCenter">ATIVA</th>
              <th> </th>
            </tr>
          </thead>

          {enrollments.map(enrollment => (
            <tbody key={enrollment.id}>
              <tr>
                <td>{enrollment.student.name}</td>
                <td className="alignCenter">{enrollment.plan.title}</td>
                <td className="alignCenter">{enrollment.startDateFormatted}</td>
                <td className="alignCenter">{enrollment.endDateFormatted}</td>
                <td className="alignCenter">
                  {enrollment.active ? (
                    <MdCheckCircle size={20} color="#42cb59" />
                  ) : (
                    <MdCheckCircle size={20} color="#dddddd" />
                  )}
                </td>
                <td id="buttons">
                  <Link
                    id="edit"
                    to={{
                      pathname: `/enrollments/edit`,
                      state: {
                        enrollment,
                      },
                    }}
                  >
                    Editar
                  </Link>

                  <button
                    type="button"
                    id="delete"
                    onClick={() =>
                      handleDelete(enrollment.id, enrollment.student.name)
                    }
                  >
                    Apagar
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </EnrollmentTable>
      </Content>
    </Container>
  );
}
