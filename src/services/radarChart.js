import ChartDataLabels from 'chartjs-plugin-datalabels';
import {
  Chart,
  RadarController,
  LineElement,
  PointElement,
  RadialLinearScale,
  Filler,
} from 'chart.js';
import { tr } from '@/services/translator';

Chart.register(
  RadarController,
  LineElement,
  PointElement,
  RadialLinearScale,
  Filler,
  ChartDataLabels
);

const FONT_SIZE = 18;

Chart.defaults.font.family = "'Outfit', sans-serif";
Chart.defaults.font.size = FONT_SIZE;
Chart.defaults.font.weight = 'bold';

export const createStatsChart = (contextElement, statsData) => {
  const statsChartData = {
    labels: [
      tr.messages.stats.hp,
      tr.messages.stats.attack,
      tr.messages.stats.defense,
      tr.messages.stats.specialAttack,
      tr.messages.stats.specialDefense,
      tr.messages.stats.speed,
    ],
    datasets: [
      {
        data: statsData,
        datalabels: {
          align: 'end',
          clamp: true,
          color: '#000',
          font: {
            size: FONT_SIZE,
            weight: 'bold',
          },
        },
        fill: true,
        backgroundColor: 'rgba(31, 34, 39, 0.15)',
        borderColor: '#2b2b2b',
        borderDash: [10, 5],
        pointRadius: 6,
        pointHoverRadius: 8,
        pointBackgroundColor: [
          '#f00',
          '#f08030',
          '#f8d030',
          '#6890f0',
          '#78c850',
          '#f85888',
        ],
      },
    ],
  };

  const statsChartOptions = {
    datasetFill: true,
    responsive: true,
    maintainAspectRatio: false,
    elements: {
      line: {
        borderWidth: 3,
      },
    },
    scales: {
      r: {
        min: 0,
        max: 255,
        pointLabels: {
          font: {
            size: FONT_SIZE,
          },
        },
        ticks: {
          display: false,
        },
      },
    },
  };

  return new Chart(contextElement, {
    type: 'radar',
    data: statsChartData,
    options: statsChartOptions,
    plugins: [ChartDataLabels],
  });
};
