import { PATH_DASHBOARD } from '../../../routes/paths';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

const ICONS = {
  user: <Iconify color="primary" icon="majesticons:user-box-line" />,
  team: <Iconify color="primary" icon="majesticons:users-line" />,
  dashboard: <Iconify color="primary" icon="material-symbols:bar-chart-rounded" />,
  order: <Iconify color="primary" icon="icon-park-outline:transaction-order" />,
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: '',
    items: [
      {
        title: 'Dashboard',
        roles: [1],
        path: PATH_DASHBOARD.root,
        icon: ICONS.dashboard,
      },
      {
        title: 'Order',
        roles: [1],
        path: PATH_DASHBOARD.order.root,
        icon: ICONS.order,
      },
      {
        title: 'User',
        roles: [1],
        path: PATH_DASHBOARD.user.root,
        icon: ICONS.user,
      },
      {
        title: 'Team',
        roles: [1],
        path: PATH_DASHBOARD.team.root,
        icon: ICONS.team,
      },
    ],
  },
];

export default navConfig;
