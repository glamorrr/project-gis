import {
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  Table,
  TablePagination,
  Stack,
  Typography,
  TextField,
  InputAdornment,
  useTheme,
  Button,
} from '@mui/material';
import { useEffect, useState } from 'react';
import useTable, { getComparator } from 'src/hooks/useTable';
import { useDispatch, useSelector } from 'src/redux/store';
import Iconify from 'src/components/iconify';
import { useDebounce } from 'src/hooks/useDebounce';
import { TableLoading, TableNoData, TablePaper } from 'src/components/table';
import { PATH_DASHBOARD } from 'src/routes/paths';
import NextLink from 'next/link';
import { getOrders } from 'src/redux/slices/orders';
import { Order } from 'src/@types/order';
import OrderRow from './OrderRow';
import { DatePicker } from '@mui/x-date-pickers';
import { fDate } from 'src/utils/formatTime';

// ----------------------------------------------------------------------

function applySortFilter({
  tableData,
  comparator,
  filterName,
  dueDateFilter,
}: {
  tableData: Order[];
  comparator: (a: any, b: any) => number;
  filterName: string;
  dueDateFilter: string;
}) {
  const stabilizedThis = tableData.map((el, index) => [el, index] as const);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  tableData = stabilizedThis.map((el) => el[0]);

  if (filterName) {
    tableData = tableData.filter(
      (item: Record<string, any>) =>
        item.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
  }

  if (dueDateFilter) {
    tableData = tableData.filter(
      (item: Record<string, any>) =>
        item.due_date.toLowerCase().indexOf(dueDateFilter.toLowerCase()) !== -1
    );
  }

  return tableData;
}
// ----------------------------------------------------------------------

export default function OrderTable() {
  const theme = useTheme();
  const { page, order, orderBy, rowsPerPage, setPage, onChangePage, onChangeRowsPerPage } =
    useTable({ defaultOrderBy: 'created', defaultOrder: 'desc' });
  const [tableData, setTableData] = useState<Order[]>([]);
  const [filterName, setFilterName] = useState('');
  const [filterDueDate, setFilterDueDate] = useState<Date | null>(null);
  const formattedFilterDueDate =
    filterDueDate != null && !isNaN(filterDueDate.getTime())
      ? fDate(filterDueDate, 'yyyy-MM-dd')
      : '';
  const debouncedFilterName = useDebounce<string>(filterName, 500);
  const dataFiltered = applySortFilter({
    tableData,
    comparator: getComparator(order, orderBy),
    filterName: debouncedFilterName,
    dueDateFilter: formattedFilterDueDate,
  });
  const dispatch = useDispatch();
  const { orders, isLoading } = useSelector((state) => state.order);

  const handleFilterName = (filterName: string) => {
    setFilterName(filterName);
  };

  useEffect(() => {
    if (page === 0) return;
    dispatch(
      getOrders({
        page,
        limit: rowsPerPage,
        search: debouncedFilterName,
        due_date: formattedFilterDueDate,
      })
    );
  }, [page]);

  useEffect(() => {
    setPage(0);
    dispatch(
      getOrders({
        page: 0,
        limit: rowsPerPage,
        search: debouncedFilterName,
        due_date: formattedFilterDueDate,
      })
    );
  }, [debouncedFilterName, formattedFilterDueDate]);

  useEffect(() => {
    const combinedArray = tableData.concat(
      orders.result.filter((newItem) => !tableData.some((oldItem) => oldItem.id === newItem.id))
    );
    setTableData(combinedArray);
  }, [orders]);

  return (
    <>
      <Stack
        direction={{ xs: 'column-reverse', md: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'stretch', md: 'flex-end' }}
        spacing={{ xs: '16px' }}
      >
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: '16px' }}>
          <Stack spacing="8px">
            <Typography fontSize="14px" color={theme.palette.text.secondary}>
              Project Name
            </Typography>
            <TextField
              fullWidth
              value={filterName}
              onChange={(e) => handleFilterName(e.target.value)}
              placeholder="Search"
              size="small"
              sx={{ minWidth: '250px' }}
              InputProps={{
                sx: {
                  bgcolor: 'white',
                },
                startAdornment: (
                  <InputAdornment position="start">
                    <Iconify
                      icon={'eva:search-fill'}
                      sx={{ color: 'text.disabled', width: 16, height: 16 }}
                    />
                  </InputAdornment>
                ),
              }}
            />
          </Stack>
          <Stack spacing="8px">
            <Typography fontSize="14px" color={theme.palette.text.secondary}>
              Due Date
            </Typography>
            <DatePicker
              value={filterDueDate}
              onChange={(newValue) => {
                setFilterDueDate(newValue);
              }}
              slotProps={{
                textField: {
                  size: 'small',
                  InputProps: {
                    sx: {
                      bgcolor: 'white',
                    },
                  },
                },
              }}
            />
          </Stack>
        </Stack>
        <NextLink href={PATH_DASHBOARD.order.new} passHref>
          <Button
            startIcon={<Iconify icon="ic:round-plus" />}
            size="medium"
            variant="contained"
            color="secondary"
          >
            Add Project
          </Button>
        </NextLink>
      </Stack>
      <TablePaper>
        <TableContainer>
          <Table aria-label="order table">
            <TableHead>
              <TableRow>
                <TableCell>Project Name</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Due Date</TableCell>
                <TableCell>Team</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!isLoading &&
                dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => <OrderRow key={row.id} row={row} />)}
              <TableNoData show={!dataFiltered.length && !isLoading} />
              <TableLoading show={isLoading} />
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10]}
          component="div"
          count={orders.meta?.count || 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={onChangePage}
          onRowsPerPageChange={onChangeRowsPerPage}
        />
      </TablePaper>
    </>
  );
}
