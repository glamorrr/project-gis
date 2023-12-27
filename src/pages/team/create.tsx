import { Container, Typography } from '@mui/material';
import DashboardLayout from '../../layouts/dashboard';
import { useSettingsContext } from '../../components/settings';
import { Page } from 'src/components/page';
import { TeamCreate } from 'src/sections/team';
import RoleBasedGuard from 'src/auth/RoleBasedGuard';
import { ID_ROLE_SUPERADMIN } from 'src/config';

// ----------------------------------------------------------------------

TeamCreatePage.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>
    <RoleBasedGuard hasContent roles={[ID_ROLE_SUPERADMIN]}>
      {page}
    </RoleBasedGuard>
  </DashboardLayout>
);

// ----------------------------------------------------------------------

export default function TeamCreatePage() {
  const { themeStretch } = useSettingsContext();

  return (
    <Page title="Create Team">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant="h3" component="h1" mb="24px">
          Create Team
        </Typography>

        <TeamCreate />
      </Container>
    </Page>
  );
}
