export type DashboardState = {
  isLoading: boolean;
  isLoadingChartMonth: boolean;
  isLoadingChartYear: boolean;
  error: string | null;
  statistic: OrdersTable;
  chartDataYear: ChartTable;
  chartDataMonth: ChartTableMonth;
};

export type ChartTable = {
  meta: {
    filter_by: string;
    year: string;
    month: string;
  };
  result: ChartDetails;
  message: string;
};

export type ChartTableMonth = {
  meta: {
    filter_by: string;
    year: string;
    month: string;
  };
  result: number[];
  message: string;
};

type OrderData = {
  total: number;
  new: number;
  cancelled: number;
  comply: number;
  ongoing: number;
  overdue: number;
};

type ChartDetails = {
  year: string;
  month: string;
  data: number[];
};

type OrdersTable = {
  meta: Object;
  result: OrderData;
  message: string;
};
