import { useFormContext, Controller } from 'react-hook-form';
import { DatePicker, DatePickerProps, LocalizationProvider } from '@mui/x-date-pickers';
import { TextFieldProps } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

type IProps<TDate> = {
  name: string;
  DatePickerProps?: DatePickerProps<TDate>;
};

type Props = IProps<unknown> & TextFieldProps;

export function RHFDate({ name, DatePickerProps, ...other }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            {...DatePickerProps}
            {...field}
            format={'yyyy-MM-dd'}
            slotProps={{
              textField: {
                ...other,
                helperText: error?.message,
                error: !!error,
                fullWidth: true,
              },
            }}
          />
        </LocalizationProvider>
      )}
    />
  );
}
