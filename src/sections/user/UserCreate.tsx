import {
  Button,
  Divider,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  Stack,
  useTheme,
} from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { RHFSelect, RHFTextField } from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/FormProvider';
import Iconify from 'src/components/iconify';
import NextLink from 'next/link';
import { PATH_DASHBOARD } from 'src/routes/paths';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'src/redux/store';
import { createUser, getUsers } from 'src/redux/slices/users';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ID_ROLE_CUSTOMER, SALUTATIONS, USER_BUSINESSES, USER_ROLES } from 'src/config';
import { phoneFormat } from 'src/utils/phone';
import { useSnackbar } from 'notistack';
import { LoadingButton } from '@mui/lab';

// ----------------------------------------------------------------------

export type FormValuesProps = {
  title: number;
  role: number;
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  category?: number;
};

const UserCreateSchema = Yup.object().shape({
  title: Yup.number().required('Salutation is required'),
  role: Yup.number().required('Role is required'),
  category: Yup.number().when('role', {
    is: (role: number) => role === ID_ROLE_CUSTOMER,
    then: Yup.number().required('The business is required'),
  }),
  name: Yup.string().required('Name is required'),
  email: Yup.string().required('Email is required').email('Email must be a valid email address'),
  phone: Yup.string()
    .min(8, 'Phone Number is invalid. Format: 08xxxxxxxxx')
    .max(14, 'Phone Number is invalid. Format: 08xxxxxxxxx')
    .required('Phone Number is required')
    .matches(phoneFormat, 'Phone Number is invalid. Format: 08xxxxxxxxx'),
  password: Yup.string()
    .required('Password must be at least 6 characters long')
    .min(6, 'Password must be at least 6 characters long'),
  confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Password does not match'),
});

// ----------------------------------------------------------------------

export default function UserCreate() {
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const { isLoadingCreateEdit } = useSelector((state) => state.user);
  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(UserCreateSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    },
  });
  const { enqueueSnackbar } = useSnackbar();

  const { reset, handleSubmit, watch } = methods;
  const isCustomer = watch('role') === ID_ROLE_CUSTOMER;

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

  const onSubmit = async (data: FormValuesProps) => {
    try {
      await dispatch(createUser(data)).unwrap();
      reset();
      enqueueSnackbar('User created');
      // refetch list
      await dispatch(getUsers({ page: 0, limit: 10 }));
      router.push(PATH_DASHBOARD.user.list);
    } catch (error) {
      enqueueSnackbar('Cannot create user. Please try again later', { variant: 'error' });
    }
  };

  return (
    <Paper elevation={2}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing="24px" p={4}>
          <RHFSelect name="role" label="Role">
            {USER_ROLES.map(({ id, name }) => (
              <MenuItem key={id} value={id}>
                {name}
              </MenuItem>
            ))}
          </RHFSelect>
          {isCustomer && (
            <RHFSelect name="category" label="The Business">
              {USER_BUSINESSES.map(({ id, name }) => (
                <MenuItem key={id} value={id}>
                  {name}
                </MenuItem>
              ))}
            </RHFSelect>
          )}
          <RHFSelect name="title" label="Salutation">
            {SALUTATIONS.map(({ id, name }) => (
              <MenuItem key={id} value={id}>
                {name}
              </MenuItem>
            ))}
          </RHFSelect>
          <RHFTextField label="Name" placeholder="Name" name="name" />
          <RHFTextField label="Phone Number" placeholder="Phone Number" name="phone" />
          <RHFTextField label="Email" placeholder="Email" name="email" />
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
          />
          <RHFTextField
            name="confirmPassword"
            label="Confirm Password"
            placeholder="Confirm Password"
            type={showConfirmPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowConfirmPassword}
                    edge="end"
                    sx={{ color: theme.palette.text.secondary }}
                  >
                    {showConfirmPassword ? (
                      <Iconify icon="ic:baseline-visibility-off" width={24} />
                    ) : (
                      <Iconify icon="ic:baseline-visibility" width={24} />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>
        <Divider />
        <Stack justifyContent="flex-end" spacing="16px" direction="row" px={4} py={2}>
          <NextLink href={PATH_DASHBOARD.user.list} passHref>
            <Button color="secondary" variant="outlined">
              Cancel
            </Button>
          </NextLink>
          <LoadingButton
            loading={isLoadingCreateEdit}
            color="secondary"
            variant="contained"
            type="submit"
          >
            Create
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Paper>
  );
}
