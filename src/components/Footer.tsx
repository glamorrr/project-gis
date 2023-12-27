import { Box, Typography, useTheme } from '@mui/material';

function Footer() {
  const theme = useTheme();
  return (
    <Box py={4} px="16px">
      <Typography textAlign="center" fontSize="14px" color={theme.palette.text.secondary}>
        SetiaKopi © 2024. Dibuat untuk memenuhi tugas akhir.
      </Typography>
    </Box>
  );
}
export default Footer;
