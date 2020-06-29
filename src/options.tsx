import React from 'react';
import { PanelOptionsEditorBuilder } from '@grafana/data';
import { ColorPicker, Input, Icon, Button, Select } from '@grafana/ui';
import { config } from '@grafana/runtime';
import { PlotlyOptions } from './types';
import { generateOptions } from './PlotlyPanel';
import { getStyles } from './config';

export const optionsBuilder = (builder: PanelOptionsEditorBuilder<PlotlyOptions>) => {
  builder
    .addBooleanSwitch({
      path: 'showToolTip',
      name: 'Show Tooltip on Hover',
      description: 'Displays the tooltip when hovering.',
      defaultValue: true,
    })
    .addSelect({
      path: 'tooltipOrder',
      name: 'Tooltip labels order',
      settings: {
        options: [
          { value: 'None', label: 'None' },
          { value: 'Asc', label: 'Asc' },
          { value: 'Desc', label: 'Desc' },
        ],
      },
      defaultValue: 'None',
    })
    .addBooleanSwitch({
      path: 'showZeros',
      name: 'Display zero values',
      description: 'Displays zero values.',
      defaultValue: true,
    });
  addYAxisEditor(builder);
  addXAxisEditor(builder);
  addSeriesOverride(builder);
  addLegendEditor(builder);
};

function addYAxisEditor(builder: PanelOptionsEditorBuilder<PlotlyOptions>) {
  const category = ['Y-Axis'];
  builder
    .addBooleanSwitch({
      category,
      path: 'showY',
      name: 'Show',
      defaultValue: true,
    })
    .addUnitPicker({
      category,
      path: 'unitY',
      name: 'Unit',
      defaultValue: 'short',
    })
    /*.addSelect({
      category,
      path: 'scaleY',
      name: 'Scale',
      settings: {
        options: [
          { value: 'linear', label: 'Linear' },
          { value: 'log', label: 'Logarithmic' },
        ],
      },
      defaultValue: 'linear',
    })*/
    .addNumberInput({
      category,
      path: 'maxY',
      name: 'Max',
    })
    .addNumberInput({
      category,
      path: 'minY',
      name: 'Min',
      defaultValue: 0,
    })
    .addNumberInput({
      category,
      path: 'decimalsY',
      name: 'Decimals',
      defaultValue: 0,
    })
    .addTextInput({
      category,
      path: 'YaxisLabel',
      name: 'Label',
    });
}

function addXAxisEditor(builder: PanelOptionsEditorBuilder<PlotlyOptions>) {
  const category = ['X-Axis'];
  builder
    .addBooleanSwitch({
      category,
      path: 'showX',
      name: 'Show',
      defaultValue: true,
    })
    .addRadio({
      category,
      path: 'typeX',
      defaultValue: 'number',
      name: 'Type',
      settings: {
        options: [
          {
            value: 'category',
            label: 'Category',
          },
          {
            value: 'number',
            label: 'Number',
          },
        ],
      },
    })
    .addUnitPicker({
      category,
      path: 'unitX',
      name: 'Unit',
      defaultValue: 'short',
    })
    /*.addSelect({
      category,
      path: 'scaleX',
      name: 'Scale',
      settings: {
        options: [
          { value: 'linear', label: 'Linear' },
          { value: 'log', label: 'Logarithmic' },
        ],
      },
      defaultValue: 'linear',
      showIf: s => (s.typeX === 'num' ? true : false),
    })*/
    .addNumberInput({
      category,
      path: 'maxX',
      name: 'Max',
      showIf: s => (s.typeX === 'number' ? true : false),
    })
    .addNumberInput({
      category,
      path: 'minX',
      name: 'Min',
      defaultValue: 0,
      showIf: s => (s.typeX === 'number' ? true : false),
    })
    .addNumberInput({
      category,
      path: 'decimalsX',
      name: 'Decimals',
      defaultValue: 0,
      showIf: s => (s.typeX === 'number' ? true : false),
    })
    .addTextInput({
      category,
      path: 'XaxisLabel',
      name: 'Label',
    });
}

function addLegendEditor(builder: PanelOptionsEditorBuilder<PlotlyOptions>) {
  const category = ['Legend'];
  builder
    .addBooleanSwitch({
      category,
      path: 'showLegend',
      name: 'Show',
      defaultValue: false,
    })
    .addRadio({
      category,
      path: 'positionLegend',
      defaultValue: 'h',
      name: 'Position',
      settings: {
        options: [
          {
            value: 'h',
            label: 'Horizontal',
          },
          {
            value: 'v',
            label: 'Vertical',
          },
        ],
      },
    })
    .addNumberInput({
      category,
      path: 'legendMargin',
      name: 'Margin',
      defaultValue: -0.3,
      showIf: s => (s.positionLegend === 'h' ? true : false),
    });
}

function addSeriesOverride(builder: PanelOptionsEditorBuilder<PlotlyOptions>) {
  const category = ['Series Override'];
  builder
    .addCustomEditor({
      category,
      id: 'selectField',
      path: 'selectField',
      name: 'Select field',
      editor: props => {
        const styles = getStyles(config.theme);
        return (
          <div>
            <Select
              options={generateOptions()}
              value={props.value}
              onChange={v => {
                props.onChange(v);
              }}
              prefix={<Icon className={styles.trashIcon} name="sync" onClick={() => props.onChange(undefined)} />}
            />
          </div>
        );
      },
      defaultValue: '',
    })
    .addCustomEditor({
      category,
      id: 'bgColor',
      path: 'bgColor',
      name: 'Background Color',
      editor: props => {
        const styles = getStyles(config.theme);
        let prefix: React.ReactNode = null;
        let suffix: React.ReactNode = null;
        if (props.value) {
          suffix = <Icon className={styles.trashIcon} name="trash-alt" onClick={() => props.onChange(undefined)} />;
        }
        prefix = (
          <div className={styles.inputPrefix}>
            <div className={styles.colorPicker}>
              <ColorPicker
                color={props.value || config.theme.colors.panelBg}
                onChange={props.onChange}
                enableNamedColors={true}
              />
            </div>
          </div>
        );
        return (
          <div>
            <Input
              type="text"
              value={props.value || 'Pick Color'}
              onBlur={(v: any) => {}}
              prefix={prefix}
              suffix={suffix}
            />
          </div>
        );
      },
      defaultValue: '',
    })
    .addCustomEditor({
      category,
      id: 'btseries',
      path: 'btseries',
      name: '',
      editor: props => {
        return (
          <div>
            <Button variant="secondary" icon="plus" onClick={() => props.onChange(props.value + 1)}>
              New
            </Button>
          </div>
        );
      },
      defaultValue: 0,
    });
}
