import React from "react";
import { PATHS } from "./paths";
import DropLayout from "pages/Layout/DropLayout";
import Layout from "pages/Layout/Layout";

const DropDetail = React.lazy(() => import("pages/Drop/Detail"));
const DropEdit = React.lazy(() => import("pages/Drop/Edit"));

export default [
  {
    path: PATHS.DROP_DETAIL,
    component: DropDetail,
    layout: DropLayout,
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
