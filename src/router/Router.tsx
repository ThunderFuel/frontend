import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ErrorBoundary from "./ErrorBoundary";

// TODO: Login operations
interface RouteConfig {
  path: string;
  component: React.LazyExoticComponent<() => JSX.Element>;
  notLoggedIn?: boolean;
  requireLogin?: boolean;
}

const Home = React.lazy(() => import("pages/Home"));
const Login = React.lazy(() => import("pages/Login"));
const NotFound = React.lazy(() => import("pages/NotFound"));

export enum PATHS {
  HOME = "/",
  LOGIN = "/login",
}

const ROUTES: RouteConfig[] = [
  {
    path: PATHS.HOME,
    component: Home,
  },
  {
    path: PATHS.LOGIN,
    component: Login,
    notLoggedIn: true,
  },
];

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {ROUTES.map((route) => {
          const Component = route.component;

          return (
            <Route
              key={route.path}
              path={route.path}
              element={
                <ErrorBoundary>
                  <React.Suspense fallback={null}>
                    <Component />
                  </React.Suspense>
                </ErrorBoundary>
              }
            />
          );
        })}

        <Route
          path="*"
          element={
            <ErrorBoundary>
              <React.Suspense fallback={null}>
                <NotFound />
              </React.Suspense>
            </ErrorBoundary>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
