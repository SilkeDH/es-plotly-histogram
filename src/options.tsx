import React from 'react';
import { PanelOptionsEditorBuilder, GrafanaTheme } from '@grafana/data';
import { ColorPicker, Input, Icon, Button, stylesFactory } from '@grafana/ui';
import { config } from '@grafana/runtime';
import { css } from 'emotion';
import { PlotlyOptions } from './types';

export const optionsBuilder = (builder: PanelOptionsEditorBuilder<PlotlyOptions>) => {
  builder
    .addTextInput({
      path: 'YaxisLabel',
      name: 'Y-Axis Label',
      description: 'Title of the Y-Axis.',
    })
    .addTextInput({
      path: 'XaxisLabel',
      name: 'X-Axis Label',
      description: 'Title of the X-Axis.',
    })
    .addBooleanSwitch({
      path: 'showLegend',
      name: 'Show Legend',
      description: 'Displays the legend.',
      defaultValue: false,
    })
    .addNumberInput({
      path: 'labelAngle',
      name: 'X-Axis Label Angle',
      description: 'Show the labels of the X-Axis with the given angle.',
      defaultValue: 0,
    })
    .addNumberInput({
      path: 'margin',
      name: 'X-Axis Label margin',
      description: 'Adds a margin to the X-Axis labels if the names are too long.',
      defaultValue: 0,
    });

  addEditor(builder);
};

//const data: string[]= ['atlas', 'alice', 'auger', 'cms', 'belle'];

function addEditor(builder: PanelOptionsEditorBuilder<PlotlyOptions>) {
  const category = ['Series Editor'];
  builder
    .addSelect({
      category,
      path: 'selectField',
      name: 'Select field',
      settings: {
        options: [
          {
            value: 'sm',
            label: 'Small',
          },
          {
            value: 'md',
            label: 'Medium',
          },
          {
            value: 'lg',
            label: 'Large',
          },
        ],
      },
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
        console.log(props.onChange);
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
              onBlur={(v: any) => {
                console.log('CLICK');
              }}
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

const getStyles = stylesFactory((theme: GrafanaTheme) => {
  return {
    colorPicker: css`
      padding: 0 ${theme.spacing.sm};
    `,
    inputPrefix: css`
      display: flex;
      align-items: center;
    `,
    trashIcon: css`
      color: ${theme.colors.textWeak};
      cursor: pointer;
      &:hover {
        color: ${theme.colors.text};
      }
    `,
  };
});
