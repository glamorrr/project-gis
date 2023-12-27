import { Button, Divider, MenuItem, Paper, Stack } from '@mui/material';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { RHFSelect, RHFTextField } from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/FormProvider';
import NextLink from 'next/link';
import { PATH_DASHBOARD } from 'src/routes/paths';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'src/redux/store';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ORDER_TYPES } from 'src/config';
import { phoneFormat } from 'src/utils/phone';
import { useSnackbar } from 'notistack';
import { LoadingButton } from '@mui/lab';
import { RHFDate } from 'src/components/hook-form/RHFDate';
import { editOrder, getOrderDetail, getOrders } from 'src/redux/slices/orders';
import { fDate } from 'src/utils/formatTime';

// ----------------------------------------------------------------------

export type FormValuesProps = {
  name: string;
  start_date: Date;
  due_date: Date;
  type: number;
  phone: string;
};

const OrderEditSchema = Yup.object().shape({
  name: Yup.string().required('Project name is required'),
  start_date: Yup.date().required('Start date is required'),
  due_date: Yup.date()
    .required('Due date is required')
    .when('start_date', (start_date, schema) => {
      return schema.test({
        test: (due_date: Date) => {
          if (start_date.getTime() > due_date.getTime()) {
            return false;
          }
          return true;
        },
        message: `Due date can't be ealier than start date`,
      });
    }),
  type: Yup.number().min(0, 'Type is required'),
  phone: Yup.string()
    .min(8, 'Phone Number is invalid. Format: 08xxxxxxxxx')
    .max(14, 'Phone Number is invalid. Format: 08xxxxxxxxx')
    .required('Phone Number is required')
    .matches(phoneFormat, 'Phone Number is invalid. Format: 08xxxxxxxxx'),
});

// ----------------------------------------------------------------------

export default function OrderEdit() {
  const dispatch = useDispatch();
  const { isLoadingEdit, order } = useSelector((state) => state.order);

  const defaultValues = useMemo(
    () => ({
      name: order?.name || '',
      start_date: order ? new Date(order.start_date) : undefined,
      due_date: order ? new Date(order.due_date) : undefined,
      phone: order?.phone || '',
      type: order?.type || -1,
    }),
    [order]
  );
  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(OrderEditSchema),
    defaultValues,
  });
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const { reset, handleSubmit, watch } = methods;
  const watchStartDate = watch('start_date');
  const id = router.query.id as string;

  useEffect(() => {
    if (!id) return;
    dispatch(getOrderDetail(id));
  }, [dispatch, id]);

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues]);

  const onSubmit = async (data: FormValuesProps) => {
    try {
      await dispatch(
        editOrder({
          ...data,
          id,
          start_date: fDate(data.start_date, 'yyyy-MM-dd'),
          due_date: fDate(data.due_date, 'yyyy-MM-dd'),
        })
      ).unwrap();
      reset();
      enqueueSnackbar('Update success');
      // refetch list
      await dispatch(getOrders({ page: 0, limit: 10 }));
      router.push(PATH_DASHBOARD.order.list);
    } catch (error) {
      enqueueSnackbar('Cannot update order. Please try again later', { variant: 'error' });
    }
  };

  return (
    <Paper elevation={2}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing="24px" p={4}>
          <RHFTextField label="Project Name" placeholder="Project Name" name="name" />
          <RHFTextField label="Phone Number" placeholder="Phone Number" name="phone" />
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
            loading={isLoadingEdit}
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
