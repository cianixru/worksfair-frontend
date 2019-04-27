import React from 'react';
import { render } from 'react-testing-library';
import { BrowserRouter as Router } from 'react-router-dom';

import UserNavItem from './UserNavItem';
import { user } from '../../utils/test-utils/mockData';

test('Test that the UserNavItem displays', () => {
  const links = [
    {
      text: 'Dashboard',
      to: `/dashboard/${user && user.username}`,
      icon: 'fa fa-tachometer',
    },
    {
      text: 'Logout',
      to: '/logout',
      icon: 'fa fa-power-off',
    },
  ];
  const component = render(
    <Router>
      <UserNavItem user={user} links={links} />
    </Router>
  );
  expect(component).toMatchSnapshot();
});
