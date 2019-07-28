import Signup from '../components/Auth/Signup';
import Signin from '../components/Auth/Signin';
import ResetPassword from '../components/Auth/ResetPassword';
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
    exact: true,
    path: '/reset-password',
    component: composeLayout(ResetPassword),
  },
  {
    exact: false,
    path: '/logout',
    component: Logout,
  },
]

export default authRoutes;
