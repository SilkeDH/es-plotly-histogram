import { PanelData } from '@grafana/data';
import { PlotlyOptions, UnitOptions } from 'types';
import { FieldType, getTimeField } from '@grafana/data';
import { unitValues } from './config';

export function getSeriesNameValue(data: PanelData, options: PlotlyOptions) {
  let names: string[] = []; // Stores field names.
  let bin_num: any[] = []; // Stores bining id.
  let counts: { [id: string]: any[] } = {}; // Stores a dictionary with the field and y value.
  // Iterate over every serie in the dataframe.
  for (const series of data.series) {
    const { timeField } = getTimeField(series);
    let split_names = String(series.name).split(' ').length; // Look if name has blank space to detect bins.
    if (split_names !== 1) {
      console.log('Binning histogram.');
      // bins
      let splits = String(series.name).split(' ');
      if (!bin_num.includes(Number(splits[0]))) {
        bin_num.push(Number(splits[0]));
      }
      console.log(bin_num);
      let zeros = bin_num.map(() => null); // TODO: Change to null or another value.
      if (!timeField) {
        continue;
      }
      let name = ''; // field names
      for (let i = 1; i < split_names; i++) {
        // Concatenate name if needed.
        name = name + String(splits[i]) + ' ';
      }
      if (!names.includes(name)) {
        names.push(name);
      }
      console.log(names);
      // y values
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
          counts[name] = zeros;
        }
        let copy = counts[name];
        for (let i = 0; i < bin_num.length; i++) {
          if (Number(splits[0]) === bin_num[i]) {
            copy[i] = quantity;
            counts[name] = copy;
          }
        }
      }
      console.log(counts);
    } else {
      // no bins
      console.log('No binning histogram.');
      names.push(String(series.name));
      console.log(names);
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
        // sums values since query is based on time series (due ES DS bug).
        let quantity = yaxis.reduce(function(a, b) {
          return a + b;
        });
        bin_num.push(quantity);
      }
      console.log(bin_num);
    }
  }
  return { bins: bin_num, names: names, counts: counts };
}

export function applyOptions(
  options: PlotlyOptions,
  data: { bins: any[]; names: string[]; counts: { [id: string]: number[] } }
) {
  // Defining color states.
  // TODO create external interface for data.
  let colors: string[] = [];
  for (const name of data.names) {
    if (typeof options.selectField !== 'undefined') {
      if (options.selectField.value === name) {
        colors.push(String(options.bgColor));
      } else {
        colors.push('');
      }
    }
  }
  return { colors: colors };
}

export function generateTraces(
  data: { bins: any[]; names: string[]; counts: { [id: string]: number[] } },
  options: PlotlyOptions,
  props: { colors: string[] },
  bin: boolean
) {
  let traces: any[] = [];
  if (Object.keys(data.counts).length === 0) {
    //no bins
    for (let i = 0; i < data.names.length; i++) {
      traces.push({
        x: [data.names[i]],
        y: [data.bins[i]],
        name: data.names[i],
        type: 'bar',
        marker: {
          color: props.colors[i],
        },
        hoverinfo: options.showToolTip ? 'all' : 'none',
      });
    }
  } else {
    for (let i = 0; i < data.names.length; i++) {
      traces.push({
        x: data.bins,
        y: data.counts[data.names[i]],
        name: data.names[i],
        type: 'bar',
        marker: {
          color: props.colors[i],
        },
        hoverinfo: options.showToolTip ? 'all' : 'none',
      });
    }
  }
  return traces;
}

export function generateLayout(options: PlotlyOptions, bin: boolean, width: number, height: number) {
  const getKeyValue = <U extends keyof T, T extends object>(key: U) => (obj: T) => obj[key];
  const getUnitYString = getKeyValue<keyof UnitOptions, UnitOptions>(options.unitY)(unitValues);
  const getUnitXString = getKeyValue<keyof UnitOptions, UnitOptions>(options.unitX)(unitValues);
  let suffixY = ' ';
  let suffixX = ' ';
  let tickformatX = '';
  let tickformatY = '';
  // Unit for Y axis.
  switch (getUnitYString) {
    case 'none': {
      suffixY += '';
      tickformatY = 'none';
      break;
    }
    case 'short': {
      suffixY += '';
      break;
    }
    default: {
      suffixY += unitValues[options.unitY];
      break;
    }
  }
  // Unit for X axis.
  switch (getUnitXString) {
    case 'none': {
      tickformatX = 'none';
      suffixX += '';
      break;
    }
    case 'short': {
      suffixX += '';
      break;
    }
    default: {
      suffixX += unitValues[options.unitX];
      break;
    }
  }
  let barmode = '';
  if (bin === true) {
    barmode = 'stack';
  } else {
    barmode = 'none';
  }
  return {
    width: width,
    height: height,
    barmode: barmode,
    showlegend: options.showLegend,
    legend: { orientation: options.positionLegend },
    yaxis: {
      title: options.YaxisLabel,
      visible: options.showY,
      range: [options.minY, options.maxY],
      ticksuffix: suffixY,
      automargin: true,
      tickformat: tickformatY,
    },
    xaxis: {
      title: options.XaxisLabel,
      visible: options.showX,
      range: [options.minX, options.maxX],
      ticksuffix: suffixX,
      automargin: true,
      type: options.typeX,
      tickformat: tickformatX,
    },
  };
}
