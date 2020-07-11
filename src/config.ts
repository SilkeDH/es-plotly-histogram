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
  Time: 'Time',
  hertz: '1/s',
  ns: 'ns',
  µs: 'µs',
  ms: 'ms',
  s: 's',
  m: 'm',
  bits: 'b',
  bytes: 'B',
  kbytes: 'KiB',
  mbytes: 'MiB',
  gbytes: 'GiB',
  tbytes: 'TiB',
  pbytes: 'PiB',
  decbits: 'b',
  decbytes: 'B',
  deckbytes: 'kB',
  decmbytes: 'MB',
  decgbytes: 'GB',
  dectbytes: 'TB',
  decpbytes: 'PB',
  pps: 'pps',
  bps: 'bps',
  Bps: 'Bps',
  KBs: 'kBs',
  Kbits: 'kbps',
  MBs: 'MBs',
  Mbits: 'Mbps',
  GBs: 'GBs',
  Gbits: 'Gbps',
  TBs: 'TBs',
  Tbits: 'Tbps',
  PBs: 'PBs',
  Pbits: 'Pbps',
  Hs: 'H/s',
  KHs: 'kH/s',
  MHs: 'MH/s',
  GHs: 'GH/s',
  THs: 'TH/s',
  PHs: 'PH/s',
  EHS: 'EH/s',
  Throughput: 'Throughput',
  cps: 'cps',
  ops: 'ops',
  reqps: 'reqps',
  rps: 'rps',
  wps: 'wps',
  iops: 'iops',
  cpm: 'cpm',
  opm: 'opm',
  rpm: 'rpm',
  wpm: 'wpm',
};

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
