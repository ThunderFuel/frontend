import React, { useMemo } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ErrorBoundary from "./ErrorBoundary";
import AuthorizationPageBase from "./AuthorizationPage";
import { RouteConfig, ROUTES } from "./config";
import MobileWarningPageBase from "./MobileWarningPage";
import LayoutBase from "pages/Layout/Layout";

const NotFound = React.lazy(() => import("pages/NotFound"));

const getRoute = (route: RouteConfig) => {
  const Component = route.component;
  const Layout = route.layout ?? React.Fragment;
  const AuthorizationPage = route.notLoggedIn ? React.Fragment : AuthorizationPageBase;
  const MobileWarningPage = route.isResponsive ? React.Fragment : MobileWarningPageBase;

  return (
    <Route
      key={route.path}
      path={route.path}
      element={
        <ErrorBoundary>
          <MobileWarningPage>
            <AuthorizationPage>
              <Layout {...route.layoutProps}>
                <React.Suspense fallback={null}>
                  <Component />
                </React.Suspense>
              </Layout>
            </AuthorizationPage>
          </MobileWarningPage>
        </ErrorBoundary>
      }
    >
      {route?.children?.map((child) => getRoute(child))}
    </Route>
  );
};

export const EventDispatchLogout = "ThunderFuelDispatchLogout";

const Router = () => {
  React.useEffect(() => {
    const detectPermissionDenied = () => {
      window.location.reload();
    };
    window.addEventListener(EventDispatchLogout, detectPermissionDenied);

    return () => {
      window.removeEventListener(EventDispatchLogout, detectPermissionDenied);
    };
  }, []);

  // Avoid re-rendering
  const routes = useMemo(() => ROUTES.map((route) => getRoute(route)), []);

  return (
    <BrowserRouter>
      <Routes>
        {routes}

        <Route
          path="*"
          element={
            <LayoutBase hiddenFooter={true}>
              <React.Suspense fallback={null}>
                <NotFound />
              </React.Suspense>
            </LayoutBase>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
