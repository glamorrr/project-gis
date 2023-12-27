import { Theme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export default function DatePicker(theme: Theme) {
  return {
    MuiDatePicker: {
      defaultProps: {
        inputFormat: 'dd/MM/yyyy',
      },
    },
    MuiPickersDay: {
      styleOverrides: {
        root: {
          '&.MuiButtonBase-root.Mui-selected': {
            backgroundColor: theme.palette.secondary.main,
          },
          '&:hover': {
            backgroundColor: theme.palette.grey[300],
          },
          '&:focus': {
            backgroundColor: theme.palette.grey[200],
          },
        },
      },
    },
    MuiPickersYear: {
      styleOverrides: {
        root: {
          '& .MuiPickersYear-yearButton.Mui-selected': {
            backgroundColor: `${theme.palette.secondary.main} !important`,
          },
        },
      },
    },
    MuiPickersLayout: {
      styleOverrides: {
        root: {
          '& .MuiPickersLayout-actionBar .MuiButtonBase-root': {
            color: theme.palette.secondary.main,
          },
        },
      },
    },
  };
}
