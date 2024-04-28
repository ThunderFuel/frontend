import React from "react";
import { PATHS } from "./paths";
import Layout from "pages/Layout/Layout";

const DropDetail = React.lazy(() => import("pages/Drop/Detail"));
const DropEdit = React.lazy(() => import("pages/Drop/Edit"));
const Drops = React.lazy(() => import("pages/Drop/List/List"));

export default [
  {
    path: PATHS.DROPS,
    component: Drops,
    layout: Layout,
    layoutProps: {
      hiddenFooter: true,
    },
  },
  {
    path: PATHS.DROP_DETAIL,
    component: DropDetail,
    layout: Layout,
    layoutProps: {
      hiddenFooter: true,
    },
  },
  {
    path: PATHS.DROP_EDIT,
    component: DropEdit,
    layout: Layout,
    layoutProps: {
      hiddenFooter: true,
    },
  },
];
