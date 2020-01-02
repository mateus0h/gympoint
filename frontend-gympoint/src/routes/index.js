import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '~/pages/SignIn';

import Students from '~/pages/Students';
import StudentsEdit from '~/pages/Students/edit';
import StudentsCreate from '~/pages/Students/create';
import Plans from '~/pages/Plans';
import PlansCreate from '~/pages/Plans/create';
import PlansEdit from '~/pages/Plans/edit';
import Enrollments from '~/pages/Enrollments';
import EnrollmentsCreate from '~/pages/Enrollments/Create';
import EnrollmentsEdit from '~/pages/Enrollments/Edit';
import HelpOrders from '~/pages/HelpOrders';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/students" component={Students} isPrivate />
      <Route path="/students/create" component={StudentsCreate} isPrivate />
      <Route path="/students/edit" component={StudentsEdit} isPrivate />
      <Route path="/students/help-orders" component={HelpOrders} isPrivate />

      <Route exact path="/plans" component={Plans} isPrivate />
      <Route path="/plans/create" component={PlansCreate} isPrivate />
      <Route path="/plans/edit" component={PlansEdit} isPrivate />

      <Route exact path="/enrollments" component={Enrollments} isPrivate />
      <Route
        path="/enrollments/create"
        component={EnrollmentsCreate}
        isPrivate
      />

      <Route path="/enrollments/edit" component={EnrollmentsEdit} isPrivate />

      <Route axact path="/" component={SignIn} />
    </Switch>
  );
}
