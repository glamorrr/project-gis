import { Container, Typography } from '@mui/material';
import DashboardLayout from '../../layouts/dashboard';
import { useSettingsContext } from '../../components/settings';
import { Page } from 'src/components/page';
import RoleBasedGuard from 'src/auth/RoleBasedGuard';
import { ID_ROLE_SUPERADMIN } from 'src/config';
import { OrderTable } from 'src/sections/order';

// ----------------------------------------------------------------------

OrderListPage.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>
    <RoleBasedGuard hasContent roles={[ID_ROLE_SUPERADMIN]}>
      {page}
    </RoleBasedGuard>
  </DashboardLayout>
);

// ----------------------------------------------------------------------

export default function OrderListPage() {
  const { themeStretch } = useSettingsContext();

  return (
    <Page title="Order List">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant="h3" component="h1" mb="24px">
          Order Management
        </Typography>

        <OrderTable />
      </Container>
    </Page>
  );
}
