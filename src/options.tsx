import React from 'react';
import { PanelOptionsEditorBuilder } from '@grafana/data';
import { ColorPicker, Input, Icon, Button, Label, Checkbox, IconButton } from '@grafana/ui';
import { config } from '@grafana/runtime';
import { PlotlyOptions } from './types';
//import { generateOptions } from './PlotlyPanel';
import { getStyles } from './config';

export const optionsBuilder = (builder: PanelOptionsEditorBuilder<PlotlyOptions>) => {
  builder
    .addBooleanSwitch({
      path: 'showToolTip',
      name: 'Show Tooltip on Hover',
      description: 'Displays the tooltip when hovering.',
      defaultValue: true,
    })
    .addBooleanSwitch({
      path: 'showZeros',
      name: 'Display zero values',
      description: 'Displays zero values.',
      defaultValue: true,
    })
    .addBooleanSwitch({
      path: 'showLegend',
      name: 'Show Legend',
      defaultValue: false,
    })
    .addRadio({
      path: 'positionLegend',
      defaultValue: 'v',
      name: 'Legend Position',
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
      path: 'legendMargin',
      name: 'Margin',
      defaultValue: -0.3,
      showIf: s => (s.positionLegend === 'h' ? true : false),
    });

  addAxesEditor(builder);
  addColorEditor(builder);
};

function addAxesEditor(builder: PanelOptionsEditorBuilder<PlotlyOptions>) {
  const category = ['Axes'];
  builder
    .addCustomEditor({
      category,
      id: 'axisXLabel',
      path: 'axisXlabel',
      name: '',
      editor: props => {
        return (
          <div>
            <Label style={{ fontSize: '14px' }}>X Axis</Label>
          </div>
        );
      },
    })
    .addBooleanSwitch({
      category,
      path: 'showX',
      name: 'Show',
      defaultValue: true,
    })
    .addRadio({
      category,
      path: 'typeX',
      defaultValue: 'category',
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
      defaultValue: 1,
      showIf: s => (s.typeX === 'number' ? true : false),
    })
    .addTextInput({
      category,
      path: 'XaxisLabel',
      name: 'Label',
    })
    .addCustomEditor({
      category,
      id: 'axisYLabel',
      path: 'axisYlabel',
      name: '',
      editor: props => {
        return (
          <div>
            <Label style={{ fontSize: '14px' }}>Right Y Axis</Label>
          </div>
        );
      },
    })
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
    .addSelect({
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
    })
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
      defaultValue: 1,
    })
    .addTextInput({
      category,
      path: 'YaxisLabel',
      name: 'Label',
    })
    .addCustomEditor({
      category,
      id: 'axisY2Label',
      path: 'axisY2label',
      name: '',
      editor: props => {
        return (
          <div>
            <Label style={{ fontSize: '14px' }}> Left Y Axis</Label>
          </div>
        );
      },
    })
    .addUnitPicker({
      category,
      path: 'unitY2',
      name: 'Unit',
      defaultValue: 'short',
    })
    .addSelect({
      category,
      path: 'scaleY2',
      name: 'Scale',
      settings: {
        options: [
          { value: 'linear', label: 'Linear' },
          { value: 'log', label: 'Logarithmic' },
        ],
      },
      defaultValue: 'linear',
    })
    .addNumberInput({
      category,
      path: 'maxY2',
      name: 'Max',
    })
    .addNumberInput({
      category,
      path: 'minY2',
      name: 'Min',
      defaultValue: 0,
    })
    .addNumberInput({
      category,
      path: 'decimalsY2',
      name: 'Decimals',
      defaultValue: 1,
    })
    .addTextInput({
      category,
      path: 'YaxisLabel2',
      name: 'Label',
    });
}

interface SiSe {
  id: string;
  name: string;
  color: string;
  negative: boolean;
  y2: boolean;
}
[];

const initialList = { id: '0', name: undefined, color: '', negative: false, y2: false };

function addColorEditor(builder: PanelOptionsEditorBuilder<PlotlyOptions>) {
  const category = ['Series Overrides'];
  builder.addCustomEditor({
    category,
    id: 'selectField',
    path: 'selectField',
    name: 'Select field',
    description: 'Sets individual properties for the selected field.',
    editor: props => {
      const [list, setList] = React.useState(props.value);
      const styles = getStyles(config.theme);
      /*const changeName = (id: string, label: string | undefined) => {
        let ye = list.map((item: SiSe) => {
          if (item.id === id) {
            return { ...item, name: label };
          } else {
            return item;
          }
        });
        setList(ye);
        props.onChange(ye);
      };*/
      const changeColor = (id: string, color: string | undefined) => {
        let ye = list.map((item: SiSe) => {
          if (item.id === id) {
            return { ...item, color: color };
          } else {
            return item;
          }
        });
        setList(ye);
        props.onChange(ye);
      };
      const changeNegative = (id: string) => {
        let ye = list.map((item: SiSe) => {
          if (item.id === id) {
            return { ...item, negative: !item.negative };
          } else {
            return item;
          }
        });
        setList(ye);
        props.onChange(ye);
      };
      const changeSecondY = (id: string) => {
        let ye = list.map((item: SiSe) => {
          if (item.id === id) {
            return { ...item, y2: !item.y2 };
          } else {
            return item;
          }
        });
        setList(ye);
        props.onChange(ye);
      };
      const addSeries = () => {
        let newList = {};
        if (list.length === 0) {
          newList = initialList;
        } else {
          newList = {
            id: String(Number(list[list.length - 1].id) + 1),
            name: '',
            color: '',
            negative: false,
            y2: false,
          };
        }
        let ye = [...list, newList];
        setList(ye);
        props.onChange(ye);
      };
      const deleteSeries = (id: string) => {
        var index = list
          .map(function(o: any) {
            return o.id;
          })
          .indexOf(id);
        list.splice(index, 1);
        setList(list);
        props.onChange(list);
      };
      return (
        <div>
          {list.map((item: SiSe) => {
            return (
              <div>
                <br></br>
                <div>
                  <p>
                    <Label>Field</Label>
                    <IconButton name="times" size="xl" surface="panel" onClick={() => deleteSeries(item.id)} />
                  </p>
                  <Label>Color</Label>
                  <p>
                    <Input
                      id="1"
                      type="text"
                      value={item.color || 'Pick Color'}
                      onBlur={(v: any) => {}}
                      prefix={
                        <div className={styles.inputPrefix}>
                          <div className={styles.colorPicker}>
                            <ColorPicker
                              color={item.color || config.theme.colors.panelBg}
                              onChange={v => {
                                changeColor(item.id, v);
                              }}
                              enableNamedColors={true}
                            />
                          </div>
                        </div>
                      }
                      suffix={
                        <Icon className={styles.trashIcon} name="trash-alt" onClick={() => changeColor(item.id, '')} />
                      }
                    />
                  </p>
                  <div>
                    <p>
                      <Checkbox
                        value={item.negative}
                        onChange={() => {
                          changeNegative(item.id);
                        }}
                        label="Negative Y-Axis"
                      />
                    </p>
                    <p>
                      <Checkbox
                        value={item.y2}
                        onChange={() => {
                          changeSecondY(item.id);
                        }}
                        label="Second Y-Axis"
                      />
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
          <br></br>
          <Button variant="secondary" onClick={() => addSeries()}>
            + Add Series Override
          </Button>
        </div>
      );
    },
    defaultValue: [],
  });
}
