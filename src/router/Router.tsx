import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ErrorBoundary from "./ErrorBoundary";
import AuthorizationPageBase from "./AuthorizationPage";
import { RouteConfig, ROUTES } from "./config";

const NotFound = React.lazy(() => import("pages/NotFound"));

const getRoute = (route: RouteConfig) => {
  const Component = route.component;
  const Layout = route.layout ?? React.Fragment;
  const AuthorizationPage = route.notLoggedIn ? React.Fragment : AuthorizationPageBase;

  return (
    <Route
      key={route.path}
      path={route.path}
      element={
        <ErrorBoundary>
          <AuthorizationPage>
            <Layout {...route.layoutProps}>
              <React.Suspense fallback={null}>
                <Component />
              </React.Suspense>
            </Layout>
          </AuthorizationPage>
        </ErrorBoundary>
      }
    >
      {route?.children?.map((child) => getRoute(child))}
    </Route>
  );
};
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {ROUTES.map((route) => getRoute(route))}

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
