import React from 'react'
import _ from 'lodash'
import { Card, Form, Input } from 'antd'
import { DetailPanel, withEditorContext } from 'gg-editor'
import { EditorContextProps } from 'gg-editor/lib/components/EditorContext'
import { DetailPanelComponentProps } from 'gg-editor/lib/components/DetailPanel'

const { Item } = Form
const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
}

interface PanelProps extends EditorContextProps, DetailPanelComponentProps {
}

interface PanelState {
}

class Panel extends React.Component<PanelProps, PanelState> {
  handleSubmit = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e && e.preventDefault) {
      e.preventDefault()
    }
    // @ts-ignore
    const { form } = this.props
    form.validateFieldsAndScroll((err: object, values: object) => {
      if (err) {
        return
      }
      const { type, nodes, edges, executeCommand } = this.props
      const item = type === 'node' ? nodes[0] : edges[0]
      if (!item) {
        return
      }
      executeCommand('update', {
        id: item.get('id'),
        updateModel: {
          ...values,
        },
      })
    })
  }
  renderNodeDetail = () => {
    return (
      <Form>
        <Item label="Label" {...formItemLayout}>
          <Input onBlur={this.handleSubmit} />
        </Item>
      </Form>
    )
  }
  renderEdgeDetail = () => {
    return (
      <Form>
        <Item label="Label" {...formItemLayout}>
          <Input onBlur={this.handleSubmit} />
        </Item>
      </Form>
    )
  }
  renderMultiDetail = () => {
    return null
  }
  renderCanvasDetail = () => {
    return <p>Select a node or edge :)</p>
  }

  render() {
    const { type } = this.props
    return (
      <Card title={_.upperFirst(type)} bordered={false}>
        {type === 'node' && this.renderNodeDetail()}
        {type === 'edge' && this.renderEdgeDetail()}
        {type === 'multi' && this.renderMultiDetail()}
        {type === 'canvas' && this.renderCanvasDetail()}
      </Card>
    )
  }
}

export const NodePanel = DetailPanel.create<PanelProps>('node')(withEditorContext(Panel))
export const EdgePanel = DetailPanel.create<PanelProps>('edge')(withEditorContext(Panel))
export const MultiPanel = DetailPanel.create<PanelProps>('multi')(withEditorContext(Panel))
export const CanvasPanel = DetailPanel.create<PanelProps>('canvas')(withEditorContext(Panel))
