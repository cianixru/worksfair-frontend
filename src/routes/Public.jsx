import Home from '../containers/Home';
import SearchResult from '../containers/SearchResult';
import ProfilePage from '../containers/ProfilePage';
import NotFound from '../containers/NotFound';
import ServerError from '../containers/ServerError';

const publicRoutes = [
  {
    exact: true,
    path: '/',
    component: Home,
  },
  {
    exact: true,
    path: '/home',
    component: Home,
  },
  {
    exact: true,
    path: '/search',
    component: SearchResult,
  },
  {
    exact: true,
    path: '/profile/:username',
    component: ProfilePage,
  },
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
