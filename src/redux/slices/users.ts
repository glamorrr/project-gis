import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';
import { UserCreateType, UserEditType, UserState, UserTable } from '../../@types/user';

// ----------------------------------------------------------------------

const initialState: UserState = {
  isLoading: false,
  isLoadingDetail: false,
  isLoadingCreateEdit: false,
  isLoadingActivation: false,
  userAutoComplete: [],
  isOpenModal: true,
  error: null,
  status: '',
  users: {
    meta: {
      limit: 0,
      page: 0,
      count: 0,
      total_pages: 0,
    },
    result: [],
    message: '',
  },
  user: {
    id: '',
    name: '',
    title: 0,
    email: '',
    phone: '',
    category: 0,
    role: 0,
    password: '',
    is_active: true,
  },
};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Close Modal
    closeModal(state) {
      state.isOpenModal = false;
      state.error = null;
    },

    // Error
    hasError(state, action) {
      state.isLoadingDetail = false;
      state.error = action.payload;
      state.isOpenModal = true;
    },
  },
  extraReducers: (builder) => {
    builder
      // Unverified List
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
        state.userAutoComplete = [];
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload.data;
        // deepcode ignore CallbackShouldReturn: <please specify a reason of ignoring this>
        // eslint-disable-next-line array-callback-return
        state.users.result.map((v) => {
          if (Number(v.id) !== state.userAutoComplete.findIndex((g) => g.id))
            state.userAutoComplete.push({
              id: Number(v.id),
              label: v.name,
            });
        });
      })
      .addCase(getUsers.rejected, (state) => {
        state.isLoading = false;
      })

      // Unverified Detail
      .addCase(getUserDetail.pending, (state) => {
        state.isLoadingDetail = true;
      })
      .addCase(getUserDetail.fulfilled, (state, action) => {
        state.isLoadingDetail = false;
        state.user = action.payload;
      })
      .addCase(getUserDetail.rejected, (state) => {
        state.isLoadingDetail = false;
      })

      .addCase(userActivation.pending, (state) => {
        state.isLoadingActivation = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isLoadingActivation = false;
        state.status = action.payload;
      })
      .addCase(deleteUser.rejected, (state) => {
        state.isLoadingActivation = false;
      })
      .addCase(createUser.pending, (state) => {
        state.isLoadingCreateEdit = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.isLoadingCreateEdit = false;
        state.isOpenModal = false;
        state.user = action.payload;
      })
      .addCase(createUser.rejected, (state) => {
        state.isLoadingCreateEdit = false;
      })
      .addCase(editUser.pending, (state) => {
        state.isLoadingCreateEdit = true;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.isLoadingCreateEdit = false;
        state.user = action.payload;
      })
      .addCase(editUser.rejected, (state) => {
        state.isLoadingCreateEdit = false;
      });
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { closeModal } = slice.actions;

export const getUsers = createAsyncThunk(
  'user-list',
  async (
    data: { page: number; limit: number; role?: number; search?: string },
    { rejectWithValue }
  ) => {
    try {
      data.page += 1;
      let param = '?page=' + data.page + '&limit=' + data.limit;

      if (!!data.search) {
        param += '&search=' + data.search;
      }
      if (!!data.role) {
        param += '&role=' + data.role;
      }

      const res: { data: UserTable } = await axios.get(`/users${param}`);
      return res;
    } catch (err) {
      throw err;
    }
  }
);

export const getUserDetail = createAsyncThunk('users-detail', async (data: string) => {
  try {
    const res = await axios.get(`/users/${data}`);
    return res.data.result;
  } catch (err) {
    throw err;
  }
});
export const deleteUser = createAsyncThunk('users-delete', async (data: string) => {
  try {
    const res = await axios.patch(`/users/${data}`);
    return res.data;
  } catch (err) {
    throw err;
  }
});
export const userActivation = createAsyncThunk(
  'user-activation',
  async (data: { id: string; is_active: boolean }, { rejectWithValue }) => {
    try {
      const res = await axios.patch(`/users/${data.id}`, { is_active: data.is_active });
      return res.data;
    } catch (err) {
      throw err;
    }
  }
);
export const createUser = createAsyncThunk(
  'users-create',
  async (data: UserCreateType, { rejectWithValue }) => {
    try {
      const res = await axios.post(`/users`, data);
      return res.data;
    } catch (err) {
      throw err;
    }
  }
);
export const editUser = createAsyncThunk(
  'users-edit',
  async (data: UserEditType, { rejectWithValue }) => {
    try {
      const res = await axios.patch(`/users/${data.id}`, data);
      return res.data;
    } catch (err) {
      throw err;
    }
  }
);
