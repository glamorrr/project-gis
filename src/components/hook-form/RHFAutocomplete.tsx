// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { Autocomplete, AutocompleteProps, TextField } from '@mui/material';

// ----------------------------------------------------------------------

type Options = readonly {
  label: string;
  id: number;
}[];

interface Props<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined
> extends Omit<AutocompleteProps<T, Multiple, DisableClearable, FreeSolo>, 'renderInput'> {
  name: string;
  label: string;
}

export default function RHFAutocomplete<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined
>({ name, label, ...other }: Props<T, Multiple, DisableClearable, FreeSolo>) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Autocomplete
          onChange={(event, newValue) => field.onChange(newValue)}
          options={other.options as Options}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          renderInput={(params) => (
            <TextField {...params} label={label} error={!!error} helperText={error?.message} />
          )}
          renderOption={(props, option, index) => {
            const key = `listItem-${index}-${option.id}`;
            return (
              <li {...props} key={key}>
                {option.label}
              </li>
            );
          }}
        />
      )}
    />
  );
}
