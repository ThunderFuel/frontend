import React from "react";
import { PATHS } from "./paths";
import Layout from "../../pages/Layout";

const Home = React.lazy(() => import("pages/Home"));
const Login = React.lazy(() => import("pages/Login"));

export interface RouteConfig {
  path: string;
  component: React.LazyExoticComponent<() => JSX.Element>;
  layout?: React.ElementType;
  notLoggedIn?: boolean;
  requireLogin?: boolean;
}

export const ROUTES: RouteConfig[] = [
  {
    path: PATHS.HOME,
    component: Home,
    layout: Layout,
  },
  {
    path: PATHS.LOGIN,
    component: Login,
    layout: Layout,
    notLoggedIn: true,
  },
];
