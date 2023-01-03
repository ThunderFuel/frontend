import React from "react";
import { PATHS } from "./paths";
import Layout from "pages/Layout/Layout";

const Landing = React.lazy(() => import("pages/Landing"));
const Login = React.lazy(() => import("pages/Login"));
const Marketplace = React.lazy(() => import("pages/Marketplace"));
const Collection = React.lazy(() => import("pages/Collection"));
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
  },
  {
    path: PATHS.MARKETPLACE,
    component: Marketplace,
    layout: Layout,
  },
  {
    path: PATHS.COLLECTION,
    component: Collection,
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
