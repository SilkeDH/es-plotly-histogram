import React from 'react';
import { PanelProps, GrafanaTheme, SelectableValue } from '@grafana/data';
import { PlotlyOptions } from 'types';
import Plot from 'react-plotly.js';
import defaults from 'lodash/defaults';
import { useTheme } from '@grafana/ui';
import { FieldType, getTimeField } from '@grafana/data';

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
  let bin_num: any[] = [];
  let traces: any[] = [];
  let names: string[] = [];
  let layout_mode = {};
  let colors: string[] = [];
  let counts: { [id: string]: number[] } = {};
  for (const series of data.series) {
    let split_names = String(series.name).split(' ').length; //length of series name
    if (split_names !== 1) {
      // bins
      let splits = String(series.name).split(' ');
      if (!bin_num.includes(Number(splits[0]))) {
        bin_num.push(Number(splits[0]));
      }
      if (typeof options.selectField !== 'undefined') {
        if (options.selectField.value === name) {
          colors.push(String(options.bgColor));
        } else {
          colors.push('');
        }
      }
    } else {
      // no bins
      names.push(String(series.name));
      if (typeof options.selectField !== 'undefined') {
        if (options.selectField.value === series.name) {
          colors.push(String(options.bgColor));
        } else {
          colors.push('');
        }
      }
    }
  }
  for (const series of data.series) {
    const { timeField } = getTimeField(series);
    let splits = String(series.name).split(' ');
    let split_names = String(series.name).split(' ').length; //length of series name
    let name = '';
    for (let i = 1; i < split_names; i++) {
      name = name + ' ' + String(splits[i]);
    }
    if (!names.includes(name)) {
      names.push(name);
    }
    if (split_names !== 1) {
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
        if (!(name in counts)) {
          counts[name] = [];
          let copy = counts[name];
          for (let i = 0; i < bin_num.length; i++) {
            if (splits[0] === bin_num[i]) {
              copy.push(quantity);
              counts[name] = copy;
            } else {
              copy.push(0);
              counts[name] = copy;
            }
          }
        }
      }
    } else {
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
    console.log(colors);
    console.log(bin_num);
    console.log(names);
    console.log(counts);
    for (let i = 0; i < names.length; i++) {
      traces.push({
        x: bin_num,
        y: counts[names[i]],
        name: names[i],
        type: 'bar',
        marker: {
          color: colors[i],
        },
      });
    }
    layout_mode = {
      width: width,
      height: height,
      barmode: 'stack',
    };
  } else {
    console.log(names);
    console.log(bin_num);
    console.log(colors);
    for (let i = 0; i < names.length; i++) {
      traces.push({
        x: [names[i]],
        y: [bin_num[i]],
        name: names[i],
        type: 'bar',
        marker: {
          color: colors[i],
        },
      });
    }
    layout_mode = {
      width: width,
      height: height,
    };
  }

  newNames.bar = names;
  // defaultLayout resets the Plotly layout to work better with the Grafana theme.
  const defaultLayout = (theme: GrafanaTheme) => ({
    xaxis: {
      title: options.XaxisLabel,
      tickangle: options.labelAngle,
    },
    yaxis: {
      title: options.YaxisLabel,
    },
    showlegend: options.showLegend,
    margin: {
      r: 40,
      l: 45,
      t: 40,
      b: options.margin + 40,
    },
    plot_bgcolor: 'rgba(0,0,0,0)', // Transparent
    paper_bgcolor: 'rgba(0,0,0,0)', // Transparent
    font: {
      color: theme.isDark ? theme.palette.white : theme.palette.black,
    },
  });
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
