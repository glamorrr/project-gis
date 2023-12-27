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
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { RHFSelect, RHFTextField } from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/FormProvider';
import Iconify from 'src/components/iconify';
import NextLink from 'next/link';
import { PATH_DASHBOARD } from 'src/routes/paths';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'src/redux/store';
import { editUser, getUserDetail, getUsers } from 'src/redux/slices/users';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ID_ROLE_CUSTOMER, SALUTATIONS, USER_BUSINESSES } from 'src/config';
import { phoneFormat } from 'src/utils/phone';
import { useSnackbar } from 'notistack';
import { LoadingButton } from '@mui/lab';

// ----------------------------------------------------------------------

export type FormValuesProps = {
  name: string;
  phone: string;
  title: number;
  role?: number;
  category?: number;
  password?: string;
  confirmPassword?: string;
};

const UserEditSchema = Yup.object().shape({
  role: Yup.number(),
  title: Yup.number().min(0, 'Salutation is required').required('Salutation is required'),
  category: Yup.number().when('role', {
    is: (role: number) => role === ID_ROLE_CUSTOMER,
    then: Yup.number().min(0, 'The business is required').required('The business is required'),
  }),
  name: Yup.string().required('Name is required'),
  phone: Yup.string()
    .min(8, 'Phone Number is invalid. Format: 08xxxxxxxxx')
    .max(14, 'Phone Number is invalid. Format: 08xxxxxxxxx')
    .required('Phone Number is required')
    .matches(phoneFormat, 'Phone Number is invalid. Format: 08xxxxxxxxx'),
  password: Yup.string().min(6, 'Password must be at least 6 characters long'),
  confirmPassword: Yup.string().when('password', {
    is: (password: string) => password?.length > 0,
    then: Yup.string()
      .required('Password does not match')
      .oneOf([Yup.ref('password')], 'Password does not match'),
  }),
});

// ----------------------------------------------------------------------

export default function UserEdit() {
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, isLoadingCreateEdit } = useSelector((state) => state.user);
  const defaultValues = useMemo(
    () => ({
      name: user?.name || '',
      phone: user?.phone || '',
      title: user?.title || -1,
      category: user?.category || -1,
      role: user?.role || -1,
    }),
    [user]
  );
  const { enqueueSnackbar } = useSnackbar();
  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(UserEditSchema),
    defaultValues,
  });

  const { reset, handleSubmit, watch, setValue, clearErrors } = methods;
  const watchPassword = watch('password');
  const isCustomer = watch('role') === ID_ROLE_CUSTOMER;
  const id = router.query.id as string;

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

  const onSubmit = async (data: FormValuesProps) => {
    try {
      delete data.role;
      await dispatch(editUser({ ...data, id: user.id })).unwrap();
      reset();
      enqueueSnackbar('Update success');
      // refetch list
      await dispatch(getUsers({ page: 0, limit: 10 }));
      router.push(PATH_DASHBOARD.user.list);
    } catch (error) {
      enqueueSnackbar('Cannot update user. Please try again later', { variant: 'error' });
    }
  };

  useEffect(() => {
    if (!id) return;
    dispatch(getUserDetail(id));
  }, [dispatch, id]);

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues]);

  useEffect(() => {
    if (watchPassword === '') setValue('password', undefined);
    if (watchPassword === undefined) clearErrors(['password', 'confirmPassword']);
  }, [watchPassword]);

  return (
    <Paper elevation={2}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing="24px" p={4}>
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
            Save
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Paper>
  );
}
