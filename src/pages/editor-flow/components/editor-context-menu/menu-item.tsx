import { Command } from 'gg-editor';
import _ from 'lodash';
import React from 'react';
import IconFont from '../../common/icon-font';
import styles from './styles.less';

interface MenuItemProps {
  command: string;
  icon?: string;
  text?: string;
}

const MenuItem: React.FC<MenuItemProps> = props => {
  const { command, icon, text } = props;

  return (
    <Command name={command}>
      <div className={styles.item}>
        <IconFont type={`icon-${icon || command}`} />
        <span>{text || _.upperFirst(command)}</span>
      </div>
    </Command>
  );
};

export default MenuItem;
