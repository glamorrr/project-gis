import { Button, Divider, MenuItem, Paper, Stack } from '@mui/material';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { RHFAutocomplete, RHFSelect, RHFTextField } from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/FormProvider';
import NextLink from 'next/link';
import { PATH_DASHBOARD } from 'src/routes/paths';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'src/redux/store';
import { getUsers } from 'src/redux/slices/users';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ORDER_TYPES } from 'src/config';
import { phoneFormat } from 'src/utils/phone';
import { useSnackbar } from 'notistack';
import { LoadingButton } from '@mui/lab';
import { RHFDate } from 'src/components/hook-form/RHFDate';
import { getTeams } from 'src/redux/slices/teams';
import { createOrder, getOrders } from 'src/redux/slices/orders';
import { fDate } from 'src/utils/formatTime';

// ----------------------------------------------------------------------

export type FormValuesProps = {
  name: string;
  start_date: Date;
  due_date: Date;
  type: number;
  phone: string;
  client: {
    id: number;
    label: string;
  } | null;
  team: {
    id: number;
    label: string;
  } | null;
};

const OrderCreateSchema = Yup.object().shape({
  name: Yup.string().required('Project name is required'),
  start_date: Yup.date().required('Start date is required'),
  due_date: Yup.date().required('Due date is required'),
  client: Yup.object()
    .shape({
      id: Yup.number(),
      label: Yup.string(),
    })
    .nullable()
    .required('Client is required'),
  team: Yup.object()
    .shape({
      id: Yup.number(),
      label: Yup.string(),
    })
    .nullable()
    .required('Team is required'),
  type: Yup.number().required('Type is required'),
  phone: Yup.string()
    .min(8, 'Phone Number is invalid. Format: 08xxxxxxxxx')
    .max(14, 'Phone Number is invalid. Format: 08xxxxxxxxx')
    .required('Phone Number is required')
    .matches(phoneFormat, 'Phone Number is invalid. Format: 08xxxxxxxxx'),
});

// ----------------------------------------------------------------------

export default function UserCreate() {
  const dispatch = useDispatch();
  const { isLoadingCreate } = useSelector((state) => state.order);
  const { userAutoComplete } = useSelector((state) => state.user);
  const { teamAutoComplete } = useSelector((state) => state.team);
  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(OrderCreateSchema),
    defaultValues: {
      name: '',
      start_date: undefined,
      due_date: undefined,
      phone: '',
      client: null,
      team: null,
      type: undefined,
    },
  });
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const { reset, handleSubmit, watch, resetField } = methods;
  const watchStartDate = watch('start_date');

  useEffect(() => {
    resetField('due_date');
  }, [watchStartDate]);

  useEffect(() => {
    dispatch(getUsers({ page: 0, limit: 100, role: 5 }));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getTeams({ page: 0, limit: 100 }));
  }, [dispatch]);

  const onSubmit = async (data: FormValuesProps) => {
    try {
      await dispatch(
        createOrder({
          ...data,
          client: data.client?.id as number,
          team: data.team?.id as number,
          start_date: fDate(data.start_date, 'yyyy-MM-dd'),
          due_date: fDate(data.due_date, 'yyyy-MM-dd'),
        })
      ).unwrap();
      reset();
      enqueueSnackbar('Order created');
      // refetch list
      await dispatch(getOrders({ page: 0, limit: 10 }));
      router.push(PATH_DASHBOARD.order.list);
    } catch (error) {
      enqueueSnackbar('Cannot create order. Please try again later', { variant: 'error' });
    }
  };

  return (
    <Paper elevation={2}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing="24px" p={4}>
          <RHFTextField label="Project Name" placeholder="Project Name" name="name" />
          <RHFAutocomplete
            name="client"
            placeholder="Client"
            label="Client"
            options={userAutoComplete}
          />
          <RHFTextField label="Phone Number" placeholder="Phone Number" name="phone" />
          <RHFAutocomplete name="team" placeholder="Team" label="Team" options={teamAutoComplete} />
          <RHFDate name="start_date" label="Start Date" />
          <RHFDate name="due_date" label="Due Date" DatePickerProps={{ minDate: watchStartDate }} />
          <RHFSelect name="type" label="Type">
            {ORDER_TYPES.map(({ id, name }) => (
              <MenuItem key={id} value={id}>
                {name}
              </MenuItem>
            ))}
          </RHFSelect>
        </Stack>
        <Divider />
        <Stack justifyContent="flex-end" spacing="16px" direction="row" px={4} py={2}>
          <NextLink href={PATH_DASHBOARD.order.list} passHref>
            <Button color="secondary" variant="outlined">
              Cancel
            </Button>
          </NextLink>
          <LoadingButton
            loading={isLoadingCreate}
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
