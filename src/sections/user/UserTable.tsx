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
  Select,
  MenuItem,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { User } from 'src/@types/user';
import useTable, { getComparator } from 'src/hooks/useTable';
import { getUsers } from 'src/redux/slices/users';
import { useDispatch, useSelector } from 'src/redux/store';
import UserRow from './UserRow';
import Iconify from 'src/components/iconify';
import { useDebounce } from 'src/hooks/useDebounce';
import { USER_ROLES } from 'src/config';
import { TableLoading, TableNoData, TablePaper } from 'src/components/table';
import { PATH_DASHBOARD } from 'src/routes/paths';
import NextLink from 'next/link';

// ----------------------------------------------------------------------

function applySortFilter({
  tableData,
  comparator,
  filterName,
  filterRole,
}: {
  tableData: User[];
  comparator: (a: any, b: any) => number;
  filterName: string;
  filterRole: string | number;
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
        item.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1 ||
        item.email.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
  }

  if (filterRole !== 0) {
    tableData = tableData.filter((item: Record<string, any>) => item.role === filterRole);
  }

  return tableData;
}
// ----------------------------------------------------------------------

export default function UserTable() {
  const theme = useTheme();
  const { page, order, orderBy, rowsPerPage, setPage, onChangePage, onChangeRowsPerPage } =
    useTable({ defaultOrderBy: 'created', defaultOrder: 'desc' });
  const [tableData, setTableData] = useState<User[]>([]);
  const [filterName, setFilterName] = useState('');
  const debouncedFilterName = useDebounce<string>(filterName, 500);
  const [filterRole, setFilterRole] = useState(0);
  const dataFiltered = applySortFilter({
    tableData,
    comparator: getComparator(order, orderBy),
    filterName: debouncedFilterName,
    filterRole,
  });
  const dispatch = useDispatch();
  const { users, isLoading } = useSelector((state) => state.user);

  const handleFilterName = (filterName: string) => {
    setFilterName(filterName);
  };

  const handleFilterRole = (role: number) => {
    setFilterRole(role);
  };

  useEffect(() => {
    if (page === 0) return;
    dispatch(getUsers({ page, limit: rowsPerPage, search: debouncedFilterName, role: filterRole }));
  }, [page]);

  useEffect(() => {
    setPage(0);
    dispatch(
      getUsers({
        page: 0,
        limit: rowsPerPage,
        search: debouncedFilterName,
        role: filterRole,
      })
    );
  }, [debouncedFilterName, filterRole]);

  useEffect(() => {
    const combinedArray = tableData.concat(
      users.result.filter((newItem) => !tableData.some((oldItem) => oldItem.id === newItem.id))
    );
    setTableData(combinedArray);
  }, [users]);

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
              Name
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
              Role
            </Typography>
            <Select
              fullWidth
              value={filterRole}
              onChange={(e) => handleFilterRole(Number(e.target.value))}
              size="small"
              sx={{ minWidth: '250px' }}
              inputProps={{
                sx: {
                  bgcolor: 'white',
                },
              }}
            >
              <MenuItem value={0}>All</MenuItem>
              {USER_ROLES.map((role) => (
                <MenuItem key={role.id} value={role.id}>
                  {role.name}
                </MenuItem>
              ))}
            </Select>
          </Stack>
        </Stack>
        <NextLink href={PATH_DASHBOARD.user.new} passHref>
          <Button
            startIcon={<Iconify icon="ic:round-plus" />}
            size="medium"
            variant="contained"
            color="secondary"
          >
            Add User
          </Button>
        </NextLink>
      </Stack>
      <TablePaper>
        <TableContainer>
          <Table aria-label="user table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!isLoading &&
                dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => <UserRow key={row.id} row={row} />)}
              <TableNoData show={!dataFiltered.length && !isLoading} />
              <TableLoading show={isLoading} />
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10]}
          component="div"
          count={users.meta?.count || 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={onChangePage}
          onRowsPerPageChange={onChangeRowsPerPage}
        />
      </TablePaper>
    </>
  );
}
