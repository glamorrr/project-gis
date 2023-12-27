import { Container, Typography } from '@mui/material';
import DashboardLayout from '../../../layouts/dashboard';
import { useSettingsContext } from '../../../components/settings';
import { Page } from 'src/components/page';
import { TeamEdit } from 'src/sections/team';
import RoleBasedGuard from 'src/auth/RoleBasedGuard';
import { ID_ROLE_SUPERADMIN } from 'src/config';

// ----------------------------------------------------------------------

TeamEditPage.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>
    <RoleBasedGuard hasContent roles={[ID_ROLE_SUPERADMIN]}>
      {page}
    </RoleBasedGuard>
  </DashboardLayout>
);

// ----------------------------------------------------------------------

export default function TeamEditPage() {
  const { themeStretch } = useSettingsContext();

  return (
    <Page title="Edit Team">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant="h3" component="h1" mb="24px">
          Edit Team
        </Typography>

        <TeamEdit />
      </Container>
    </Page>
  );
}
