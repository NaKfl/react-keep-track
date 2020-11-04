import { Dashboard } from 'app/containers/Dashboard/Loadable';
import { Login } from 'app/containers/Authentication/Loadable';
import { Register } from 'app/containers/Register/Loadable';
import { BoardDetail } from 'app/containers/BoardDetail/Loadable';

export const routes = [
  {
    path: '/dashboard',
    component: Dashboard,
    key: 'dashboard',
  },
];

export const authRoutes = [
  {
    path: '/login',
    component: Login,
    key: 'login',
  },
  {
    path: '/register',
    component: Register,
    key: 'register',
  },
  {
    path: '/dashboard/:id',
    component: BoardDetail,
    key: 'board-detail',
  },
];
