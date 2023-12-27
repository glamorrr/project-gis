import { Stack } from '@mui/material';
import GuestGuard from 'src/auth/GuestGuard';
import { Page } from 'src/components/page';
import useResponsive from 'src/hooks/useResponsive';
import { AuthIllustration, RegisterForm } from 'src/sections/auth';

export default function RegisterPage() {
  const mdUp = useResponsive('up', 'md');

  return (
    <GuestGuard>
      <Page title="Register">
        <Stack direction="row" justifyContent="center">
          {mdUp && <AuthIllustration />}
          <RegisterForm />
        </Stack>
      </Page>
    </GuestGuard>
  );
}
