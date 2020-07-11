import React from 'react';
import { PanelProps, GrafanaTheme, SelectableValue } from '@grafana/data';
import { PlotlyOptions } from 'types';
import Plot from 'react-plotly.js';
import defaults from 'lodash/defaults';
import { useTheme } from '@grafana/ui';
import { getSeriesNameValue, applyOptions, generateTraces, generateLayout } from './GetPlotlyPanel';

interface Props extends PanelProps<PlotlyOptions> {}

class SetGetNames {
  private _bar: string[] = [];
  get bar(): string[] {
    return this._bar;
  }
  set bar(value: string[]) {
    this._bar = value;
  }
}

var newNames = new SetGetNames();

export const PlotlyPanel: React.FC<Props> = ({ options, data, width, height }) => {
  const theme = useTheme();
  let processedData = getSeriesNameValue(data, options);
  //console.log(processedData);
  let properties = applyOptions(options, processedData);
  //console.log(properties);
  let binning = Object.keys(processedData.counts).length === 0 ? false : true;
  let traces = generateTraces(processedData, options, properties, binning);
  //console.log(traces);
  let layout_mode = generateLayout(options, binning, width, height);
  //console.log(layout_mode);
  const defaultLayout = (theme: GrafanaTheme) => ({
    width: width,
    height: height,
    margin: {
      r: 40,
      l: 45,
      t: 40,
      b: 45,
    },
    plot_bgcolor: 'rgba(0,0,0,0)', // Transparent
    paper_bgcolor: 'rgba(0,0,0,0)', // Transparent
    font: {
      color: theme.isDark ? theme.palette.white : theme.palette.black,
    },
  });
  newNames.bar = processedData.names;
  const plotlyData: Plotly.Data[] = traces;
  const plotlyLayout: Partial<Plotly.Layout> = defaults(layout_mode, defaultLayout(theme));
  return <Plot data={plotlyData} layout={plotlyLayout} />;
};

export const generateOptions = (desc = false) => {
  return newNames.bar.map<SelectableValue<string>>(name => ({
    value: name,
    label: name,
  }));
};
