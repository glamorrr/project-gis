import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';
import { OrderCreate, OrderEdit, OrderState, OrderTable } from '../../@types/order';

// ----------------------------------------------------------------------

const initialState: OrderState = {
  isLoading: false,
  isLoadingDetail: false,
  isLoadingEdit: false,
  isLoadingFinishCancel: false,
  isLoadingCount: false,
  isLoadingDelete: false,
  isLoadingCreate: false,
  isOpenModal: true,
  error: null,
  orders: {
    meta: {
      limit: 0,
      page: 0,
      count: 0,
      total_pages: 0,
    },
    result: [],
    message: '',
  },
  order: {
    id: '',
    name: '',
    phone: '',
    type: 0,
    client: {
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
    due_date: '',
    start_date: '',
    team: '',
    cancelled_at: null,
    done_at: null,
    status: 0,
  },
};

const slice = createSlice({
  name: 'order',
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
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload.data;
        // deepcode ignore CallbackShouldReturn: <please specify a reason of ignoring this>
        // eslint-disable-next-line array-callback-return
        // state.orders.result.map((v) => {
        //   if(Number(v.id) !== state.userAutoComplete.findIndex(g => g.id) )
        //   state.userAutoComplete.push({
        //     id: Number(v.id),
        //     label: v.name
        //   });
        // })
      })
      .addCase(getOrders.rejected, (state) => {
        state.isLoading = false;
      })

      // Unverified Detail
      .addCase(getOrderDetail.pending, (state) => {
        state.isLoadingDetail = true;
      })
      .addCase(getOrderDetail.fulfilled, (state, action) => {
        state.isLoadingDetail = false;
        state.order = action.payload.result;
      })
      .addCase(getOrderDetail.rejected, (state) => {
        state.isLoadingDetail = false;
      })

      .addCase(createOrder.pending, (state) => {
        state.isLoadingCreate = true;
        state.isOpenModal = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoadingCreate = false;
        state.isOpenModal = false;
        state.order = action.payload;
      })
      .addCase(createOrder.rejected, (state) => {
        state.isLoadingCreate = false;
        state.isOpenModal = true;
      })

      .addCase(editOrder.pending, (state) => {
        state.isLoadingEdit = true;
      })
      .addCase(editOrder.fulfilled, (state, action) => {
        state.isLoadingEdit = false;
        state.order = action.payload;
      })
      .addCase(editOrder.rejected, (state) => {
        state.isLoadingEdit = false;
      })

      .addCase(cancelOrder.pending, (state) => {
        state.isLoadingFinishCancel = true;
      })
      .addCase(cancelOrder.fulfilled, (state, action) => {
        state.isLoadingFinishCancel = false;
      })
      .addCase(cancelOrder.rejected, (state) => {
        state.isLoadingFinishCancel = false;
      })
      .addCase(finishOrder.pending, (state) => {
        state.isLoadingFinishCancel = true;
      })
      .addCase(finishOrder.fulfilled, (state, action) => {
        state.isLoadingFinishCancel = false;
      })
      .addCase(finishOrder.rejected, (state) => {
        state.isLoadingFinishCancel = false;
      })

      .addCase(deleteOrder.pending, (state) => {
        state.isLoadingDelete = true;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.isLoadingDelete = false;
      })
      .addCase(deleteOrder.rejected, (state) => {
        state.isLoadingDelete = false;
      });
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { closeModal } = slice.actions;

export const getOrders = createAsyncThunk(
  'order-list',
  async (
    data: { page: number; limit: number; search?: string; due_date?: string },
    { rejectWithValue }
  ) => {
    try {
      data.page += 1;
      let param = '?page=' + data.page + '&limit=' + data.limit;

      if (!!data.due_date) {
        param += '&due_date=' + data.due_date;
      }

      if (!!data.search) {
        param += '&search=' + data.search;
      }

      const res: { data: OrderTable } = await axios.get(`/orders${param}`);
      return res;
    } catch (err) {
      throw err;
    }
  }
);

export const getOrderDetail = createAsyncThunk('orders-detail', async (data: string) => {
  try {
    const res = await axios.get(`/orders/${data}`);
    return res.data;
  } catch (err) {
    throw err;
  }
});
export const cancelOrder = createAsyncThunk('order-cancel', async (data: string) => {
  try {
    const res = await axios.get(`/orders/${data}/cancel`);
    // console.log({response: res.data})
    return res.data;
  } catch (err) {
    throw err;
  }
});

export const createOrder = createAsyncThunk(
  'order-create',
  async (data: OrderCreate, { rejectWithValue }) => {
    try {
      const res = await axios.post(`/orders`, data);
      return res.data;
    } catch (err) {
      throw err;
    }
  }
);

export const editOrder = createAsyncThunk(
  'team-edit',
  async (data: OrderEdit, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`/orders/${data.id}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const finishOrder = createAsyncThunk('order-finish', async (id: String) => {
  try {
    const res = await axios.get(`/orders/${id}/done`);
    return res.data;
  } catch (err) {
    throw err;
  }
});

export const deleteOrder = createAsyncThunk(
  'order-delete',
  async (data: string, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/orders/${data}`);
      return response.data.message;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
