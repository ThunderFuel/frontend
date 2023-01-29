import React from "react";
import { PATHS } from "./paths";
import Layout from "pages/Layout/Layout";

const Landing = React.lazy(() => import("pages/Landing"));
const Login = React.lazy(() => import("pages/Login"));
const Marketplace = React.lazy(() => import("pages/Marketplace"));
const Rankings = React.lazy(() => import("pages/Rankings"));
const NFTDetails = React.lazy(() => import("pages/NFTDetails"));

const Collection = React.lazy(() => import("pages/Collection"));
const CollectionItems = React.lazy(() => import("pages/Collection/pages/Items/index"));
const CollectionActivity = React.lazy(() => import("pages/Collection/pages/Activity/index"));
const Profile = React.lazy(() => import("pages/Profile"));

export interface RouteConfig {
  path: string;
  component: React.LazyExoticComponent<() => JSX.Element>;
  layout?: React.ElementType;
  layoutProps?: {
    hiddenFooter: boolean;
  };
  notLoggedIn?: boolean;
  requireLogin?: boolean;
  children?: RouteConfig[];
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
    children: [
      {
        path: PATHS.COLLECTION_ITEMS,
        component: CollectionItems,
      },
      {
        path: PATHS.COLLECTION_ACTIVITY,
        component: CollectionActivity,
      },
    ],
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
  {
    path: PATHS.NFT_DETAILS,
    component: NFTDetails,
    layout: Layout,
    layoutProps: {
      hiddenFooter: true,
    },
  },
  {
    path: PATHS.PROFILE,
    component: Profile,
    layout: Layout,
  },
];
