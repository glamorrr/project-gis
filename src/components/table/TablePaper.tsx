import { Paper, PaperProps } from '@mui/material';

// ----------------------------------------------------------------------

export default function TablePaper({ children, sx }: PaperProps) {
  return (
    <Paper sx={{ mt: '24px', px: 1, pt: 1, pb: 0, ...sx }} elevation={2}>
      {children}
    </Paper>
  );
}
