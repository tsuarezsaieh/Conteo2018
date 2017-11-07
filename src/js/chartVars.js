import {
  COLOR_MG,
  COLOR_NAU,
  COLOR_SDD,
  COLOR_DECRECER,
  COLOR_DECRECER_ALT,
  COLOR_IA,
  COLOR_IND,
  COLOR_JJCC,
} from './movementColors.js';

export const defaultChartsOptions = {
  responsive: true,
  legend: {
    display: false,
  },
  tooltips: {
    callbacks: {
      label: function (tooltipItem, data) {
        let val = data.datasets[tooltipItem.datasetIndex]
          .data[tooltipItem.index];
        let lab = data.labels[tooltipItem.index];
        return `${lab}: ${val}%`;
      },
    },
  },
};

export const defaultPolarChartsOptions = {
  responsive: true,
  legend: {
    display: false,
  },
  tooltips: {
    callbacks: {
      label: function (tooltipItem, data) {
        let val = data.datasets[tooltipItem.datasetIndex]
          .data[tooltipItem.index];
        let lab = data.labels[tooltipItem.index];
        return `${lab}: ${val}`;
      },
    },
  },
};

export function listaDefaultData() {
  return {
    labels: ['1a', 'Decrecer', 'NAU', 'Solidaridad'],
    datasets: [
      {
        data: [25, 25, 25, 25],
        backgroundColor: [
          COLOR_MG,
          COLOR_DECRECER,
          COLOR_NAU,
          COLOR_SDD,
        ],
      },
    ],
  };
};

export function supDefaultData() {
  return {
    labels: [
      'J. Rodríguez', 'F. Vera', 'A. Gallardo', 'C. Portales', 'C. Sepúlveda',
    ],
    datasets: [
      {
        data: [20, 20, 20, 20, 20],
        backgroundColor: [
          COLOR_MG,
          COLOR_DECRECER,
          COLOR_NAU,
          COLOR_IA,
          COLOR_SDD,
        ],
      },
    ],
  };
};

export function terriDefaultData() {
  return {
      labels: [
      'MG',
      'Decrecer',
      'NAU',
      'Solidaridad',
      'Independiente',
      'Izquierda Autónoma',
    
    ],
      datasets: [
        {
          data: [0, 0, 0, 0, 0, 0],
          backgroundColor: [
            COLOR_MG,
            COLOR_DECRECER_ALT,
            COLOR_NAU,
            COLOR_SDD,
            COLOR_IND,
            COLOR_IA,

          ],
        },
      ],
    };
};
