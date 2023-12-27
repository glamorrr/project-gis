import { Container, Typography } from '@mui/material';
import DashboardLayout from '../../../layouts/dashboard';
import { useSettingsContext } from '../../../components/settings';
import { Page } from 'src/components/page';
import { UserEdit } from 'src/sections/user';
import { ID_ROLE_SUPERADMIN } from 'src/config';
import RoleBasedGuard from 'src/auth/RoleBasedGuard';

// ----------------------------------------------------------------------

UserEditPage.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>
    <RoleBasedGuard hasContent roles={[ID_ROLE_SUPERADMIN]}>
      {page}
    </RoleBasedGuard>
  </DashboardLayout>
);

// ----------------------------------------------------------------------

export default function UserEditPage() {
  const { themeStretch } = useSettingsContext();

  return (
    <Page title="Edit User">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant="h3" component="h1" mb="24px">
          Edit User
        </Typography>

        <UserEdit />
      </Container>
    </Page>
  );
}
