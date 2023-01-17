import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { Chart, ArcElement, Tooltip, Legend, Title } from 'chart.js';

import { fetchStatistical } from 'apps/admin/src/redux/admin/action';
import { State } from 'apps/admin/src/redux/reducers';
import { Loading } from '@front/loading';
import { PieChartDiv } from './styles';

Chart.register(ArcElement, Tooltip, Legend, Title);

const PieChart = () => {
  const { pieData, isLoading } = useSelector((state: State) => state.admin);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchStatistical());
  }, []);

  const options: any = {
    elements: {
      arc: {
        borderWidth: 0,
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'right',
      },
      title: {
        display: true,
        text: 'Thống kê bình luận',
        align: 'start',
        font: {
          size: 16,
        },
        padding: 10,
      },
    },
  };

  const data = {
    labels: pieData.map((val: any) => val.x),
    datasets: [
      {
        data: pieData.map((val: any) => val.y),
        backgroundColor: [
          '#00ffc8',
          '#ea00ff',
          '#e02b2b',
          '#2600ff',
          '#00d9ff',
          '#00ff0d',
        ],
        hoverBackgroundColor: [
          '#00ffc8',
          '#ea00ff',
          '#e02b2b',
          '#2600ff',
          '#00d9ff',
          '#00ff0d',
        ],
      },
    ],
  };
  console.log('data', data);
  return (
    <PieChartDiv>
      {isLoading ? (
        <Loading />
      ) : (
        <Doughnut className="padding-title" data={data} options={options} />
      )}
    </PieChartDiv>
  );
};

export default PieChart;
