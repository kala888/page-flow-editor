import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import _ from 'lodash';

import styles from './styles.less';
import DynamicField, {
  IDynamicField,
} from '@/pages/editor-flow/components/editor-detail-panel/dyn/dynamic-field';

interface IDynamicProps {
  extra: Array<any>;
  onChange?: Function;
}

const DynamicProps: React.FC<IDynamicProps> = props => {
  const { extra = [], onChange } = props;
  const [propList, setPropList] = useState(extra);

  useEffect(() => {
    if (onChange) {
      onChange(propList);
    }
  }, [propList, onChange]);

  const handleAddNew = () => {
    setPropList(pre => {
      const id = `p${Date.now().valueOf()}`;
      return _.concat([], pre, [{ id }]);
    });
  };

  const handleRemove = (item: IDynamicField) => {
    setPropList(pre => {
      return pre.filter(it => it.id !== item.id);
    });
  };

  const handleSaveItem = (item: IDynamicField) => {
    setPropList(pre => {
      const idx = _.findIndex(pre, it => item.id === it.id);
      const list = _.clone(pre);
      list[idx] = item;
      console.log('xxxx', list);
      return list;
    });
  };

  return (
    <div className={styles.container}>
      {propList.map((it: IDynamicField) => (
        <DynamicField
          key={it.id}
          {...it}
          onRemove={() => handleRemove(it)}
          onSave={handleSaveItem}
        />
      ))}
      <Button onClick={handleAddNew}>新增</Button>
    </div>
  );
};
export default DynamicProps;
