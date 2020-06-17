import { PanelPlugin } from '@grafana/data';
import { PlotlyOptions } from './types';
import { PlotlyPanel } from './PlotlyPanel';
import { optionsBuilder } from './options';

export const plugin = new PanelPlugin<PlotlyOptions>(PlotlyPanel).setNoPadding().setPanelOptions(optionsBuilder);
