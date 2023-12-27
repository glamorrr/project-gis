import { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { Grid } from '@mui/material';
import AppWidgetSummary from './AppWidgetSummary';
import { useDispatch, useSelector } from '../../redux/store';
import {
  getDashboardDetail,
  getChartDataYearly,
  getChartDataMonthly,
} from 'src/redux/slices/dashboard';
import { fPercentChart } from 'src/utils/formatNumber';
import AppAreaInstalled from './AppAreaInstalled';

// ----------------------------------------------------------------------

export default function GeneralApp() {
  const yearFilter = ['2019', '2020', '2021', '2022', '2023'];
  const categoryFilter = ['Total', 'New', 'Cancel', 'Comply', 'Ongoing', 'Overdue'];
  const [selectedYear, setSelectedYear] = useState<string>(new Date().getFullYear().toString());
  const [selectedMonth, setSelectedMonth] = useState<string>(
    (new Date().getMonth() + 1).toString()
  );

  const [selectedCategory, setSelectedCategory] = useState<any>({
    chartMonth: 'Total',
    chartYear: 'Total',
  });

  const [indexDate, setIndexDate] = useState<string[]>([]);
  const theme = useTheme();

  const { statistic, chartDataYear, chartDataMonth, isLoadingChartYear, isLoadingChartMonth } =
    useSelector((state) => state.dashboard);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDashboardDetail());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getChartDataYearly({ filter_by: selectedCategory.chartYear, year: selectedYear }));
  }, [selectedYear, selectedCategory.chartYear]);

  useEffect(() => {
    dispatch(
      getChartDataMonthly({
        filter_by: selectedCategory.chartMonth,
        year: selectedYear,
        month: selectedMonth,
      })
    );
  }, [selectedMonth, selectedCategory.chartMonth, selectedYear]);

  useEffect(() => {
    if (selectedMonth.length > 0) {
      const dateArray = Array.from({ length: selectedMonth.length }, (_, i) => i);

      const dateStringArray: string[] = dateArray.map((num) => num.toString());

      setIndexDate(dateStringArray);
    }
  }, [selectedMonth.length]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <AppWidgetSummary
          title="Total Order"
          percent={100}
          total={statistic.result.total}
          chartColor={theme.palette.primary.main}
          chartData={[0, 0, 0, 0]}
        />
      </Grid>

      <Grid item xs={12} md={4}>
        <AppWidgetSummary
          title="New Order"
          percent={fPercentChart(statistic.result.new, statistic.result.total)}
          total={statistic.result.new}
          chartColor={theme.palette.chart?.blue[0]}
          chartData={[0, 0, 0, 0]}
        />
      </Grid>

      <Grid item xs={12} md={4}>
        <AppWidgetSummary
          title="Cancel Order"
          percent={fPercentChart(statistic.result.cancelled, statistic.result.total)}
          total={statistic.result.cancelled}
          chartColor={theme.palette.chart?.red[0]}
          chartData={[0, 0, 0, 0]}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <AppWidgetSummary
          title="Comply Order"
          percent={fPercentChart(statistic.result.comply, statistic.result.total)}
          total={statistic.result.comply}
          chartColor={theme.palette.primary.main}
          chartData={[0, 0, 0, 0]}
        />
      </Grid>

      <Grid item xs={12} md={4}>
        <AppWidgetSummary
          title="Ongoing Order"
          percent={fPercentChart(statistic.result.ongoing, statistic.result.total)}
          total={statistic.result.ongoing}
          chartColor={theme.palette.chart?.blue[0]}
          chartData={[0, 0, 0, 0]}
        />
      </Grid>

      <Grid item xs={12} md={4}>
        <AppWidgetSummary
          title="Overdue Order"
          percent={fPercentChart(statistic.result.overdue, statistic.result.total)}
          total={statistic.result.overdue}
          chartColor={theme.palette.chart?.red[0]}
          chartData={[0, 0, 0, 0]}
        />
      </Grid>
      <Grid item xs={12} md={12} lg={12}>
        <AppAreaInstalled
          title={`${selectedCategory.chartYear} Order`}
          onLoading={isLoadingChartYear}
          chartLabels={[
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
          ]}
          chartSeriesData={chartDataYear}
          yearsOption={yearFilter}
          handleChangeSeriesData={setSelectedYear}
          selectedYear={selectedYear}
          categoriesOption={categoryFilter}
          handleChangeCategoryData={(e: string) =>
            setSelectedCategory({ chartYear: e, chartMonth: selectedCategory.chartMonth })
          }
          selectedCategory={selectedCategory.chartYear}
        />
      </Grid>
      <Grid item xs={12} md={12} lg={12}>
        {chartDataMonth.result.length > 0 && (
          <AppAreaInstalled
            title={`${selectedCategory.chartMonth} Order`}
            onLoading={isLoadingChartMonth}
            chartLabels={indexDate}
            chartSeriesMonth={chartDataMonth}
            isMonthReport={true}
            categoriesOption={categoryFilter}
            handleChangeCategoryData={(e: string) =>
              setSelectedCategory({ chartYear: selectedCategory.chartYear, chartMonth: e })
            }
            selectedCategory={selectedCategory.chartMonth}
            handleChangeMonth={setSelectedMonth}
          />
        )}
      </Grid>
    </Grid>
  );
}
