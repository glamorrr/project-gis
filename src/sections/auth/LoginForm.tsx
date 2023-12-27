import {
  Box,
  Stack,
  Typography,
  useTheme,
  Link as MUILink,
  Alert,
  InputAdornment,
  IconButton,
} from '@mui/material';
import NextLink from 'next/link';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { RHFCheckbox, RHFTextField } from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/FormProvider';
import Iconify from 'src/components/iconify';
import * as Yup from 'yup';
import { useAuthContext } from 'src/auth/useAuthContext';

// ----------------------------------------------------------------------

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Email must be a valid email address').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

type FormValuesProps = {
  email: string;
  password: string;
  afterSubmit?: string;
};

// ----------------------------------------------------------------------

export default function LoginForm() {
  const theme = useTheme();
  const { login } = useAuthContext();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const defaultValues = {
    email: '',
    password: '',
    remember: true,
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    try {
      await login(data.email, data.password);
    } catch (error) {
      reset();
      if (error.code === 401) {
        setError('afterSubmit', { ...error, message: 'Wrong email or password, please try again' });
      } else if (error.code === 400) {
        setError('afterSubmit', { ...error, message: 'Your account logged in on another device' });
      } else {
        setError('afterSubmit', { ...error, message: 'Connection server error' });
      }
    }
  };

  return (
    <Stack
      minHeight="100vh"
      px={{ xs: '16px', md: '48px' }}
      direction="column"
      alignItems="center"
      justifyContent="center"
      width="600px"
    >
      <Typography variant="h1" fontSize="24px !important">
        Login
      </Typography>
      <Typography variant="body1" color={theme.palette.text.secondary} mt="8px">
        Don't have account yet?&nbsp;
        <NextLink href="/auth/register" passHref>
          <MUILink>Register</MUILink>
        </NextLink>
      </Typography>
      <Box mt="24px">
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          {!!errors.afterSubmit && (
            <Alert severity="error" sx={{ mb: '20px' }}>
              {errors.afterSubmit?.message}
            </Alert>
          )}
          <RHFTextField name="email" label="Email" placeholder="Email" />
          <RHFTextField
            name="password"
            label="Password"
            placeholder="Password"
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                    sx={{ color: theme.palette.text.secondary }}
                  >
                    {showPassword ? (
                      <Iconify icon="ic:baseline-visibility-off" width={24} />
                    ) : (
                      <Iconify icon="ic:baseline-visibility" width={24} />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ mt: '20px' }}
          />
          <RHFCheckbox name="remember" label="Remember me" sx={{ mt: '16px' }} />
          <LoadingButton
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            loading={isSubmitting}
            sx={{ mt: '24px' }}
          >
            Login
          </LoadingButton>
        </FormProvider>
      </Box>
    </Stack>
  );
}
