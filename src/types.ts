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
  | 'conμgNm3';

export interface PlotlyOptions {
  showToolTip: boolean;
  tooltipOrder: string;
  showZeros: boolean;
  showY: boolean;
  unitY: unitTypes;
  unitX: unitTypes;
  scaleY: string;
  scaleX: string;
  showX: boolean;
  typeX: string;
  maxY: number;
  minY: number;
  maxX: number;
  minX: number;
  btseries: number;
  showLegend: boolean;
  selectField: undefined | { value: string; label: string };
  bgColor: undefined | string;
  YaxisLabel: string;
  XaxisLabel: string;
  positionLegend: string;
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
}
