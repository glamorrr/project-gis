import merge from 'lodash/merge';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });
import {
  Card,
  CardHeader,
  Box,
  CardProps,
  Grid,
  Select,
  MenuItem,
  useTheme,
  SelectChangeEvent,
  Stack,
  CardContent,
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { BaseOptionChart } from 'src/components/chart';
import { ChartTable, ChartTableMonth } from 'src/@types/dashboard';

// ----------------------------------------------------------------------

interface Props extends CardProps {
  title?: string;
  subheader?: string;
  onLoading?: boolean;
  chartLabels: string[];
  chartSeriesData?: ChartTable;
  chartSeriesMonth?: ChartTableMonth;
  yearsOption?: string[];
  handleChangeSeriesData?: (event: string) => void;
  selectedYear?: string;
  isMonthReport?: boolean;
  categoriesOption: string[];
  handleChangeCategoryData?: (event: string) => void;
  selectedCategory: string;
  handleChangeMonth?: (event: string) => void;
}

export default function AppAreaInstalled({
  title,
  subheader,
  onLoading,
  chartLabels,
  chartSeriesData,
  chartSeriesMonth,
  yearsOption,
  handleChangeSeriesData,
  selectedYear,
  isMonthReport,
  categoriesOption,
  handleChangeCategoryData,
  selectedCategory,
  handleChangeMonth,
  ...other
}: Props) {
  const theme = useTheme();
  const monthList = [
    {
      name: 'Januari',
      value: '1',
    },
    {
      name: 'Februari',
      value: '2',
    },
    {
      name: 'Maret',
      value: '3',
    },
    {
      name: 'April',
      value: '4',
    },
    {
      name: 'Mei',
      value: '5',
    },
    {
      name: 'Juni',
      value: '6',
    },
    {
      name: 'Juli',
      value: '7',
    },
    {
      name: 'Agustus',
      value: '8',
    },
    {
      name: 'September',
      value: '9',
    },
    {
      name: 'Oktober',
      value: '10',
    },
    {
      name: 'November',
      value: '11',
    },
    {
      name: 'Desember',
      value: '12',
    },
  ];

  const [selectedMonth, setSelectedMonth] = useState<string>(
    (new Date().getMonth() + 1).toString()
  );
  const [datesOfMonth, setDatesOfMonth] = useState<string[]>([]);

  const yearData: { name: string; data: number[] }[] = [
    { name: 'Total', data: chartSeriesData?.result.data || [0] },
  ];
  const monthData: { name: string; data: number[] }[] = [
    { name: 'Total', data: chartSeriesMonth?.result.slice(0, datesOfMonth.length) || [0] },
  ];

  // Get all dates in a month
  const getDatesInMonth = (month: number): string[] => {
    const year = new Date().getFullYear();
    const daysInMonth = new Date(year, month, 0).getDate();
    const dates: string[] = [];

    for (let day = 1; day <= daysInMonth; day++) {
      const formattedDate = `${day.toString()}`;
      dates.push(formattedDate);
    }

    return dates;
  };

  useEffect(() => {
    const temp: string[] = getDatesInMonth(Number(selectedMonth));
    setDatesOfMonth(temp);
  }, [selectedMonth]);

  const onChangeMonth = (event: SelectChangeEvent) => {
    setSelectedMonth(event.target.value);
    handleChangeMonth?.(event.target.value);
  };

  const chartOptions = merge(BaseOptionChart(), {
    xaxis: {
      categories: isMonthReport ? datesOfMonth : chartLabels,
    },
    yaxis: {
      floating: false,
      tickAmount: 5,
      max: () => {
        if (isMonthReport) {
          // if(Math.max(...monthData[0].data) < 5) return 5
          return Math.max(...monthData[0].data) < 5 ? 5 : Math.max(...monthData[0].data);
        } else {
          return Math.max(...yearData[0].data) < 5 ? 5 : Math.max(...yearData[0].data);
        }
      },
    },
  });

  return (
    <Card {...other} style={{ position: 'relative' }}>
      {onLoading && (
        <Grid
          item
          xs={12}
          md={12}
          lg={12}
          style={{
            position: 'absolute',
            top: '0',
            left: '0',
            zIndex: 9999,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CircularProgress />
        </Grid>
      )}
      <CardHeader
        title={title}
        subheader={subheader}
        action={
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing="8px"
            justifyContent="flex-end"
            alignItems="flex-end"
          >
            <Select
              value={selectedCategory}
              onChange={(e) => handleChangeCategoryData?.(e.target.value)}
              size="small"
              sx={{
                bgcolor: theme.palette.background.neutral,
              }}
            >
              {categoriesOption.map((option, index) => (
                <MenuItem key={index} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>

            {yearsOption && (
              <Select
                value={selectedYear}
                onChange={(e) => handleChangeSeriesData?.(e.target.value)}
                size="small"
                sx={{ bgcolor: theme.palette.background.neutral }}
              >
                {yearsOption &&
                  yearsOption.map((option, index) => (
                    <MenuItem key={index} value={option}>
                      {option}
                    </MenuItem>
                  ))}
              </Select>
            )}

            {isMonthReport === true ? (
              <Select
                value={selectedMonth}
                size="small"
                sx={{ bgcolor: theme.palette.background.neutral }}
                onChange={onChangeMonth}
              >
                {monthList.map((option, index) => (
                  <MenuItem key={index} value={option.value}>
                    {option.name}
                  </MenuItem>
                ))}
              </Select>
            ) : (
              ''
            )}
          </Stack>
        }
      />

      <CardContent sx={{ overflowX: 'auto', overflowY: 'hidden' }}>
        <Box sx={{ minWidth: '800px' }}>
          <ReactApexChart
            type="line"
            series={isMonthReport === true ? monthData : yearData}
            options={chartOptions}
            height={364}
          />
        </Box>
      </CardContent>
    </Card>
  );
}
