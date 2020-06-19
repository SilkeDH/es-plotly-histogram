# Histogram Panel

The Histogram Panel can show histograms for queries made with Elasticsearch in Grafana.

This panel was made since some basic histogram queries couldn't be displayed as expected with Grafana's Graph Panel.

## Installation

To add this Panel to your plugins folder, you have to clone this repository as following:

```
grafana-cli --pluginUrl https://github.com/SilkeDH/es-plotly-histogram/archive/master.zip plugins install es-hist
```

## Options

This panel uses Plotly to plot the histograms and has the following properties:

- **Y-Axis Label**:
  Sets the Y-Axis label.

- **X-Axis Label**:
  Sets the X-Axis label.
  
- **Show Legend**:
  Enables the legend.

- **X-Axes Label Angle**:
  Sets the angle of the displayes label in the X-Axis.

- **X-Axes Bottom Margin**:
  Adds a margin at the bottom if the X-Axis labels are too long.

- **Select field**:
  Edits specific series. 

## Learn more and contribute

You can contribute to this repository! Feel free to add more options if you want or report bugs :)

Used:

- [React Plotly.js](https://plotly.com/javascript/react/)
