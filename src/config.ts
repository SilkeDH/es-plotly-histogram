import { css } from 'emotion';
import { GrafanaTheme } from '@grafana/data';
import { stylesFactory } from '@grafana/ui';

// Mapping unitpicker
export const unitValues = {
  Misc: 'Misc',
  none: 'none',
  short: 'short',
  percent: '%',
  percentunit: '%%',
  humidity: '%H',
  dB: 'dB',
  Acceleration: 'Acceleration',
  accMS2: 'm/sec²',
  accFS2: 'f/sec²',
  accG: 'g',
  Angle: 'Angle',
  degree: '°',
  radian: 'rad',
  grad: 'grad',
  arcmin: 'arcmin',
  arcsec: 'arcsec',
  Area: 'Area',
  areaM2: 'm²',
  areaF2: 'ft²',
  areaMI2: 'mi²',
  Computation: 'Computation',
  flops: 'FLOP/s',
  mflops: 'MFLOP/s',
  gflops: 'GFLOP/s',
  tflops: 'TFLOP/s',
  pflops: 'PFLOP/s',
  eflops: 'EFLOP/s',
  Concentration: 'Concentration',
  ppm: 'ppm',
  conppb: 'ppb',
  conngm3: 'ng/m³',
  conngNm3: 'ng/Mm³',
  conμgm3: 'μg/m³',
  conμgNm3: 'μg/Nm³',
};

// Not used. Instead unitPicker.
export const options = [
  {
    label: 'Misc',
    value: 'Misc',
    items: [
      {
        label: 'none',
        value: 'none',
      },
      {
        label: 'short',
        value: 'short',
      },
      {
        label: 'percent(0-100)',
        value: '%',
      },
      {
        label: 'Humidity (%H)',
        value: '%H',
      },
      {
        label: 'decibel',
        value: 'db',
      },
    ],
  },
  {
    label: 'Acceleration',
    value: 'Acceleration',
    items: [
      {
        label: 'Meters/sec²',
        value: 'm/sec²',
      },
      {
        label: 'Feet/sec²',
        value: 'f/sec²',
      },
      {
        label: 'G unit',
        value: 'g',
      },
    ],
  },
  {
    label: 'Angle',
    value: 'Angle',
    items: [
      {
        label: 'Degrees(°)',
        value: '°',
      },
      {
        label: 'Radians',
        value: 'rad',
      },
      {
        label: 'Gradian',
        value: 'grad',
      },
      {
        label: 'Arc Minutes',
        value: 'arcmin',
      },
      {
        label: 'Arc Seconds',
        value: 'arcsec',
      },
    ],
  },
  {
    label: 'Area',
    value: 'Area',
    items: [
      {
        label: 'Square Meters (m²)',
        value: 'm²',
      },
      {
        label: 'Square Feet (ft²)',
        value: 'ft²',
      },
      {
        label: 'Square miles (mi²)',
        value: 'mi²',
      },
    ],
  },
  {
    label: 'Computation',
    value: 'Computation',
    items: [
      {
        label: 'FLOP/s',
        value: 'FLOP/s',
      },
      {
        label: 'MFLOP/s',
        value: 'FLOP/s',
      },
      {
        label: 'GFLOP/s',
        value: 'GFLOP/s',
      },
      {
        label: 'TFLOP/s',
        value: 'TFLOP/s',
      },
      {
        label: 'PFLOP/s',
        value: 'PFLOP/s',
      },
      {
        label: 'EFLOP/s',
        value: 'EFLOP/s',
      },
    ],
  },
  {
    label: 'Concentration',
    value: 'Concentration',
    items: [
      {
        label: 'parts-per-million (ppm)',
        value: 'ppm',
      },
      {
        label: 'parts-per-billion (ppb)',
        value: 'ppb',
      },
      {
        label: 'nanogram per cubic meter (ng/m³)',
        value: 'ng/m³',
      },
      {
        label: 'nanogram per normal cubic meter (ng/Nm³)',
        value: 'ng/Nm³',
      },
      {
        label: 'microgram per cubic meter (μg/m³)',
        value: 'μg/m³',
      },
      {
        label: 'microgram per normal cubic meter (μg/Nm³)',
        value: 'μg/Nm³',
      },
    ],
  },
];

export const getStyles = stylesFactory((theme: GrafanaTheme) => {
  return {
    colorPicker: css`
      padding: 0 ${theme.spacing.sm};
    `,
    inputPrefix: css`
      display: flex;
      align-items: center;
    `,
    trashIcon: css`
      color: ${theme.colors.textWeak};
      cursor: pointer;
      &:hover {
        color: ${theme.colors.text};
      }
    `,
  };
});
