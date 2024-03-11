import React from "react";
import { PATHS } from "./paths";
import Layout from "pages/Layout/Layout";
import DropRoute from "./drop";

const Landing = React.lazy(() => import("pages/Landing"));
const Login = React.lazy(() => import("pages/Login"));
const Marketplace = React.lazy(() => import("pages/Marketplace"));
const Rankings = React.lazy(() => import("pages/Rankings"));
const NFTDetails = React.lazy(() => import("pages/NFTDetails"));

const Collection = React.lazy(() => import("pages/Collection"));
const CollectionItems = React.lazy(() => import("pages/Collection/pages/Items/index"));
const CollectionActivity = React.lazy(() => import("pages/Collection/pages/Activity/index"));
const Profile = React.lazy(() => import("pages/Profile"));
const User = React.lazy(() => import("pages/User/User"));
const ProfileCollection = React.lazy(() => import("pages/Profile/pages/Collection"));
const ProfileActivity = React.lazy(() => import("pages/Profile/pages/Activity/Activity"));
const ProfileOffer = React.lazy(() => import("pages/Profile/pages/Offer/Offer"));
const ProfileLiked = React.lazy(() => import("pages/Profile/pages/Liked"));
const BulkListing = React.lazy(() => import("pages/BulkListing"));
const Settings = React.lazy(() => import("pages/Settings"));
const SettingsProfile = React.lazy(() => import("pages/Settings/pages/Profile/Profile"));
const Beta = React.lazy(() => import("pages/Beta"));
const Create = React.lazy(() => import("pages/Create"));
const CreateCollections = React.lazy(() => import("pages/Create/pages/Collections"));
const CreateOverview = React.lazy(() => import("pages/Create/pages/Overview"));
const CreateCollectors = React.lazy(() => import("pages/Create/pages/Collectors"));
const EditCollection = React.lazy(() => import("pages/EditCollection"));
const UploadArtwork = React.lazy(() => import("pages/UploadArtwork"));

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
  isResponsive?: boolean;
}

export const ROUTES: RouteConfig[] = [
  {
    path: PATHS.HOME,
    component: Landing,
    notLoggedIn: true,
    isResponsive: true,
  },
  {
    path: PATHS.MARKETPLACE,
    component: Marketplace,
    layout: Layout,
    isResponsive: true,
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
    layoutProps: {
      hiddenFooter: true,
    },
    isResponsive: true,
  },
  {
    path: PATHS.LOGIN,
    component: Login,
    layout: Layout,
    notLoggedIn: true,
    isResponsive: true,
  },
  {
    path: PATHS.RANKINGS,
    component: Rankings,
    layout: Layout,
    isResponsive: true,
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
    children: [
      {
        path: PATHS.PROFILE_OWNED,
        component: ProfileCollection,
      },
      {
        path: PATHS.PROFILE_ACTIVITY,
        component: ProfileActivity,
      },
      {
        path: PATHS.PROFILE_OFFER,
        component: ProfileOffer,
      },
      {
        path: PATHS.PROFILE_LIKED,
        component: ProfileLiked,
      },
    ],
  },
  {
    path: PATHS.BULK_LISTING,
    component: BulkListing,
    layout: Layout,
    layoutProps: {
      hiddenFooter: true,
    },
  },
  {
    path: PATHS.SETTINGS,
    component: Settings,
    layout: Layout,
    children: [
      {
        path: PATHS.SETTINGS_PROFILE,
        component: SettingsProfile,
      },
      {
        path: PATHS.SETTINGS_NOTIFICATION,
        component: ProfileOffer,
      },
    ],
    layoutProps: {
      hiddenFooter: true,
    },
  },
  {
    path: PATHS.USER,
    component: User,
    layout: Layout,
    children: [
      {
        path: PATHS.USER_OWNED,
        component: ProfileCollection,
      },
      {
        path: PATHS.USER_ACTIVITY,
        component: ProfileActivity,
      },
      {
        path: PATHS.USER_OFFER,
        component: ProfileOffer,
      },
      {
        path: PATHS.USER_LIKED,
        component: ProfileLiked,
      },
    ],
    layoutProps: {
      hiddenFooter: true,
    },
  },
  {
    path: PATHS.BETA,
    component: Beta,
  },
  {
    path: PATHS.CREATE,
    layout: Layout,
    component: Create,
    children: [
      {
        path: PATHS.CREATE_OVERVIEW,
        component: CreateOverview,
      },
      {
        path: PATHS.CREATE_COLLECTIONS,
        component: CreateCollections,
      },
      {
        path: PATHS.CREATE_COLLECTORS,
        component: CreateCollectors,
      },
    ],
  },
  {
    path: PATHS.COLLECTION_EDIT,
    layout: Layout,
    component: EditCollection,
    layoutProps: {
      hiddenFooter: true,
    },
  },
  {
    path: PATHS.UPLOAD_ARTWORK,
    layout: Layout,
    component: UploadArtwork,
    layoutProps: {
      hiddenFooter: true,
    },
  },
  {
    path: PATHS.CREATE,
    layout: Layout,
    component: Create,
    children: [
      {
        path: PATHS.CREATE_OVERVIEW,
        component: CreateOverview,
      },
      {
        path: PATHS.CREATE_COLLECTIONS,
        component: CreateCollections,
      },
      {
        path: PATHS.CREATE_COLLECTORS,
        component: CreateCollectors,
      },
    ],
  },
  {
    path: PATHS.COLLECTION_EDIT,
    layout: Layout,
    component: EditCollection,
    layoutProps: {
      hiddenFooter: true,
    },
  },
  {
    path: PATHS.UPLOAD_ARTWORK,
    layout: Layout,
    component: UploadArtwork,
    layoutProps: {
      hiddenFooter: true,
    },
  },
  ...DropRoute,
];
