// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { TextFieldProps } from '@mui/material';
// muiColorPicker
import { MuiColorInput, matchIsValidColor } from 'mui-color-input';

// ----------------------------------------------------------------------

type IProps = {
  name: string;
};

type Props = IProps & TextFieldProps;

export default function RHFColorInput({ name, ...other }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      rules={{ validate: matchIsValidColor }}
      render={({ field, fieldState: { error } }) => (
        <MuiColorInput
          {...field}
          format="hex"
          sx={{ width: '100%' }}
          error={!!error}
          helperText={error?.message}
        />
      )}
    />
  );
}
