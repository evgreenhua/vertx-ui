import * as G6 from '@antv/g6';

import './shape';
import './antv-extension';

import * as Util from './utils';
import {CustomEdge, CustomNode, CustomShape} from './common/interfaces';

import Editor from './components/Editor';
import Flow from './components/Flow';
import Mind from './components/Mind';
import Topology from "./components/Topology";
import Command from './components/Command';
import ItemPanel, {Item} from './components/ItemPanel';
import DetailPanel from './components/DetailPanel';
import {RegisterBehavior, RegisterCommand, RegisterEdge, RegisterNode} from './components/Register';
import {withEditorContext} from './components/EditorContext';
import {baseCommand} from './components/Graph/command/base';

import ItemPopover from './plugins/ItemPopover';
import ContextMenu from './plugins/ContextMenu';
import EditableLabel from './plugins/EditableLabel';

import global from './common/global';
import commandManager from './common/commandManager';
import behaviorManager from './common/behaviorManager';

export {
    G6,
    Util,
    Flow,
    Topology,
    Mind,
    Command,
    Item,
    ItemPanel,
    DetailPanel,
    RegisterNode,
    RegisterEdge,
    RegisterCommand,
    RegisterBehavior,
    withEditorContext,
    baseCommand,
    ItemPopover,
    ContextMenu,
    EditableLabel,
    global,
    commandManager,
    behaviorManager,
    CustomEdge,
    CustomShape,
    CustomNode,
};

export default Editor;
