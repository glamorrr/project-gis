import { Container, Typography } from '@mui/material';
import DashboardLayout from '../../layouts/dashboard';
import { useSettingsContext } from '../../components/settings';
import { Page } from 'src/components/page';
import RoleBasedGuard from 'src/auth/RoleBasedGuard';
import { ID_ROLE_SUPERADMIN } from 'src/config';
import { DashboardSummary } from 'src/sections/dashboard-summary';

// ----------------------------------------------------------------------

DashboardPage.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>
    <RoleBasedGuard hasContent roles={[ID_ROLE_SUPERADMIN]}>
      {page}
    </RoleBasedGuard>
  </DashboardLayout>
);

// ----------------------------------------------------------------------

export default function DashboardPage() {
  const { themeStretch } = useSettingsContext();

  return (
    <Page title="Dashboard">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant="h3" component="h1" mb="24px">
          Dashboard
        </Typography>

        <DashboardSummary />
      </Container>
    </Page>
  );
}
