import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Link } from 'react-router-dom';

import { MdAdd, MdSearch } from 'react-icons/md';
import api from '~/services/api';

import { Container, StudentsTable, Content, Actions } from './styles';

import { deleteStudent } from '~/store/modules/student/actions';
import Loading from '~/components/Loading';

export default function Students() {
  const [students, setStudents] = useState([]);
  const [paramStudent, setParamStudent] = useState('');
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    async function loadStudents() {
      const response = await api.get(`students/?name=${paramStudent}`);

      setStudents(response.data);
      setLoading(false);
    }

    loadStudents();
  }, [paramStudent]);

  function handleSearch(e) {
    const name = e.target.value;

    if (name.length >= 3) {
      setParamStudent(name);
    }
  }

  function handleDelete(idStudent, name) {
    if (window.confirm(`Deseja apagar o aluno ${name} ?`)) {
      dispatch(deleteStudent(idStudent));
      const newList = students.filter(item => item.id !== idStudent);
      setStudents(newList);
    }
  }

  return loading ? (
    <Loading />
  ) : (
    <Container>
      <Actions>
        <p>Gerenciando alunos</p>
        <div>
          <Link to="students/create">
            <button type="button">
              <MdAdd size={18} color="#FFFF" />
              <div>CADASTRAR</div>
            </button>
          </Link>

          <input
            name="search"
            type="text"
            placeholder=" Buscar aluno"
            onChange={handleSearch}
          />
          <MdSearch id="lupa" size={20} color="#999999" />
        </div>
      </Actions>
      <Content>
        <StudentsTable>
          <thead>
            <tr>
              <th>NOME</th>
              <th>E-MAIL</th>
              <th id="idadeTh">IDADE</th>
              <th> </th>
            </tr>
          </thead>

          {students.map(student => (
            <tbody key={student.id}>
              <tr>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td id="idadeTd">{student.age}</td>
                <td id="buttons">
                  <Link
                    id="edit"
                    to={{
                      pathname: `/students/edit`,
                      state: {
                        student,
                      },
                    }}
                  >
                    Editar
                  </Link>

                  <button
                    type="button"
                    id="delete"
                    onClick={() => handleDelete(student.id, student.name)}
                  >
                    Apagar
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </StudentsTable>
      </Content>
    </Container>
  );
}
