import { Button, Divider, Paper, Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import { RHFColorPicker, RHFTextField } from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/FormProvider';
import NextLink from 'next/link';
import { PATH_DASHBOARD } from 'src/routes/paths';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'src/redux/store';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSnackbar } from 'notistack';
import { LoadingButton } from '@mui/lab';
import { editTeam, getTeamDetail, getTeams } from 'src/redux/slices/teams';
import { useEffect, useMemo } from 'react';

// ----------------------------------------------------------------------

export type FormValuesProps = {
  name: string;
  description: string;
  color_code: string;
};

const TeamEditSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  description: Yup.string().required('Description is required'),
  color_code: Yup.string().required('Color  code is required'),
});

// ----------------------------------------------------------------------

export default function TeamCreate() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { team, isLoadingCreateEdit } = useSelector((state) => state.team);
  const { enqueueSnackbar } = useSnackbar();
  const defaultValues = useMemo(
    () => ({
      name: team?.name || '',
      description: team?.description || '',
      color_code: team?.color_code || '',
    }),
    [team]
  );
  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(TeamEditSchema),
    defaultValues,
  });

  const { reset, handleSubmit } = methods;
  const id = router.query.id as string;

  const onSubmit = async (data: FormValuesProps) => {
    try {
      await dispatch(editTeam({ id, ...data })).unwrap();
      reset();
      enqueueSnackbar('Update success');
      // refetch list
      await dispatch(getTeams({ page: 0, limit: 10 }));
      router.push(PATH_DASHBOARD.team.list);
    } catch (error) {
      enqueueSnackbar('Cannot update team. Please try again later', { variant: 'error' });
    }
  };

  useEffect(() => {
    if (!id) return;
    dispatch(getTeamDetail(id));
  }, [dispatch, id]);

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues]);

  return (
    <Paper elevation={2}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing="24px" p={4}>
          <RHFTextField label="Name" placeholder="Name" name="name" />
          <RHFTextField label="Description" placeholder="Description" name="description" />
          <RHFColorPicker name="color_code" label="Color Code" />
        </Stack>
        <Divider />
        <Stack justifyContent="flex-end" spacing="16px" direction="row" px={4} py={2}>
          <NextLink href={PATH_DASHBOARD.team.list} passHref>
            <Button color="secondary" variant="outlined">
              Cancel
            </Button>
          </NextLink>
          <LoadingButton
            loading={isLoadingCreateEdit}
            color="secondary"
            variant="contained"
            type="submit"
          >
            Save
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Paper>
  );
}
