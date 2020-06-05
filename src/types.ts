type SeriesSize = 'sm' | 'md' | 'lg';

export interface PlotlyOptions {
  text: string;
  showSeriesCount: boolean;
  seriesCountSize: SeriesSize;
}

export interface SDictionary {
  [index: string]: number[];
}
