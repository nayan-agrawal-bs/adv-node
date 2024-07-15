import { ReactElement, lazy, Suspense } from 'react';
import { RouteObject } from 'react-router-dom';
import routes from 'shared/config/routes';

import LayoutWrapper from '../components/LayoutWrapper';
import PrivateRoute from './PrivateRoute';

// Lazy loaded components
const LoginPage = lazy(() => import('../pages/login'));
const ForgotPassword = lazy(() => import('../pages/forgotPassword'));
const VerifyAccount = lazy(() => import('../pages/verifyAccount'));
const SignUpPage = lazy(() => import('../pages/signup'));
const Home = lazy(() => import('../pages/home'));
const Logout = lazy(() => import('../pages/logout'));

interface BaseRoute {
  path: string;
  element: ReactElement;
  layout?: string;
  children?: BaseRoute[];
}

interface AuthRoute extends BaseRoute {
  path: string;
  layout?: undefined;
}

type AppRoute = BaseRoute | AuthRoute;

const defaultRoutes: AppRoute[] = [
  {
    path: '/',
    element: <PrivateRoute />,
    layout: 'DefaultLayout',
    children: [
      {
        path: routes.home,
        element: <Home />,
      },
    ],
  },
  {
    path: routes.login,
    element: <LoginPage />,
    layout: 'BlankLayout',
  },
  {
    path: routes.forgotpassword,
    element: <ForgotPassword />,
    layout: 'BlankLayout',
  },
  {
    path: routes.verifyaccount,
    element: <VerifyAccount />,
    layout: 'BlankLayout',
  },
  {
    path: routes.singup,
    element: <SignUpPage />,
    layout: 'BlankLayout',
  },
  {
    path: routes.logout,
    element: <Logout />,
    layout: 'BlankLayout',
  },
];

const transformRoutes = (routes: AppRoute[]): RouteObject[] => {
  return routes.map(route => {
    const { path, element, layout, children } = route;
    return {
      path,
      element: layout ? (
        <LayoutWrapper layout={layout}>
          <Suspense fallback={<div>Loading...</div>}>{element}</Suspense>
        </LayoutWrapper>
      ) : (
        <Suspense fallback={<div>Loading...</div>}>{element}</Suspense>
      ),
      children: children ? transformRoutes(children) : undefined,
    };
  });
};

export const appRoutes = transformRoutes(defaultRoutes);
