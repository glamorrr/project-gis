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
import { Team } from 'src/@types/team';
import { getTeams } from 'src/redux/slices/teams';
import TeamRow from './TeamRow';

// ----------------------------------------------------------------------

function applySortFilter({
  tableData,
  comparator,
  filterName,
}: {
  tableData: Team[];
  comparator: (a: any, b: any) => number;
  filterName: string;
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

  return tableData;
}
// ----------------------------------------------------------------------

export default function TeamTable() {
  const theme = useTheme();
  const { page, order, orderBy, rowsPerPage, setPage, onChangePage, onChangeRowsPerPage } =
    useTable({ defaultOrderBy: 'created', defaultOrder: 'desc' });
  const [tableData, setTableData] = useState<Team[]>([]);
  const [filterName, setFilterName] = useState('');
  const debouncedFilterName = useDebounce<string>(filterName, 500);
  const dataFiltered = applySortFilter({
    tableData,
    comparator: getComparator(order, orderBy),
    filterName: debouncedFilterName,
  });
  const dispatch = useDispatch();
  const { teams, isLoading } = useSelector((state) => state.team);

  const handleFilterName = (filterName: string) => {
    setFilterName(filterName);
  };

  const handleDelete = (id: string) => {
    const rows = tableData.filter((row) => row.id !== id);
    setTableData(rows);
  };

  useEffect(() => {
    if (page === 0) return;
    dispatch(getTeams({ page, limit: rowsPerPage, search: debouncedFilterName }));
  }, [page]);

  useEffect(() => {
    setPage(0);
    dispatch(
      getTeams({
        page: 0,
        limit: rowsPerPage,
        search: debouncedFilterName,
      })
    );
  }, [debouncedFilterName]);

  useEffect(() => {
    const combinedArray = tableData.concat(
      teams.result.filter((newItem) => !tableData.some((oldItem) => oldItem.id === newItem.id))
    );
    setTableData(combinedArray);
  }, [teams]);

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
              Team Name
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
        </Stack>
        <NextLink href={PATH_DASHBOARD.team.new} passHref>
          <Button
            startIcon={<Iconify icon="ic:round-plus" />}
            size="medium"
            variant="contained"
            color="secondary"
          >
            Add Team
          </Button>
        </NextLink>
      </Stack>
      <TablePaper>
        <TableContainer>
          <Table aria-label="team table">
            <TableHead>
              <TableRow>
                <TableCell>Team Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Color Code</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!isLoading &&
                dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => <TeamRow key={row.id} row={row} handleDelete={handleDelete} />)}
              <TableNoData show={!dataFiltered.length && !isLoading} />
              <TableLoading show={isLoading} />
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10]}
          component="div"
          count={teams.meta?.count || 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={onChangePage}
          onRowsPerPageChange={onChangeRowsPerPage}
        />
      </TablePaper>
    </>
  );
}
