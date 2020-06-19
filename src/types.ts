export interface PlotlyOptions {
  btseries: number;
  showLegend: boolean;
  labelAngle: number;
  margin: number;
  selectField: undefined | { value: string; label: string };
  bgColor: undefined | string;
  YaxisLabel: string;
  XaxisLabel: string;
}
