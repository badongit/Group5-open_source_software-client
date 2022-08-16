import Login from '@pages/Login';
import Friends from './pages/Friends';
import Home from './pages/Home';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Settings from './pages/Settings';
import RouteApp from './router/Routes';

const routes = [
  {
    path: '/auth/login',
    element: <Login />
  },
  {
    path: '/auth/forgot-password',
    element: <ForgotPassword />
  },
  {
    path: '/auth/reset-password/:token',
    element: <ResetPassword />
  },
  {
    path: '/',
    element: <RouteApp />,
    children: [
      { path: '/', element: <Home /> },
      { path: 'friends', element: <Friends /> },
      { path: 'settings', element: <Settings /> },
    ],
  },
];
export default routes;