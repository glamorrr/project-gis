import { Theme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export default function Menu(theme: Theme) {
  return {
    MuiMenuItem: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: theme.palette.grey[100],
          },
          '&:focus': {
            backgroundColor: theme.palette.grey[200],
          },
          '&.Mui-selected': {
            backgroundColor: theme.palette.grey[300],
            '&:hover': {
              backgroundColor: theme.palette.grey[300],
            },
            '&:focus': {
              backgroundColor: theme.palette.grey[300],
            },
          },
        },
      },
    },
  };
}
