import _ from 'lodash';

import React from 'react';
import styles from './styles.less';
import { Command, constants, ContextMenu } from 'gg-editor';
import IconFont from '@/pages/editor-flow/common/icon-font';

const { EditorCommand } = constants;

const CommandList = {
  node: [EditorCommand.Copy, EditorCommand.Remove],
  edge: [EditorCommand.Remove],
  group: [EditorCommand.Copy, EditorCommand.Remove, EditorCommand.Unfold],
  canvas: [EditorCommand.Undo, EditorCommand.Redo, EditorCommand.PasteHere],
  'multi-group': [
    EditorCommand.Copy,
    EditorCommand.Paste,
    EditorCommand.Fold,
    EditorCommand.Remove,
  ],
};

//右键菜单
const FlowContextMenu = () => (
  <ContextMenu
    renderContent={(item, position, hide) => {
      const { x: left, y: top } = position;
      const actionList: Array<string> = _.get(CommandList, item.getType(), []);
      return (
        <div
          className={styles.contextMenu}
          style={{ position: 'absolute', top, left }}
        >
          {actionList.map(command => {
            return (
              <Command key={command} name={command}>
                <div className={styles.item}>
                  <IconFont type={`icon-${command}`} />
                  <span>{_.upperFirst(command)}</span>
                </div>
              </Command>
            );
          })}
        </div>
      );
    }}
  />
);

export default FlowContextMenu;
