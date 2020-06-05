import React from 'react';
import { PanelProps, GrafanaTheme } from '@grafana/data';
import { PlotlyOptions, SDictionary } from 'types';
import Plot from 'react-plotly.js';
import defaults from 'lodash/defaults';
import { useTheme } from '@grafana/ui';
import { FieldType, getTimeField } from '@grafana/data';

interface Props extends PanelProps<PlotlyOptions> {}

export const PlotlyPanel: React.FC<Props> = ({ options, data, width, height }) => {
  const theme = useTheme();

  let yaxis: number[] = [];
  let names: string[] = [];
  let bin_num: any[] = [];
  var counts = {} as SDictionary;

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
        name = name + String(splits[i]);
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
        for (let i = 0; i < series.length; i++) {
          yaxis.push(field.values.get(i));
        }
        let quantity = yaxis.reduce(function(a, b) {
          return a + b;
        });
        console.log(!(String(series.name) in counts));
        if (!(String(series.name) in counts)) {
          counts[name] = [];
        }
        counts[name].push(quantity);
      }
    } else {
      // not bins
      names.push(String(series.name));
      bin_num.push(String(series.name));
      if (!timeField) {
        continue;
      }

      for (const field of series.fields) {
        if (field.type !== FieldType.number) {
          continue;
        }
        for (let i = 0; i < data.series[0].length; i++) {
          yaxis.push(data.series[0].fields[1].values.get(i));
        }
        let quantity = yaxis.reduce(function(a, b) {
          return a + b;
        });
        if (!(String(series.name) in counts)) {
          counts[String(series.name)] = [];
        }
        counts[String(series.name)].push(quantity);
      }
    }
  }

  console.log(bin_num);
  console.log(counts);
  console.log(names);

  let traces: any[] = [];
  for (let i = 0; i < names.length; i++) {
    traces.push({
      x: bin_num,
      y: counts[names[i]],
      name: names[i],
      type: 'bar',
    });
  }

  const plotlyData: Plotly.Data[] = traces;

  const plotlyLayout: Partial<Plotly.Layout> = defaults(
    {
      width: width,
      height: height,
      barmode: 'stack',
    },
    defaultLayout(theme)
  );

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
