import { Box, Stack, Typography, useTheme, Link as MUILink, Alert, MenuItem } from '@mui/material';
import NextLink from 'next/link';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { useForm } from 'react-hook-form';
import { RHFSelect, RHFTextField } from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/FormProvider';
import * as Yup from 'yup';
import { SALUTATIONS, USER_BUSINESSES } from 'src/config';
import { useAuthContext } from 'src/auth/useAuthContext';
import { phoneFormat } from 'src/utils/phone';

// ----------------------------------------------------------------------

const RegisterSchema = Yup.object().shape({
  email: Yup.string().email('Email must be a valid email address').required('Email is required'),
  name: Yup.string().required('Name is required'),
  phone: Yup.string()
    .min(8, 'Phone Number is invalid. Format: 08xxxxxxxxx')
    .max(14, 'Phone Number is invalid. Format: 08xxxxxxxxx')
    .required('Phone Number is required')
    .matches(phoneFormat, 'Phone Number is invalid. Format: 08xxxxxxxxx'),
  title: Yup.number().required('Salutation is required'),
  category: Yup.number().required('The business is required'),
  company: Yup.string().required('Company is required'),
  message: Yup.string().required('Message is required'),
});

type FormValuesProps = {
  email: string;
  name: string;
  phone: string;
  company: string;
  title: number;
  category: number;
  password: string;
  message: string;
  afterSubmit?: string;
};

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const theme = useTheme();
  const { register } = useAuthContext();
  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(RegisterSchema),
    defaultValues: {
      email: '',
      name: '',
      phone: '',
      company: '',
      title: undefined,
      category: undefined,
      password: 'initialpassword',
      message: '',
    },
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    try {
      await register(data);
      reset();
    } catch (error) {
      setError('afterSubmit', { ...error, message: 'Register fail' });
    }
  };

  return (
    <Stack
      minHeight="100vh"
      px={{ xs: '16px', md: '48px' }}
      py="48px"
      direction="column"
      alignItems="center"
      justifyContent="center"
      width="600px"
    >
      <Typography variant="h1" fontSize="24px !important">
        Register
      </Typography>
      <Typography variant="body1" color={theme.palette.text.secondary} mt="8px">
        Already have an account?&nbsp;
        <NextLink href="/auth/login" passHref>
          <MUILink>Login</MUILink>
        </NextLink>
      </Typography>
      <Box mt="24px">
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          {!!errors.afterSubmit && (
            <Alert severity="error" sx={{ mb: '30px' }}>
              {errors.afterSubmit?.message}
            </Alert>
          )}
          {isSubmitSuccessful && (
            <Alert severity="success" sx={{ mb: '30px' }}>
              Register success
            </Alert>
          )}
          <RHFSelect name="category" label="The Business">
            {USER_BUSINESSES.map(({ id, name }) => (
              <MenuItem key={id} value={id}>
                {name}
              </MenuItem>
            ))}
          </RHFSelect>
          <RHFSelect name="title" label="Salutation" formControlProps={{ sx: { mt: '20px' } }}>
            {SALUTATIONS.map(({ id, name }) => (
              <MenuItem key={id} value={id}>
                {name}
              </MenuItem>
            ))}
          </RHFSelect>
          <RHFTextField name="name" label="Name" placeholder="Name" sx={{ mt: '20px' }} />
          <RHFTextField name="email" label="Email" placeholder="Email" sx={{ mt: '20px' }} />
          <RHFTextField
            name="phone"
            label="Phone Number"
            placeholder="Phone Number"
            sx={{ mt: '20px' }}
          />
          <RHFTextField name="company" label="Company" placeholder="Company" sx={{ mt: '20px' }} />
          <RHFTextField
            multiline
            minRows={2}
            name="message"
            label="Message"
            placeholder="Message"
            sx={{ mt: '20px' }}
          />

          <LoadingButton
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            loading={isSubmitting}
            sx={{ mt: '32px' }}
          >
            Register
          </LoadingButton>
        </FormProvider>
      </Box>
    </Stack>
  );
}
