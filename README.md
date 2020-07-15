# Histogram Panel

The Histogram Panel can show histograms for queries made with Elasticsearch in Grafana.

This panel was made since some basic histogram queries couldn't be displayed as expected with Grafana's Graph Panel.

Normal vs Stacked:
<p align="center">
<img src="https://github.com/SilkeDH/es-plotly-histogram/blob/master/figures/hist_modes.png" width="800"/>
</p>

Categorical vs. Numerical X-Axis : 
<p align="center">
<img src="https://github.com/SilkeDH/es-plotly-histogram/blob/master/figures/hist_catvsnum.png" width="800"/>
</p>

Unstacked vs. Stacked:
<p align="center">
<img src="https://github.com/SilkeDH/es-plotly-histogram/blob/master/figures/hist_unstacked.png" width="400"/>
<img src="https://github.com/SilkeDH/es-plotly-histogram/blob/master/figures/hist_stacked.png" width="400"/>
</p>

## Installation

To add this Panel to your plugins folder, you have to clone this repository as following:

```
grafana-cli --pluginUrl https://github.com/SilkeDH/es-plotly-histogram/archive/master.zip plugins install es-hist
```

## Options

This panel uses Plotly to plot the histograms and has the following properties:

- **Display**:
  - **Stacking**: Stacks or unstacks bars if possible.
  - **Show Tooltip on Hover**: Displays the tooltip when hovering.
  - **Display zero values**: Displays zero values.
  - **Show Plotly Modebar**: Displays Plotlys' modebar.
  - **Show Legend**: Shows legend. There are two modes: Vertical and Horizontal. If Horizontal is selected, an input field will appear letting the user set the position of the legend.
  
- **Axes**:
  - **X Axis**: 
    - **Type**: There are two modes: Category and Number. Category displays the X axis as Strings, without any order and blank spaces. Number displays the X-Axis as a range of numbers. See figure above.
    - **Unit**: Displays the suffix chosen in the X-Axis.
    - **Max**: Sets the X-Axis maximum value. Only in type Number.
    - **Min**: Sets the X-Axis minimum value. Only in type Number.
    - **Decimals**: Sets the number of decimals to be displayed. Only in type Number.
    - **Label**: Sets X Axis title.
    
  - **Right/Left Y Axis**:
    - **Unit**: Displays the suffix chosen in the X-Axis.
    - **Scale**: Displays values in Linear or Logarithmic scale.
    - **Max**: Sets the Left/Right Y-Axis maximum value.
    - **Min**: Sets the Left/Right Y-Axis minimum value.
    - **Decimals**: Sets the number of decimals to be displayed.
    - **Label**: Sets Left/Right Y Axis title.
 
- **Series Overrides**:
  - **Add Series Override**: Adds a new override.
  - **Field**: Select the field to apply override.
  - **Color**: Color picker for the selected field.
  - **Negative Y-Axis**: Sets the fields Y-Axis value to negative.
  - **Second Y-Axis**: Sets the field value to the Left Y-Axis.
  
## Plotly Modebar 
The plots were made with React Plotly.js which include a modebar in every plot that allows the user interact with the plot. This bar allos the user: 
  - Download the plot as a png image.
  - Zoom by select the area to be zoomed.
  - Pan, move the bars in the plot.
  - Box select.
  - Lasso select.
  - Zoom in.
  - Zoom out.
  - Autoscale.
  - Reset Axes.
  - Toggle spikelines.
  - Show closest data on hover.
  - Compare data on hover.

## Issues 
Sadly, this plugin comes with some issues that were not resolved yet.
  - When using the Logarithmic scale, displaying the plot in the dashboard displays the plotted bars outside the X-Axis. This issue appears sometimes in "Edit" mode.
  - When overriding a series, the functions *Negative Y-Axis* and *Second Y-Axis* only work well for non-stacked plots. The reason is that this plugins does not create separate bars when using this function in the X-Axis, so they override the other ones located there.
  
## Notes
This plugin was developed when there was an issue regarding the Elastic Search plugin. The queries only worked if they were designed as date histogram. Therefore, when binning, this plugin sums through all values to get the total.

## Learn more and contribute

You can contribute to this repository! Feel free to add more options if you want or report bugs :)

Used:

- [React Plotly.js](https://plotly.com/javascript/react/)
