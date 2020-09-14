import React from 'react';
import { Card, Form, Input, InputNumber, Select, Switch, Tabs } from 'antd';
import _ from 'lodash';
import { isEmpty } from '@/service/util';
import DynamicProps from '@/pages/editor-flow/components/editor-detail-panel/dyn/dynamic-props';
import { IDynamicField } from '@/pages/editor-flow/components/editor-detail-panel/dyn/dynamic-field';

const { TabPane } = Tabs;
const { Item } = Form;
const { Option } = Select;

const inlineFormItemLayout = {
  labelCol: {
    sm: { span: 8 },
  },
  wrapperCol: {
    sm: { span: 16 },
  },
};

const startPropList: Array<CommonField> = [
  { id: 1, label: 'label', name: 'label' },
  { id: 2, label: 'name', name: 'name' },
];

const edgePropList: Array<CommonField> = [
  { id: 1, label: 'label', name: 'label' },
  { id: 2, label: 'name', name: 'name' },
  { id: 3, label: 'comments', name: 'comments' },
  { id: 4, label: 'login', name: 'needLogin', type: 'boolean' },
  {
    id: 5,
    label: 'shape',
    name: 'shape',
    defaultValue: 'flow-smooth',
    type: 'select',
    options: [
      { id: 'flow-smooth' },
      { id: 'flow-polyline' },
      { id: 'flow-polyline-round' },
    ],
  },
];

const pagePropList: Array<CommonField> = [
  { id: 1, label: 'label', name: 'label' },
  { id: 2, label: 'name', name: 'name' },
  {
    id: 3,
    label: 'type',
    name: 'type',
    type: 'select',
    defaultValue: 'other',
    options: [{ id: 'list' }, { id: 'detail' }, { id: 'other' }],
  },
  {
    id: 4,
    label: 'displayMode',
    name: 'displayMode',
    type: 'select',
    defaultValue: 'card',
    options: [
      { id: 'auto' },
      { id: 'only-title' },
      { id: 'single-image' },
      { id: 'double-image' },
      { id: 'three-image' },
      { id: 'image-on-bottom' },
      { id: 'image-on-top' },
      { id: 'card' },
      { id: 'image-on-left' },
      { id: 'document' },
      { id: 'big-card' },
      { id: 'h-card' },
      { id: 'v-card' },
      { id: 'user' },
      { id: 'product' },
      { id: 'hot-artist' },
      { id: 'rich-text' },
    ],
  },
  { id: 5, label: 'comments', name: 'comments' },
  { id: 6, label: 'cache', name: 'cache', type: 'integer' },
  { id: 7, label: 'refresh', name: 'canRefresh', type: 'boolean' },
  { id: 8, label: 'footprint', name: 'hasFootPrint', type: 'boolean' },
];

interface DetailFormProps {
  type: string;
  propsAPI?: any;
}

interface FieldOption {
  id: string | number;
  name?: string;
}

interface CommonField {
  id: string | number;
  name: string;
  label: string;
  type?: string;
  defaultValue?: any;
  options?: Array<FieldOption>;
}

class DetailForm extends React.Component<DetailFormProps> {
  get item() {
    const { propsAPI } = this.props;
    return propsAPI.getSelected()[0];
  }

  handleFieldChange = (values: any) => {
    const { propsAPI } = this.props;
    const { getSelected, executeCommand, update } = propsAPI;

    setTimeout(() => {
      const item = getSelected()[0];
      if (!item) {
        return;
      }
      executeCommand(() => {
        update(item, {
          ...values,
        });
      });
    }, 0);
  };

  handleInputBlur = (type: string) => (
    e: React.FormEvent<HTMLInputElement>,
  ) => {
    e.preventDefault();
    this.handleFieldChange({
      [type]: e.currentTarget.value,
    });
  };

  renderNodeDetail = (propList: Array<CommonField>) => {
    const values = this.getCommonPropValues(propList);
    return (
      <Form initialValues={values}>{this.renderCommonPropList(propList)}</Form>
    );
  };

  renderEdgeDetail = () => {
    const { extra } = this.item.getModel();
    return (
      <Tabs defaultActiveKey="1" centered>
        <TabPane tab="属性" key="1">
          {this.renderCommonPropList(edgePropList)}
        </TabPane>
        <TabPane tab="请求参数" key="2">
          <DynamicProps
            extra={extra}
            onChange={(result: Array<IDynamicField>) => {
              this.handleFieldChange({
                extra: result,
              });
            }}
          />
        </TabPane>
      </Tabs>
    );
  };

  renderGroupDetail = () => {
    const { label = '新建分组' } = this.item.getModel();

    return (
      <Form initialValues={{ label }}>
        <Item label="Label" name="label" {...inlineFormItemLayout}>
          <Input onBlur={this.handleInputBlur('label')} />
        </Item>
      </Form>
    );
  };

  getCommonPropValues = (list: Array<CommonField> = []) => {
    const result = {};
    const model = this.item.getModel();
    _.forEach(list, it => {
      result[it.name] = _.get(model, it.name);
    });
    return result;
  };

  renderFlexField = (field: CommonField) => {
    const { name, type = 'input', options = [], defaultValue } = field;

    if (type === 'integer') {
      return (
        <InputNumber
          onBlur={this.handleInputBlur(name)}
          style={{ width: '100%' }}
        />
      );
    }

    if (type === 'select') {
      return (
        <Select
          defaultValue={defaultValue}
          onChange={(value: any) => this.handleFieldChange({ [name]: value })}
        >
          {options.map(it => (
            <Option key={it.id} value={it.id}>
              {it.id || it.name}
            </Option>
          ))}
        </Select>
      );
    }

    if (type === 'boolean') {
      return (
        <Switch
          defaultChecked
          onChange={(value: any) => this.handleFieldChange({ [name]: value })}
        />
      );
    }
    return <Input onBlur={this.handleInputBlur(name)} />;
  };

  renderCommonPropList = (list: Array<CommonField>) => {
    if (isEmpty(list)) {
      return null;
    }

    return list.map(field => {
      const { id, label, name } = field;
      const key = id + name;
      return (
        <Item
          key={key}
          label={label}
          name={name}
          {...inlineFormItemLayout}
          style={{ marginBottom: 6 }}
        >
          {this.renderFlexField(field)}
        </Item>
      );
    });
  };

  render() {
    const { type } = this.props;
    if (!this.item) {
      return null;
    }
    const { xTypeName, xType } = this.item.getModel();
    const title = xTypeName || (type === 'edge' ? '边' : type);
    return (
      <Card type="inner" size="small" title={title} bordered={false}>
        {type === 'node' &&
          xType === 'page' &&
          this.renderNodeDetail(pagePropList)}
        {type === 'node' &&
          xType === 'form' &&
          this.renderNodeDetail(pagePropList)}
        {type === 'node' &&
          xType === 'start' &&
          this.renderNodeDetail(startPropList)}
        {type === 'edge' && this.renderEdgeDetail()}
        {type === 'group' && this.renderGroupDetail()}
      </Card>
    );
  }
}

// export default withPropsAPI(DetailForm as any)
export default DetailForm;
