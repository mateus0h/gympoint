import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '~/store/modules/auth/actions';

import { Container, Content, Profile } from './styles';

import logo from '~/assets/logo-dashboard.svg';

export default function Header() {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="GYM Point" />
          <MenuLink
            activeOnlyWhenExact
            to="/students"
            label="ALUNOS"
            id="menuStudent"
          />
          <MenuLink to="/plans" label="PLANOS" id="menuPlans" />
          <MenuLink to="/enrollments" label="MATRÍCULAS" id="menuEnrollments" />
          <MenuLink
            to="/students/help-orders"
            label=" PEDIDOS DE AUXÍLIO"
            id="menuHelpOrders"
          />
        </nav>
        <aside>
          <Profile>
            <div>
              <p>{profile.name}</p>
              <button id="exit" type="button" onClick={handleSignOut}>
                Sair do sistema
              </button>
            </div>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}

function MenuLink({ label, to, activeOnlyWhenExact, id }) {
  const match = useRouteMatch({
    path: to,
    exact: activeOnlyWhenExact,
  });
  return (
    <Link id={id} className={match ? 'active' : ''} to={to}>
      {label}
    </Link>
  );
}
