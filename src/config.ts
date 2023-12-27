// routes
import { PATH_DASHBOARD } from './routes/paths';

// API
// ----------------------------------------------------------------------

export const HOST_API_KEY = process.env.HOST_API_KEY || '';

export const FIREBASE_API = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APPID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

export const COGNITO_API = {
  userPoolId: process.env.AWS_COGNITO_USER_POOL_ID,
  clientId: process.env.AWS_COGNITO_CLIENT_ID,
};

export const AUTH0_API = {
  clientId: process.env.AUTH0_CLIENT_ID,
  domain: process.env.AUTH0_DOMAIN,
};

export const MAPBOX_API = process.env.MAPBOX_API;

// ROOT PATH AFTER LOGIN SUCCESSFUL
export const PATH_AFTER_LOGIN = PATH_DASHBOARD.one;

// LAYOUT

export const HEADER = {
  H_MOBILE: 64,
  H_MAIN_DESKTOP: 88,
  H_DASHBOARD_DESKTOP: 92,
  H_DASHBOARD_DESKTOP_OFFSET: 92 - 32,
};

export const NAV = {
  W_BASE: 260,
  W_DASHBOARD: 210,
  W_DASHBOARD_MINI: 88,
  //
  H_DASHBOARD_ITEM: 48,
  H_DASHBOARD_ITEM_SUB: 36,
  //
  H_DASHBOARD_ITEM_HORIZONTAL: 32,
};

export const ICON = {
  NAV_ITEM: 24,
  NAV_ITEM_HORIZONTAL: 22,
  NAV_ITEM_MINI: 22,
};

// OTHERS
// ----------------------------------------------------------------------
export const refreshTokenTimeMinutes = 60;
export const SALUTATIONS = [
  { id: 1, name: 'Mr.' },
  { id: 2, name: 'Mrs.' },
  { id: 3, name: 'Ms.' },
];
export const USER_ROLES = [
  { id: 2, name: 'Creator' },
  { id: 3, name: 'Approver' },
  { id: 5, name: 'Customer' },
  { id: 6, name: 'Finance' },
];
export const ID_ROLE_SUPERADMIN = 1;
export const ID_ROLE_CUSTOMER = 5;

export const ORDER_TYPES = [
  { id: 1, name: 'Program' },
  { id: 2, name: 'Product' },
];

export const USER_BUSINESSES = [
  { id: 1, name: 'Personal' },
  { id: 2, name: 'Commercial' },
  { id: 3, name: 'Company' },
  { id: 4, name: 'Partnership' },
  { id: 5, name: 'Other' },
];
