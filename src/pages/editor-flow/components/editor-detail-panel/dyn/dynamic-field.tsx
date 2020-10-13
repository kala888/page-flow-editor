import { Input, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { CheckSquareFilled, CloseCircleOutlined } from '@ant-design/icons';
import styles from './styles.less';

const { Option } = Select;

export interface IDynamicField {
  id: string;
  type: string;
  name: string;
  defaultValue?: any;
  onRemove: Function;
  onSave: Function;
}

const DynamicField: React.FC<IDynamicField> = props => {
  const { onRemove, onSave } = props;
  const [filed, setField] = useState<IDynamicField>(props);

  useEffect(() => {
    setField(props);
  }, [props]);

  const handleTypeChange = (value: string) => {
    console.log(value);
    setField(pre => ({
      ...pre,
      type: value,
    }));
  };
  const handleNameChange = (e: React.FormEvent<HTMLInputElement>) => {
    setField(pre => ({
      ...pre,
      name: e.currentTarget.value,
    }));
  };
  const handleRemove = () => {
    onRemove();
  };

  const handleSave = () => {
    onSave({
      id: filed.id,
      type: filed.type,
      name: filed.name,
    });
  };

  const type = _.get(filed, 'type', 'string');

  return (
    <div className={styles.row}>
      <Select
        defaultValue={type}
        style={{ width: 120 }}
        onChange={handleTypeChange}
      >
        <Option value="string">字符串</Option>
        <Option value="tab">Tab页</Option>
        <Option value="pagination">翻页标记</Option>
      </Select>
      <Input onBlur={handleNameChange} defaultValue={filed.name} />
      <CheckSquareFilled className={styles.icon} onClick={handleSave} />
      <CloseCircleOutlined className={styles.icon} onClick={handleRemove} />
    </div>
  );
};

export default DynamicField;
