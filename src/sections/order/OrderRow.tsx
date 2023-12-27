import { TableRow, TableCell, Stack, IconButton, Typography, useTheme, Chip } from '@mui/material';
import Iconify from 'src/components/iconify';
import NextLink from 'next/link';
import { PATH_DASHBOARD } from 'src/routes/paths';
import { Order } from 'src/@types/order';
import { fDate } from 'src/utils/formatTime';
import { ORDER_TYPES } from 'src/config';

// ----------------------------------------------------------------------

type Props = {
  row: Order;
};

export default function OrderRow({ row }: Props) {
  const { id, name, due_date, team, type, done_at, cancelled_at } = row;
  const formattedType = ORDER_TYPES.find((t) => t.id === type)?.name || 'Other';
  const theme = useTheme();
  const formattedDueDate = fDate(due_date);

  return (
    <TableRow hover>
      <TableCell>
        <Stack alignItems="flex-start">
          <Typography fontSize="14px" fontWeight="bold">
            {name}
          </Typography>
          <Typography color={theme.palette.text.secondary} fontSize="14px">
            {formattedType}
          </Typography>
        </Stack>
      </TableCell>
      <TableCell>
        {!done_at && !cancelled_at && <Chip label="Ongoing" />}
        {done_at && <Chip label="Finished" color="success" />}
        {!done_at && cancelled_at && <Chip label="Cancelled" color="error" />}
      </TableCell>
      <TableCell>{formattedDueDate}</TableCell>
      <TableCell>{team}</TableCell>
      <TableCell>
        <Stack direction="row" alignItems="center" spacing="4px">
          <NextLink href={PATH_DASHBOARD.order.detail(id)} passHref>
            <IconButton color="secondary" aria-label="Edit">
              <Iconify icon={'ic:round-remove-red-eye'} />
            </IconButton>
          </NextLink>
          <NextLink href={PATH_DASHBOARD.order.edit(id)} passHref>
            <IconButton color="secondary" aria-label="Edit">
              <Iconify icon={'ic:round-edit'} />
            </IconButton>
          </NextLink>
        </Stack>
      </TableCell>
    </TableRow>
  );
}
