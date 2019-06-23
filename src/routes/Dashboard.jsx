import CreateWebpage from '../containers/CreateWebpage';
import ListWebpages from '../containers/ListWebpages';
import UpdateWebpage from '../containers/UpdateWebpage';
import { composeDashboardLayout } from '../layouts/index';
import EditProfile from '../containers/EditProfile';

const composeLayout = Component => composeDashboardLayout(Component);

const dashboardRoutes = [
  {
    exact: true,
    path: '/dashboard/:username/webpages/new/basic-info',
    component: composeLayout(CreateWebpage),
  },
  {
    exact: true,
    path: '/dashboard/:username/webpages/new/contact-info',
    component: composeLayout(CreateWebpage),
  },
  {
    exact: true,
    path: '/dashboard/:username/webpages/new/gallery',
    component: composeLayout(CreateWebpage),
  },
  {
    exact: true,
    path: '/dashboard/:username/webpages/new/offerings',
    component: composeLayout(CreateWebpage),
  },
  {
    exact: true,
    path: '/dashboard/:username/webpages/edit/:subDomainName',
    component: composeLayout(UpdateWebpage),
  },
  {
    exact: true,
    path: '/dashboard/:username/webpages',
    component: composeLayout(ListWebpages),
  },
  {
    exact: true,
    path: '/dashboard/:username/profile',
    component: composeLayout(EditProfile),
  },
];

export default dashboardRoutes;
