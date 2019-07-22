import Signup from '../components/Auth/Signup';
import Signin from '../components/Auth/Signin';
import { composeAuthLayout } from '../layouts/index';
import Logout from '../components/Auth/Logout';

const composeLayout = Component => composeAuthLayout(Component);

const authRoutes = [
  {
    exact: true,
    path: '/signup',
    component: composeLayout(Signup),
  },
  {
    exact: true,
    path: '/login',
    component: composeLayout(Signin),
  },
  {
    exact: false,
    path: '/logout',
    component: Logout,
  },
]

export default authRoutes;
