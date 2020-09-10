import React, { useEffect, useState } from 'react';
import { Button, Form } from 'antd';
import _ from 'lodash';
import { CloseCircleOutlined } from '@ant-design/icons';

import styles from './styles.less';

interface IDynamicProps {
  extra: Array<any>;
  onChange?: Function;
}

interface IPropsItem {
  id: string;
  name: string;
  value?: any;
}

const DynamicProps: React.FC<IDynamicProps> = props => {
  // @ts-ignore
  const [editing, setEditing] = useState<IPropsItem>({});
  // @ts-ignore
  const [currentView, setCurrentView] = useState<IPropsItem>({});

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
      const name = '新属性';
      const value = '点击修改';
      return _.concat([], pre, [{ id, name, value }]);
    });
  };

  const handleRemove = (item: IPropsItem) => {
    setPropList(pre => {
      return pre.filter(it => it.id !== item.id);
    });
  };

  return (
    <Form initialValues={{ label: 11 }}>
      <div className={styles.container}>
        {propList.map((it: IPropsItem) => {
          const { id, name, value } = it;
          return (
            <div
              className={styles.row}
              key={id}
              onClick={() => {
                setEditing(it);
                setCurrentView(it);
              }}
            >
              {editing.id === id ? (
                <>
                  <input className={styles.input} value={name} />
                  <input className={styles.input} value={value} />
                </>
              ) : (
                <>
                  <div className={styles.name}>{name}</div>
                  <div className={styles.value}>{value}</div>
                </>
              )}
              {currentView.id === it.id && (
                <CloseCircleOutlined
                  onMouseOver={() => setCurrentView(it)}
                  className={styles.icon}
                  onClick={() => handleRemove(it)}
                />
              )}
            </div>
          );
        })}
        <Button onClick={handleAddNew}>新属性</Button>
      </div>
    </Form>
  );
};
export default DynamicProps;
