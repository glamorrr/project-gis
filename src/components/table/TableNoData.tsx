import { TableRow, TableCell } from '@mui/material';
import EmptyContent from './EmptyContent';

// ----------------------------------------------------------------------

type Props = {
  show: boolean;
};

export default function TableNoData({ show }: Props) {
  if (!show) return <></>;

  return (
    <TableRow>
      <TableCell colSpan={12}>
        <EmptyContent title="No Data" />
      </TableCell>
    </TableRow>
  );
}
