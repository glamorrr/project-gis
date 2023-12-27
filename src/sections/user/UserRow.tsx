import { useState } from 'react';
import { TableRow, TableCell, Switch, Button, Stack, Typography, useTheme } from '@mui/material';
import { User } from 'src/@types/user';
import { ID_ROLE_CUSTOMER, SALUTATIONS, USER_BUSINESSES, USER_ROLES } from 'src/config';
import { useDispatch } from 'src/redux/store';
import { userActivation } from 'src/redux/slices/users';
import { useSnackbar } from 'notistack';
import Iconify from 'src/components/iconify';
import NextLink from 'next/link';
import { PATH_DASHBOARD } from 'src/routes/paths';

// ----------------------------------------------------------------------

type Props = {
  row: User;
};

export default function UserRow({ row }: Props) {
  const theme = useTheme();
  const { id, name, role, title, email, phone, is_active, category } = row;
  const salutation = SALUTATIONS.find(({ id }) => id === title)?.name;
  const formattedName = salutation ? `${salutation} ${name}` : name;
  const formattedRole = USER_ROLES.find(({ id }) => id === role)?.name || '-';
  const isCustomer = role === ID_ROLE_CUSTOMER;
  const formattedBusiness = USER_BUSINESSES.find(({ id }) => id === category)?.name;

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [isActive, setIsActive] = useState(is_active);

  const handleChangeStatus = async (user: User, e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const newStatus = e.target.checked;
      const res = await dispatch(userActivation({ id: user.id, is_active: newStatus })).unwrap();
      setIsActive(res.is_active);
      enqueueSnackbar(`${formattedName} status changed`);
    } catch (error) {
      enqueueSnackbar(`Change ${formattedName} status failed, Please try again`, {
        variant: 'error',
      });
    }
  };

  return (
    <TableRow hover>
      <TableCell>{formattedName}</TableCell>
      <TableCell>{email}</TableCell>
      <TableCell>{phone}</TableCell>
      <TableCell>
        <Stack>
          <Typography fontSize="14px">{formattedRole}</Typography>
          {isCustomer && (
            <Typography color={theme.palette.text.secondary} fontStyle="italic" fontSize="14px">
              {formattedBusiness}
            </Typography>
          )}
        </Stack>
      </TableCell>
      <TableCell>
        <Switch
          color="success"
          checked={isActive}
          onChange={(e) => handleChangeStatus(row, e)}
          inputProps={{ 'aria-label': 'controlled' }}
        />
      </TableCell>
      <TableCell>
        <NextLink href={PATH_DASHBOARD.user.edit(id)} passHref>
          <Button
            color="secondary"
            variant="outlined"
            size="small"
            startIcon={<Iconify icon={'ic:round-edit'} />}
          >
            Edit
          </Button>
        </NextLink>
      </TableCell>
    </TableRow>
  );
}
