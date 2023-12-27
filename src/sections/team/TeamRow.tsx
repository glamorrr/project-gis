import {
  TableRow,
  TableCell,
  Button,
  Box,
  Stack,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import Iconify from 'src/components/iconify';
import NextLink from 'next/link';
import { PATH_DASHBOARD } from 'src/routes/paths';
import { Team } from 'src/@types/team';
import { useState } from 'react';
import { deleteTeam } from 'src/redux/slices/teams';
import { useDispatch } from 'src/redux/store';
import { useSnackbar } from 'notistack';

// ----------------------------------------------------------------------

type Props = {
  row: Team;
  handleDelete: (id: string) => void;
};

export default function TeamRow({ row, handleDelete }: Props) {
  const { id, name, color_code, description } = row;
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  const onDelete = async () => {
    try {
      await dispatch(deleteTeam(id)).unwrap();
      handleDelete(id);
      enqueueSnackbar(`Team ${name} deleted`);
    } catch (error) {
      enqueueSnackbar('Cannot delete team. Please try again later', { variant: 'error' });
    }
  };

  return (
    <TableRow hover>
      <TableCell>{name}</TableCell>
      <TableCell>{description}</TableCell>
      <TableCell>
        <Stack direction="row" alignItems="center">
          <Box
            sx={{
              backgroundColor: color_code,
              height: 16,
              width: 16,
              borderRadius: '50%',
              border: '.5px solid #f2f2f2',
              mr: 1,
            }}
          />
          {color_code}
        </Stack>
      </TableCell>
      <TableCell>
        <Stack direction="row" alignItems="center" spacing="4px">
          <NextLink href={PATH_DASHBOARD.team.edit(id)} passHref>
            <IconButton color="secondary" aria-label="Edit">
              <Iconify icon={'ic:round-edit'} />
            </IconButton>
          </NextLink>
          <IconButton color="secondary" aria-label="Delete" onClick={handleOpen}>
            <Iconify icon={'ic:round-delete'} />
          </IconButton>
        </Stack>
      </TableCell>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Delete Team</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You cannot undo this action. <br />
            Are you sure you want to delete team {name}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary" autoFocus>
            Cancel
          </Button>
          <Button onClick={onDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </TableRow>
  );
}
