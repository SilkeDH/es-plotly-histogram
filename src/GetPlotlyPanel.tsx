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
    if (split_names !== 1 && options.stack) {
      //console.log('Binning histogram.');
      // bins
      let splits = String(series.name).split(' ');
      if (!bin_num.includes(Number(splits[0]))) {
        bin_num.push(Number(splits[0]));
      }
      //console.log(bin_num);
      let zeros = bin_num.map(() => null);
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
      //console.log(names);
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
            if (options.showZeros) {
              copy[i] = quantity;
            } else {
              if (quantity === 0) {
                copy[i] = null;
              } else {
                copy[i] = quantity;
              }
            }
            counts[name] = copy;
          }
        }
      }
      //console.log(counts);
    } else {
      // no bins
      //console.log('No binning histogram.');
      names.push(String(series.name));
      //console.log(names);
      if (!timeField) {
        continue;
      }
      for (const field of series.fields) {
        if (field.type !== FieldType.number) {
          continue;
        }
        let yaxis: any[] = [];
        for (let i = 0; i < series.length; i++) {
          if (options.showZeros) {
            yaxis.push(field.values.get(i));
          } else {
            if (field.values.get(i) === 0) {
              yaxis.push(null);
            } else {
              yaxis.push(field.values.get(i));
            }
          }
        }
        // sums values since query is based on time series (due ES DS bug).
        let quantity = yaxis.reduce(function(a, b) {
          return a + b;
        });
        if (options.showZeros) {
          bin_num.push(quantity);
        } else {
          if (quantity === 0) {
            bin_num.push(null);
          } else {
            bin_num.push(quantity);
          }
        }
      }
      //console.log(bin_num);
    }
  }
  return { bins: bin_num, names: names, counts: counts };
}

export function applyOptions(
  options: PlotlyOptions,
  data: { bins: any[]; names: string[]; counts: { [id: string]: number[] } }
) {
  let series_options = options.selectField;
  let series_color: { [id: string]: string } = {};
  let series_negation: { [id: string]: boolean } = {};
  let series_y2: { [id: string]: boolean } = {};
  let colors: string[] = [];
  let negation: boolean[] = [];
  let y2: boolean[] = [];
  for (const name of data.names) {
    series_color[name] = '';
    series_negation[name] = false;
    series_y2[name] = false;
  }
  if (series_options !== undefined) {
    for (const override of series_options) {
      series_color[override.name] = override.color;
      series_negation[override.name] = override.negative;
      series_y2[override.name] = override.y2;
    }
  }
  for (const name of data.names) {
    colors.push(series_color[name]);
    negation.push(series_negation[name]);
    y2.push(series_y2[name]);
  }
  return { colors: colors, negation: negation, y2: y2 };
}

export function generateTraces(
  data: { bins: any[]; names: string[]; counts: { [id: string]: number[] } },
  options: PlotlyOptions,
  props: { colors: string[]; negation: boolean[]; y2: boolean[] },
  bin: boolean
) {
  let traces: any[] = [];
  if (Object.keys(data.counts).length === 0) {
    //no bins
    for (let i = 0; i < data.names.length; i++) {
      if (props.negation[i] === true) {
        data.bins[i] = -1 * data.bins[i];
      }
      if (props.y2[i] === true) {
        traces.push({
          x: [data.names[i]],
          y: [data.bins[i]],
          name: data.names[i],
          type: 'bar',
          marker: {
            color: props.colors[i],
          },
          yaxis: 'y2',
          hoverinfo: options.showToolTip ? 'all' : 'none',
        });
      } else {
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
    }
  } else {
    for (let i = 0; i < data.names.length; i++) {
      if (props.negation[i] === true) {
        for (let j = 0; j < data.counts[data.names[i]].length; j++) {
          data.counts[data.names[i]][j] = -1 * data.counts[data.names[i]][j];
        }
      }
      if (props.y2[i] === true) {
        traces.push({
          x: data.bins,
          y: data.counts[data.names[i]],
          name: data.names[i],
          type: 'bar',
          marker: {
            color: props.colors[i],
          },
          yaxis: 'y2',
          hoverinfo: options.showToolTip ? 'all' : 'none',
        });
      } else {
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
  }
  return traces;
}

export function generateLayout(options: PlotlyOptions, bin: boolean, width: number, height: number) {
  const getKeyValue = <U extends keyof T, T extends object>(key: U) => (obj: T) => obj[key];
  const getUnitYString = getKeyValue<keyof UnitOptions, UnitOptions>(options.unitY)(unitValues);
  const getUnitYString2 = getKeyValue<keyof UnitOptions, UnitOptions>(options.unitY2)(unitValues);
  const getUnitXString = getKeyValue<keyof UnitOptions, UnitOptions>(options.unitX)(unitValues);
  let suffixY = ' ';
  let suffixX = ' ';
  let suffixY2 = ' ';
  let tickformatX = '';
  let tickformatY = '';
  let tickformatY2 = '';
  // Unit for Y axis.
  switch (getUnitYString) {
    case 'none': {
      suffixY += '';
      tickformatY = '.' + String(options.decimalsY) + 'f';
      break;
    }
    case 'short': {
      suffixY += '';
      tickformatY = '.' + String(options.decimalsY) + 's';
      break;
    }
    default: {
      suffixY += unitValues[options.unitY];
      tickformatY = '.' + String(options.decimalsY) + 's';
      break;
    }
  }
  // Unit for Y2 axis.
  switch (getUnitYString2) {
    case 'none': {
      suffixY2 += '';
      tickformatY2 = '.' + String(options.decimalsY2) + 'f';
      break;
    }
    case 'short': {
      suffixY2 += '';
      tickformatY2 = '.' + String(options.decimalsY2) + 's';
      break;
    }
    default: {
      suffixY2 += unitValues[options.unitY2];
      tickformatY2 = '.' + String(options.decimalsY2) + 's';
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
      tickformatX = '.' + String(options.decimalsX) + 's';
      break;
    }
    default: {
      suffixX += unitValues[options.unitX];
      tickformatX = '.' + String(options.decimalsX) + 's';
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
    legend: {
      orientation: options.positionLegend,
      y: options.positionLegend === 'h' ? options.legendMargin : 1,
    },
    yaxis: {
      title: options.YaxisLabel,
      showgrid: true,
      visible: options.showY,
      range: [options.minY, options.maxY],
      ticksuffix: suffixY,
      automargin: true,
      tickformat: tickformatY,
      type: options.scaleY,
    },
    yaxis2: {
      title: options.YaxisLabel2,
      showgrid: true,
      range: [options.minY2, options.maxY2],
      ticksuffix: suffixY2,
      automargin: true,
      tickformat: tickformatY2,
      type: options.scaleY2,
      overlaying: 'y',
      side: 'right',
    },
    xaxis: {
      showgrid: true,
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
