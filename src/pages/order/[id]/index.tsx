import { Container, Typography } from '@mui/material';
import DashboardLayout from '../../../layouts/dashboard';
import { useSettingsContext } from '../../../components/settings';
import { Page } from 'src/components/page';
import RoleBasedGuard from 'src/auth/RoleBasedGuard';
import { ID_ROLE_SUPERADMIN } from 'src/config';
import { OrderDetail } from 'src/sections/order';
import { useSelector } from 'src/redux/store';

// ----------------------------------------------------------------------

OrderDetailPage.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>
    <RoleBasedGuard hasContent roles={[ID_ROLE_SUPERADMIN]}>
      {page}
    </RoleBasedGuard>
  </DashboardLayout>
);

// ----------------------------------------------------------------------

export default function OrderDetailPage() {
  const { themeStretch } = useSettingsContext();
  const { order } = useSelector((state) => state.order);

  return (
    <Page title={order ? order.name : 'Order Detail'}>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant="h3" component="h1" mb="24px">
          Order: {order?.name}
        </Typography>

        <OrderDetail />
      </Container>
    </Page>
  );
}
