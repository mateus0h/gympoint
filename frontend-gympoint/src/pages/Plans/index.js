import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { MdAdd } from 'react-icons/md';

import { deletePlan } from '~/store/modules/plan/actions';

import api from '~/services/api';

import { Container, Content, Actions, PlansTable } from './styles';

import { formatPrice } from '~/util/format';
import Loading from '~/components/Loading';

export default function Plans() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    async function loadPlans() {
      const response = await api.get('/plans');

      const data = response.data.map(plan => {
        const priceFormatted = formatPrice(plan.price);

        const durationFormatted =
          plan.duration === 1
            ? `${plan.duration} mês`
            : `${plan.duration} meses`;

        return {
          priceFormatted,
          durationFormatted,
          ...plan,
        };
      });

      setPlans(data);
      setLoading(false);
    }

    loadPlans();
  }, []);

  function handleDelete(idPlan, title) {
    if (window.confirm(`Deseja apagar o plano ${title} ?`)) {
      dispatch(deletePlan(idPlan));
      const newList = plans.filter(item => item.id !== idPlan);
      setPlans(newList);
    }
  }

  return loading ? (
    <Loading />
  ) : (
    <Container>
      <Actions>
        <p>Gerenciado planos</p>
        <div>
          <Link to="plans/create">
            <button type="button">
              <MdAdd size={20} color="#FFFF" />
              <div>CADASTRAR</div>
            </button>
          </Link>
        </div>
      </Actions>
      <Content>
        <PlansTable>
          <thead>
            <tr>
              <th>TÍTULO</th>
              <th className="alignCenter">DURAÇÃO</th>
              <th className="alignCenter">VALOR p/ MÊS</th>
              <th> </th>
            </tr>
          </thead>

          {plans.map(plan => (
            <tbody key={plan.id}>
              <tr>
                <td>{plan.title}</td>
                <td className="alignCenter">{plan.durationFormatted}</td>
                <td className="alignCenter">{plan.priceFormatted}</td>
                <td id="buttons">
                  <Link
                    id="edit"
                    to={{
                      pathname: `/plans/edit`,
                      state: {
                        plan,
                      },
                    }}
                  >
                    Editar
                  </Link>

                  <button
                    type="button"
                    id="delete"
                    onClick={() => handleDelete(plan.id, plan.title)}
                  >
                    Apagar
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </PlansTable>
      </Content>
    </Container>
  );
}
