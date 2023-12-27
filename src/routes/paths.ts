function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  login: '/auth/login',
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  order: {
    root: '/order',
    list: '/order/list',
    new: '/order/create',
    edit: (id: string) => `/order/${id}/edit`,
    detail: (id: string) => `/order/${id}`,
  },
  user: {
    root: '/user',
    list: '/user/list',
    new: '/user/create',
    edit: (id: string) => `/user/${id}/edit`,
  },
  team: {
    root: '/team',
    new: '/team/create',
    list: '/team/list',
    edit: (id: string) => `/team/${id}/edit`,
  },
  one: path(ROOTS_DASHBOARD, '/one'),
  two: path(ROOTS_DASHBOARD, '/two'),
  three: path(ROOTS_DASHBOARD, '/three'),
};
