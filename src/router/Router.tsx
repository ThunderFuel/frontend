import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ErrorBoundary from "./ErrorBoundary";
import { ROUTES } from "./config";

const NotFound = React.lazy(() => import("pages/NotFound"));

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {ROUTES.map((route) => {
          const Component = route.component;
          const Layout = route.layout ?? React.Fragment;

          return (
            <Route
              key={route.path}
              path={route.path}
              element={
                <ErrorBoundary>
                  <Layout>
                    <React.Suspense fallback={null}>
                      <Component />
                    </React.Suspense>
                  </Layout>
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
