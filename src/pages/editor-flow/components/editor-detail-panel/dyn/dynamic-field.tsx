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

  const handleFiledChange = (newField: any) => {
    setField(pre => {
      const v = {
        id: pre.id,
        type: pre.type || 'string',
        name: pre.name,
        ...newField,
      };
      onSave(v);
      return v;
    });
  };

  const handleTypeChange = (value: string) => {
    console.log('handle field type change', value);
    handleFiledChange({ type: value });
  };
  const handleFileNameChange = (e: React.FormEvent<HTMLInputElement>) => {
    handleFiledChange({ name: e.currentTarget.value });
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
        <Option value="integer">整数</Option>
        <Option value="decimal">浮点数</Option>
        <Option value="date">日期时间</Option>
        <Option value="boolean">布尔值</Option>
        <Option value="NA">强制无参</Option>
      </Select>
      <Input onBlur={handleFileNameChange} defaultValue={filed.name} />
      <CheckSquareFilled className={styles.icon} onClick={handleSave} />
      <CloseCircleOutlined className={styles.icon} onClick={handleRemove} />
    </div>
  );
};

export default DynamicField;
