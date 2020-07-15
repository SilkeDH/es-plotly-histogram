type unitTypes =
  | 'none'
  | 'Misc'
  | 'short'
  | 'percent'
  | 'percentunit'
  | 'humidity'
  | 'dB'
  | 'Acceleration'
  | 'accMS2'
  | 'accFS2'
  | 'accG'
  | 'Angle'
  | 'degree'
  | 'grad'
  | 'radian'
  | 'arcmin'
  | 'arcsec'
  | 'Area'
  | 'areaM2'
  | 'areaF2'
  | 'areaMI2'
  | 'Computation'
  | 'flops'
  | 'gflops'
  | 'tflops'
  | 'pflops'
  | 'eflops'
  | 'Concentration'
  | 'ppm'
  | 'conppb'
  | 'conngm3'
  | 'conngNm3'
  | 'conμgm3'
  | 'conμgNm3'
  | 'Time'
  | 'hertz'
  | 'ns'
  | 'µs'
  | 'ms'
  | 's'
  | 'm'
  | 'bits'
  | 'bytes'
  | 'kbytes'
  | 'mbytes'
  | 'gbytes'
  | 'tbytes'
  | 'pbytes'
  | 'decbits'
  | 'decbytes'
  | 'deckbytes'
  | 'decmbytes'
  | 'decgbytes'
  | 'dectbytes'
  | 'decpbytes'
  | 'pps'
  | 'bps'
  | 'Bps'
  | 'KBs'
  | 'Kbits'
  | 'MBs'
  | 'Mbits'
  | 'GBs'
  | 'Gbits'
  | 'TBs'
  | 'Tbits'
  | 'PBs'
  | 'Pbits'
  | 'Hs'
  | 'KHs'
  | 'MHs'
  | 'GHs'
  | 'THs'
  | 'PHs'
  | 'EHS'
  | 'Throughput'
  | 'cps'
  | 'ops'
  | 'reqps'
  | 'rps'
  | 'wps'
  | 'iops'
  | 'cpm'
  | 'opm'
  | 'rpm'
  | 'wpm';

export interface PlotlyOptions {
  stack: boolean;
  showToolTip: boolean;
  tooltipOrder: string;
  plotlyModebar: boolean;
  showZeros: boolean;
  showY: boolean;
  showY2: boolean;
  unitY: unitTypes;
  unitY2: unitTypes;
  unitX: unitTypes;
  scaleY: string;
  scaleY2: string;
  scaleX: string;
  showX: boolean;
  typeX: string;
  maxY: number;
  maxY2: number;
  minY: number;
  minY2: number;
  maxX: number;
  minX: number;
  decimalsY: number;
  decimalsY2: number;
  decimalsX: number;
  btseries: number;
  showLegend: boolean;
  selectField:
    | Array<{
        id: string;
        name: string;
        color: string;
        negative: boolean;
        y2: boolean;
      }>
    | undefined;
  bgColor: undefined | string;
  YaxisLabel: string;
  YaxisLabel2: string;
  XaxisLabel: string;
  positionLegend: string;
  legendMargin: number;
}

export interface UnitOptions {
  Misc: string;
  none: string;
  short: string;
  percent: string;
  percentunit: string;
  humidity: string;
  dB: string;
  Acceleration: string;
  accMS2: string;
  accFS2: string;
  accG: string;
  Angle: string;
  degree: string;
  radian: string;
  grad: string;
  arcmin: string;
  arcsec: string;
  Area: string;
  areaM2: string;
  areaF2: string;
  areaMI2: string;
  Computation: string;
  flops: string;
  mflops: string;
  gflops: string;
  tflops: string;
  pflops: string;
  eflops: string;
  Concentration: string;
  ppm: string;
  conppb: string;
  conngm3: string;
  conngNm3: string;
  conμgm3: string;
  conμgNm3: string;
  Time: string;
  hertz: string;
  ns: string;
  µs: string;
  ms: string;
  s: string;
  m: string;
  bits: string;
  bytes: string;
  kbytes: string;
  mbytes: string;
  gbytes: string;
  tbytes: string;
  pbytes: string;
  decbits: string;
  decbytes: string;
  deckbytes: string;
  decmbytes: string;
  decgbytes: string;
  dectbytes: string;
  decpbytes: string;
  pps: string;
  bps: string;
  Bps: string;
  KBs: string;
  Kbits: string;
  MBs: string;
  Mbits: string;
  GBs: string;
  Gbits: string;
  TBs: string;
  Tbits: string;
  PBs: string;
  Pbits: string;
  Hs: string;
  KHs: string;
  MHs: string;
  GHs: string;
  THs: string;
  PHs: string;
  EHS: string;
  Throughput: string;
  cps: string;
  ops: string;
  reqps: string;
  rps: string;
  wps: string;
  iops: string;
  cpm: string;
  opm: string;
  rpm: string;
  wpm: string;
}
