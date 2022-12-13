import React from "react";
import { PATHS } from "./paths";
import Layout from "../../pages/Layout";
import LayoutLanding from "../../pages/Layout/LayoutLanding";

const Landing = React.lazy(() => import("pages/Landing"));
const Login = React.lazy(() => import("pages/Login"));
const Marketplace = React.lazy(() => import("pages/Marketplace"));
const Rankings = React.lazy(() => import("pages/Rankings"));

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
    component: Landing,
    layout: LayoutLanding,
  },
  {
    path: PATHS.MARKETPLACE,
    component: Marketplace,
    layout: Layout,
  },
  {
    path: PATHS.LOGIN,
    component: Login,
    layout: Layout,
    notLoggedIn: true,
  },
  {
    path: PATHS.RANKINGS,
    component: Rankings,
    layout: Layout,
  },
];
