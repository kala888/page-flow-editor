import { Command } from 'gg-editor';
import React from 'react';
import _ from 'lodash';
import { Button, Tooltip } from 'antd';
import IconFont from '../../common/icon-font';
import styles from './flow-toolbar.less';

interface ToolbarButtonProps {
  command: string;
  icon?: string;
  text?: string;
  onClick?: Function;
}

const ToolbarButton: React.FC<ToolbarButtonProps> = props => {
  const { command, icon, text, onClick } = props;

  const content = (
    <Tooltip
      title={text || _.upperFirst(command)}
      placement="bottom"
      overlayClassName={styles.tooltip}
    >
      <IconFont type={`icon-${icon || command}`} />
    </Tooltip>
  );

  if (_.isFunction(onClick)) {
    return (
      <Button type="text" className={styles.actionButton} onClick={onClick}>
        {content}
      </Button>
    );
  }

  return <Command name={command}>{content}</Command>;
};

export default ToolbarButton;
