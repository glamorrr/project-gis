import {
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Paper,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import NextLink from 'next/link';
import { PATH_DASHBOARD } from 'src/routes/paths';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'src/redux/store';
import {
  getOrderDetail,
  getOrders,
  deleteOrder,
  finishOrder,
  cancelOrder,
} from 'src/redux/slices/orders';
import { Order } from 'src/@types/order';
import { fDate } from 'src/utils/formatTime';
import { ORDER_TYPES } from 'src/config';
import { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import { LoadingButton } from '@mui/lab';

// ----------------------------------------------------------------------

export default function OrderDetail() {
  const router = useRouter();
  const dispatch = useDispatch();
  const theme = useTheme();
  const { order, isLoadingDetail, isLoadingDelete, isLoadingFinishCancel } = useSelector(
    (state) => state.order
  );
  const { name, client, team, phone, start_date, due_date, type, done_at, cancelled_at } =
    order as Order;
  const formattedType = ORDER_TYPES.find((t) => t.id === type)?.name || 'Other';
  const formattedStartDate = fDate(start_date);
  const formattedDueDate = fDate(due_date);
  const formattedDoneAt = fDate(done_at);
  const formattedCancelledAt = fDate(cancelled_at);
  const [openDelete, setOpenDelete] = useState(false);
  const [openFinish, setOpenFinish] = useState(false);
  const [openCancel, setOpenCancel] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const id = router.query.id as string;

  useEffect(() => {
    if (!id) return;
    dispatch(getOrderDetail(id));
  }, [dispatch, id]);

  const onDelete = async () => {
    try {
      await dispatch(deleteOrder(id)).unwrap();
      enqueueSnackbar(`Order ${name} deleted`);
      await dispatch(getOrders({ page: 0, limit: 10 }));
      router.push(PATH_DASHBOARD.order.list);
    } catch (error) {
      enqueueSnackbar('Cannot delete order. Please try again later', { variant: 'error' });
    }
  };

  const onFinish = async () => {
    try {
      await dispatch(finishOrder(id)).unwrap();
      enqueueSnackbar(`Order ${name} finished`);
      setOpenFinish(false);
      await dispatch(getOrderDetail(id));
      await dispatch(getOrders({ page: 0, limit: 10 }));
    } catch (error) {
      // TODO: fix later
      if (error.message.includes('datetime.date')) {
        enqueueSnackbar(`Order ${name} finished`);
        setOpenFinish(false);
        await dispatch(getOrderDetail(id));
        await dispatch(getOrders({ page: 0, limit: 10 }));
      } else {
        enqueueSnackbar('Cannot finish order. Please try again later', { variant: 'error' });
      }
    }
  };

  const onCancel = async () => {
    try {
      await dispatch(cancelOrder(id)).unwrap();
      enqueueSnackbar(`Order ${name} cancelled`);
      setOpenCancel(false);
      await dispatch(getOrderDetail(id));
      await dispatch(getOrders({ page: 0, limit: 10 }));
    } catch (error) {
      enqueueSnackbar('Cannot finish order. Please try again later', { variant: 'error' });
    }
  };

  if (isLoadingDetail) {
    return (
      <Stack pt="24px" alignItems="center">
        <CircularProgress color="secondary" />
      </Stack>
    );
  }

  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      spacing="24px"
      alignItems={{ xs: 'initial', sm: 'flex-start' }}
    >
      <Paper elevation={2} sx={{ flexBasis: { xs: 'initial', sm: '600px' } }}>
        <Stack spacing="16px" p={4}>
          <Stack spacing="2px">
            <Typography fontSize="14px" color={theme.palette.text.secondary}>
              Type
            </Typography>
            <Typography>{formattedType}</Typography>
          </Stack>
          <Stack spacing="2px">
            <Typography fontSize="14px" color={theme.palette.text.secondary}>
              Project Name
            </Typography>
            <Typography>{name}</Typography>
          </Stack>
          <Stack spacing="2px">
            <Typography fontSize="14px" color={theme.palette.text.secondary}>
              Project Phone Number
            </Typography>
            <Typography>{phone}</Typography>
          </Stack>
          <Stack spacing="2px">
            <Typography fontSize="14px" color={theme.palette.text.secondary}>
              Team
            </Typography>
            <Typography>{team}</Typography>
          </Stack>
          <Stack spacing="2px">
            <Typography fontSize="14px" color={theme.palette.text.secondary}>
              Start Date
            </Typography>
            <Typography>{formattedStartDate}</Typography>
          </Stack>
          <Stack spacing="2px">
            <Typography fontSize="14px" color={theme.palette.text.secondary}>
              Due Date
            </Typography>
            <Typography>{formattedDueDate}</Typography>
          </Stack>
        </Stack>
        <Divider />
        <Stack justifyContent="space-between" spacing="16px" direction="row" px={4} py={2}>
          <NextLink href={PATH_DASHBOARD.order.list} passHref>
            <Button color="secondary" variant="outlined">
              Back
            </Button>
          </NextLink>
          <Button variant="text" color="error" onClick={() => setOpenDelete(true)}>
            Delete
          </Button>
        </Stack>
      </Paper>

      <Stack direction="column" spacing="24px">
        {!done_at && !cancelled_at && (
          <Paper elevation={2}>
            <Stack p={2} spacing="8px">
              <Typography fontSize="14px" textAlign="center" color={theme.palette.text.secondary}>
                Status
              </Typography>
              <Chip label="Ongoing" />
            </Stack>
            <Divider />
            <Stack p={1} spacing="8px">
              <Button
                variant="outlined"
                color="success"
                size="small"
                onClick={() => setOpenFinish(true)}
              >
                Finish Project
              </Button>
              <Button
                variant="outlined"
                color="error"
                size="small"
                onClick={() => setOpenCancel(true)}
              >
                Cancel Project
              </Button>
            </Stack>
          </Paper>
        )}
        {done_at && (
          <Paper elevation={2}>
            <Stack p={2} spacing="8px">
              <Typography fontSize="14px" textAlign="center" color={theme.palette.text.secondary}>
                Status
              </Typography>
              <Chip label="Finished" color="success" />
              <Typography fontSize="14px" textAlign="center">
                {formattedDoneAt}
              </Typography>
            </Stack>
          </Paper>
        )}
        {!done_at && cancelled_at && (
          <Paper elevation={2}>
            <Stack p={2} spacing="8px">
              <Typography fontSize="14px" textAlign="center" color={theme.palette.text.secondary}>
                Status
              </Typography>
              <Chip label="Cancelled" color="error" />
              <Typography fontSize="14px" textAlign="center">
                {formattedCancelledAt}
              </Typography>
            </Stack>
          </Paper>
        )}
        <Paper elevation={2}>
          <Stack spacing="16px" p={4}>
            <Stack spacing="2px">
              <Typography fontSize="14px" color={theme.palette.text.secondary}>
                Client
              </Typography>
              <Typography>{client?.name}</Typography>
            </Stack>
            <Stack spacing="2px">
              <Typography fontSize="14px" color={theme.palette.text.secondary}>
                Phone Number
              </Typography>
              <Typography>{client?.phone}</Typography>
            </Stack>
          </Stack>
        </Paper>
      </Stack>

      <Dialog open={openFinish} onClose={() => setOpenFinish(false)}>
        <DialogTitle>Finish Order</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You cannot undo this action. <br />
            Are you sure you want to finish this project?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenFinish(false)} color="secondary" autoFocus>
            Cancel
          </Button>
          <LoadingButton
            loading={isLoadingFinishCancel}
            onClick={onFinish}
            color="success"
            variant="contained"
          >
            Finish Project
          </LoadingButton>
        </DialogActions>
      </Dialog>

      <Dialog open={openCancel} onClose={() => setOpenCancel(false)}>
        <DialogTitle>Cancel Order</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You cannot undo this action. <br />
            Are you sure you want to cancel this project?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCancel(false)} color="secondary" autoFocus>
            Back
          </Button>
          <LoadingButton
            loading={isLoadingFinishCancel}
            onClick={onCancel}
            color="error"
            variant="contained"
          >
            Cancel Project
          </LoadingButton>
        </DialogActions>
      </Dialog>

      <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
        <DialogTitle>Delete Order</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You cannot undo this action. <br />
            Are you sure you want to delete order {name}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDelete(false)} color="secondary" autoFocus>
            Cancel
          </Button>
          <LoadingButton
            loading={isLoadingDelete}
            onClick={onDelete}
            color="error"
            variant="contained"
          >
            Delete
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}
