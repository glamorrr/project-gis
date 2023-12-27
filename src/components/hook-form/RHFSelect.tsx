// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import {
  FormControl,
  FormControlProps,
  FormHelperText,
  InputLabel,
  SelectProps,
} from '@mui/material';
import { Select } from '@mui/material';

// ----------------------------------------------------------------------

type Props = SelectProps & {
  name: string;
  children: React.ReactNode;
  formControlProps?: FormControlProps;
};

export default function RHFSelect({ name, children, label, formControlProps, ...other }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl fullWidth error={!!error} {...formControlProps}>
          <InputLabel color="secondary" id={name + '-' + label}>
            {label}
          </InputLabel>
          <Select labelId={name + '-' + label} label={label} {...field} {...other}>
            {children}
          </Select>
          <FormHelperText>{error?.message}</FormHelperText>
        </FormControl>
      )}
    />
  );
}
