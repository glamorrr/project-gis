import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';
import { DashboardState, ChartTable, ChartTableMonth } from '../../@types/dashboard';

const initialState: DashboardState = {
  isLoading: false,
  isLoadingChartMonth: false,
  isLoadingChartYear: false,
  error: null,
  statistic: {
    meta: {},
    result: {
      total: 0,
      new: 0,
      cancelled: 0,
      comply: 0,
      ongoing: 0,
      overdue: 0,
    },
    message: '',
  },
  chartDataYear: {
    meta: {
      filter_by: '',
      year: '',
      month: '',
    },
    result: {
      year: '',
      month: '',
      data: [],
    },
    message: '',
  },
  chartDataMonth: {
    meta: {
      filter_by: '',
      year: '',
      month: '',
    },
    result: [],
    message: '',
  },
};

const slice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    hasError(state, action) {
      state.isLoadingChartMonth = false;
      state.isLoadingChartYear = false;
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDashboardDetail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDashboardDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.statistic = action.payload;
      })
      .addCase(getDashboardDetail.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(getChartDataYearly.pending, (state) => {
        state.isLoadingChartYear = true;
      })
      .addCase(getChartDataYearly.fulfilled, (state, action) => {
        state.isLoadingChartYear = false;
        state.chartDataYear = action.payload;
      })
      .addCase(getChartDataYearly.rejected, (state, action) => {
        state.isLoadingChartYear = false;
      })
      .addCase(getChartDataMonthly.pending, (state) => {
        state.isLoadingChartMonth = true;
      })
      .addCase(getChartDataMonthly.fulfilled, (state, action) => {
        state.isLoadingChartMonth = false;
        state.chartDataMonth = action.payload;
      })
      .addCase(getChartDataMonthly.rejected, (state, action) => {
        state.isLoadingChartMonth = false;
      });
  },
});

export default slice.reducer;

// Get detail order
export const getDashboardDetail = createAsyncThunk('dashboard-detail', async () => {
  try {
    const res = await axios.get('/dashboard/orders');
    return res.data;
  } catch (err) {
    throw err;
  }
});

// Get data for chart
export const getChartDataYearly = createAsyncThunk(
  'chart-data-year',
  async (data: { filter_by: string; year: string }) => {
    try {
      let param = '?filter_by=' + data.filter_by.toLowerCase() + '&year=' + data.year;
      param = data.filter_by === 'Total' ? '?year=' + data.year : param;
      const res: { data: ChartTable } = await axios.get(`/dashboard${param}`);
      return res.data;
    } catch (err) {
      throw err;
    }
  }
);

export const getChartDataMonthly = createAsyncThunk(
  'chart-data-month',
  async (data: { filter_by: string; year: string; month: string }) => {
    try {
      let param =
        '?filter_by=' +
        data.filter_by.toLowerCase() +
        '&year=' +
        data.year +
        '&month=' +
        data.month;
      const res: { data: ChartTableMonth } = await axios.get(`/dashboard${param}`);
      return res.data;
    } catch (err) {
      throw err;
    }
  }
);
