import React from 'react';
import { PanelProps, GrafanaTheme } from '@grafana/data';
import { PlotlyOptions } from 'types';
import Plot from 'react-plotly.js';
import defaults from 'lodash/defaults';
import { useTheme } from '@grafana/ui';
import { FieldType, getTimeField } from '@grafana/data';

interface Props extends PanelProps<PlotlyOptions> {}

export const PlotlyPanel: React.FC<Props> = ({ options, data, width, height }) => {
  const theme = useTheme();

  let names: string[] = [];
  let bin_num: any[] = [];
  let traces: any[] = [];
  let layout_mode = {};
  let counts: { [id: string]: number[] } = {};

  for (const series of data.series) {
    const { timeField } = getTimeField(series);
    let split_names = String(series.name).split(' ').length; //length of series name
    if (split_names !== 1) {
      // bins
      let splits = String(series.name).split(' ');
      if (!bin_num.includes(Number(splits[0]))) {
        bin_num.push(Number(splits[0]));
      }

      let name = '';
      for (let i = 1; i < split_names; i++) {
        name = name + ' ' + String(splits[i]);
      }

      if (!names.includes(name)) {
        names.push(name);
      }

      if (!timeField) {
        continue;
      }

      for (const field of series.fields) {
        if (field.type !== FieldType.number) {
          continue;
        }
        console.log(series.length);
        let yaxis: number[] = [];
        for (let i = 0; i < series.length; i++) {
          yaxis.push(field.values.get(i));
        }
        let quantity = yaxis.reduce(function(a, b) {
          return a + b;
        });
        if (!(name in counts)) {
          counts[name] = [];
        }
        let copy = counts[name];
        copy.push(quantity);
        counts[name] = copy;
      }
    } else {
      // no bins
      names.push(String(series.name));
      if (!timeField) {
        continue;
      }

      for (const field of series.fields) {
        if (field.type !== FieldType.number) {
          continue;
        }
        let yaxis: number[] = [];
        for (let i = 0; i < series.length; i++) {
          yaxis.push(field.values.get(i));
        }
        let quantity = yaxis.reduce(function(a, b) {
          return a + b;
        });
        bin_num.push(quantity);
      }
    }
  }
  if (String(data.series[0].name).split(' ').length !== 1) {
    for (let i = 0; i < names.length; i++) {
      traces.push({
        x: bin_num,
        y: counts[names[i]],
        name: names[i],
        type: 'bar',
      });
    }
    layout_mode = {
      width: width,
      height: height,
      barmode: 'stack',
    };
  } else {
    traces.push({
      x: names,
      y: bin_num,
      type: 'bar',
    });
    layout_mode = {
      width: width,
      height: height,
    };
  }

  const plotlyData: Plotly.Data[] = traces;
  const plotlyLayout: Partial<Plotly.Layout> = defaults(layout_mode, defaultLayout(theme));
  return <Plot data={plotlyData} layout={plotlyLayout} />;
};

// defaultLayout resets the Plotly layout to work better with the Grafana theme.
const defaultLayout = (theme: GrafanaTheme) => ({
  margin: {
    r: 40,
    l: 40,
    t: 40,
    b: 40,
  },
  plot_bgcolor: 'rgba(0,0,0,0)', // Transparent
  paper_bgcolor: 'rgba(0,0,0,0)', // Transparent
  font: {
    color: theme.isDark ? theme.palette.white : theme.palette.black,
  },
});
