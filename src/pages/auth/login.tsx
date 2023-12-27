import { Stack } from '@mui/material';
import GuestGuard from 'src/auth/GuestGuard';
import { Page } from 'src/components/page';
import useResponsive from 'src/hooks/useResponsive';
import { AuthIllustration } from 'src/sections/auth';
import LoginForm from 'src/sections/auth/LoginForm';

export default function LoginPage() {
  const mdUp = useResponsive('up', 'md');

  return (
    <GuestGuard>
      <Page title="Login">
        <Stack direction="row" justifyContent="center">
          {mdUp && <AuthIllustration />}
          <LoginForm />
        </Stack>
      </Page>
    </GuestGuard>
  );
}
