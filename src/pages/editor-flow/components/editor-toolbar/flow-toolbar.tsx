import { Divider } from 'antd'
import React from 'react'
import { constants } from 'gg-editor'
import ToolbarButton from './toolbar-button'
import styles from './flow-toolbar.less'

const { EditorCommand } = constants;

const FlowToolbar: React.FC<any> = () => (
  <div className={styles.toolbar}>
    <ToolbarButton command={EditorCommand.Undo} />
    <ToolbarButton command={EditorCommand.Redo} />
    <ToolbarButton command={EditorCommand.Add} />
    <Divider type="vertical" />
    <ToolbarButton command={EditorCommand.Update} />
    <ToolbarButton command={EditorCommand.Copy} />
    <ToolbarButton command={EditorCommand.Paste} />
    <ToolbarButton command={EditorCommand.Remove} />
    <Divider type="vertical" />
    <ToolbarButton command={EditorCommand.ZoomIn} icon="zoom-in" text="Zoom In" />
    <ToolbarButton command={EditorCommand.ZoomOut} icon="zoom-out" text="Zoom Out" />
    <Divider type="vertical" />
    {/*<ToolbarButton command={EditorCommand.Subtopic} icon="fit-map" text="Fit Map" />*/}
    {/*<ToolbarButton command={EditorCommand.Topic} icon="actual-size" text="Actual Size" />*/}
    {/*<Divider type="vertical" />*/}
    {/*<ToolbarButton command={EditorCommand.Fold} icon="group" text="Add Group" />*/}
    {/*<ToolbarButton command={EditorCommand.Unfold} icon="ungroup" text="Ungroup" />*/}
  </div>
)

export default FlowToolbar
