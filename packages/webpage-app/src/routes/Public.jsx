import NotFound from '../containers/NotFound';
import ServerError from '../containers/ServerError';

const publicRoutes = [
  {
    exact: true,
    path: '/server-error',
    component: ServerError,
  },
  {
    component: NotFound,
  }
];

export default publicRoutes;
