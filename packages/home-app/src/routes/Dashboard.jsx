import CreateWebpage from '../containers/CreateWebpage';
import ListWebpages from '../containers/ListWebpages';
import UpdateWebpage from '../containers/UpdateWebpage';
import { composeDashboardLayout } from '../layouts/index';
import EditProfile from '../containers/EditProfile';

const composeLayout = Component => composeDashboardLayout(Component);

const dashboardRoutes = [
  {
    exact: true,
    path: '/dashboard/:username/business/new/basic-info',
    component: composeLayout(CreateWebpage),
  },
  {
    exact: true,
    path: '/dashboard/:username/business/new/contact-info',
    component: composeLayout(CreateWebpage),
  },
  {
    exact: true,
    path: '/dashboard/:username/business/new/gallery',
    component: composeLayout(CreateWebpage),
  },
  {
    exact: true,
    path: '/dashboard/:username/business/new/offerings',
    component: composeLayout(CreateWebpage),
  },
  {
    exact: true,
    path: '/dashboard/:username/business/edit/:subDomainName',
    component: composeLayout(UpdateWebpage),
  },
  {
    exact: true,
    path: '/dashboard/:username/businesses',
    component: composeLayout(ListWebpages),
  },
  {
    exact: true,
    path: '/dashboard/:username/profile',
    component: composeLayout(EditProfile),
  },
];

export default dashboardRoutes;
