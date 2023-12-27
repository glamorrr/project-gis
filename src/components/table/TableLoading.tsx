import { TableRow, TableCell, CircularProgress } from '@mui/material';

// ----------------------------------------------------------------------

type Props = {
  show: boolean;
};

export default function TableLoading({ show }: Props) {
  if (!show) return <></>;

  return (
    <TableRow>
      <TableCell colSpan={12} align="center" sx={{ py: '60px' }}>
        <CircularProgress color="secondary" />
      </TableCell>
    </TableRow>
  );
}
