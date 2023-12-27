import { Container, Typography } from '@mui/material';
import DashboardLayout from 'src/layouts/dashboard';
import { useSettingsContext } from 'src/components/settings';
import { Page } from 'src/components/page';
import { OrderEdit } from 'src/sections/order';
import RoleBasedGuard from 'src/auth/RoleBasedGuard';
import { ID_ROLE_SUPERADMIN } from 'src/config';

// ----------------------------------------------------------------------

OrderEditPage.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>
    <RoleBasedGuard hasContent roles={[ID_ROLE_SUPERADMIN]}>
      {page}
    </RoleBasedGuard>
  </DashboardLayout>
);

// ----------------------------------------------------------------------

export default function OrderEditPage() {
  const { themeStretch } = useSettingsContext();

  return (
    <Page title="Edit Order">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant="h3" component="h1" mb="24px">
          Edit Order
        </Typography>

        <OrderEdit />
      </Container>
    </Page>
  );
}
