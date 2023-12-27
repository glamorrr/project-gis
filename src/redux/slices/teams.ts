import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';
import { TeamCreateType, TeamEditType, TeamState, TeamTable } from '../../@types/team';

// ----------------------------------------------------------------------

const initialState: TeamState = {
  isLoading: false,
  isLoadingDetail: false,
  isLoadingDelete: false,
  isLoadingCancel: false,
  isLoadingCreateEdit: false,
  isLoadingCount: false,
  error: null,
  teamAutoComplete: [],
  teams: {
    meta: {
      limit: 0,
      page: 0,
      count: 0,
      total_pages: 0,
    },
    result: [],
    message: '',
  },
  team: {
    id: '',
    name: '',
    description: '',
    color_code: '',
  },
};

const slice = createSlice({
  name: 'team',
  initialState,
  reducers: {
    hasError(state, action) {
      state.isLoadingDetail = false;
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTeams.pending, (state) => {
        state.isLoading = true;
        state.teamAutoComplete = [];
      })
      .addCase(getTeams.fulfilled, (state, action) => {
        state.isLoading = false;
        state.teams = action.payload.data;
        // eslint-disable-next-line array-callback-return
        state.teams.result.map((item) => {
          if (Number(item.id) !== state.teamAutoComplete.findIndex((g) => g.id)) {
            state.teamAutoComplete.push({ id: Number(item.id), label: item.name });
          }
        });
      })
      .addCase(getTeams.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(getTeamDetail.pending, (state) => {
        state.isLoadingDetail = true;
      })
      .addCase(getTeamDetail.fulfilled, (state, action) => {
        state.isLoadingDetail = false;
        state.team = action.payload.result;
      })
      .addCase(createTeam.pending, (state) => {
        state.isLoadingCreateEdit = true;
      })
      .addCase(createTeam.fulfilled, (state, action) => {
        state.isLoadingCreateEdit = false;
        state.team = action.payload;
      })
      .addCase(createTeam.rejected, (state, action) => {
        state.isLoadingCreateEdit = false;
      })
      .addCase(editTeam.pending, (state) => {
        state.isLoadingCreateEdit = true;
      })
      .addCase(editTeam.fulfilled, (state, action) => {
        state.isLoadingCreateEdit = false;
        state.team = action.payload;
      })
      .addCase(editTeam.rejected, (state, action) => {
        state.isLoadingCreateEdit = false;
      })
      .addCase(deleteTeam.pending, (state) => {
        state.isLoadingDelete = true;
      })
      .addCase(deleteTeam.fulfilled, (state, action) => {
        state.isLoadingDelete = false;
      });
  },
});

// Reducer
export default slice.reducer;

// Actions
export const getTeams = createAsyncThunk(
  'team-list',
  async (data: { page: number; limit: number; search?: string }, { rejectWithValue }) => {
    try {
      data.page += 1;
      let param = 'page=' + data.page + '&limit=' + data.limit;

      if (!!data.search) {
        param += '&search=' + data.search;
      }

      const response: { data: TeamTable } = await axios.get(`/teams?${param}`);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getTeamDetail = createAsyncThunk(
  'team-detail',
  async (data: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/teams/${data}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createTeam = createAsyncThunk(
  'team-create',
  async (data: TeamCreateType, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/teams`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const editTeam = createAsyncThunk(
  'team-edit',
  async (data: TeamEditType, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`/teams/${data.id}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteTeam = createAsyncThunk(
  'team-delete',
  async (data: string, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/teams/${data}`);
      return response.data.message;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
