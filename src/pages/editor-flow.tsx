import React, { useRef, useState } from 'react';
import Designer from '../editor-flow';
import { Button, Modal } from 'antd';
import 'antd/dist/antd.less';
import styles from './editor-flow.less';

export default function EditorFlow() {
  const wfdRef = useRef<Designer>();
  const [visible, setVisible] = useState(false);
  const handleExport = () => {
    const theData = wfdRef.current?.graph.save();
    console.log('theData', theData);
  };
  const handleSave = () => {
    handleExport();
  };
  const handleImport = () => {
    handleExport();
  };
  const height = 600;

  return (
    <div>
      <Button className={styles.btn} onClick={handleSave}>
        保存
      </Button>
      <Button className={styles.btn} onClick={handleExport}>
        导出
      </Button>
      <Button className={styles.btn} onClick={handleImport}>
        导入
      </Button>
      <Button className={styles.btn} onClick={() => setVisible(true)}>
        查看流程图
      </Button>

      <Designer
        // @ts-ignore
        ref={wfdRef}
        data={mockData}
        height={height}
        mode={'edit'}
      />
      <Modal
        title="查看流程图"
        visible={visible}
        onCancel={() => setVisible(false)}
        width={800}
        maskClosable={false}
        footer={null}
        destroyOnClose
        bodyStyle={{ height }}
      >
        <Designer data={mockData} height={height - 40} isView />
      </Modal>
    </div>
  );
}

const mockData = {
  nodes: [
    {
      clazz: 'start',
      type: 'start-node',
      x: 149,
      y: 100,
      id: 'start1600144131012',
    },
    {
      clazz: 'page',
      label: '页面',
      type: 'page-node',
      x: 253,
      y: 104,
      id: 'page1600144132773',
    },
    {
      clazz: 'page',
      label: '页面',
      type: 'page-node',
      x: 423,
      y: 239.5,
      id: 'page1600144136291',
    },
    {
      clazz: 'page',
      label: '页面',
      type: 'page-node',
      x: 451.5,
      y: 22.5,
      id: 'page1600144139542',
    },
    {
      clazz: 'condition',
      size: [40, 40],
      type: 'condition-node',
      x: 557.5,
      y: 159,
      id: 'condition1600144141335',
    },
    {
      clazz: 'form',
      label: '表单',
      type: 'form-node',
      x: 900,
      y: 154.5,
      id: 'form1600144143527',
    },
    {
      clazz: 'form',
      label: '表单',
      type: 'form-node',
      x: 771,
      y: 296,
      id: 'form1600144146929',
    },
    {
      clazz: 'page',
      label: '页面',
      type: 'page-node',
      x: 757.5,
      y: 56.5,
      id: 'page1600144148713',
    },
  ],
  edges: [
    {
      clazz: 'flow',
      source: 'start1600144131012',
      target: 'page1600144132773',
      sourceAnchor: 1,
      targetAnchor: 3,
      type: 'flow-polyline-round',
      id: 'edge31',
    },
    {
      clazz: 'flow',
      source: 'page1600144132773',
      target: 'page1600144139542',
      sourceAnchor: 1,
      targetAnchor: 3,
      type: 'flow-polyline-round',
      id: 'edge32',
    },
    {
      clazz: 'flow',
      source: 'page1600144132773',
      target: 'page1600144136291',
      sourceAnchor: 1,
      targetAnchor: 3,
      type: 'flow-polyline-round',
      id: 'edge33',
    },
    {
      clazz: 'flow',
      source: 'page1600144136291',
      target: 'condition1600144141335',
      sourceAnchor: 1,
      targetAnchor: 3,
      type: 'flow-polyline-round',
      id: 'edge34',
    },
    {
      clazz: 'flow',
      source: 'condition1600144141335',
      target: 'page1600144148713',
      sourceAnchor: 1,
      targetAnchor: 3,
      type: 'flow-polyline-round',
      id: 'edge35',
    },
    {
      clazz: 'flow',
      source: 'condition1600144141335',
      target: 'form1600144143527',
      sourceAnchor: 1,
      targetAnchor: 3,
      type: 'flow-polyline-round',
      id: 'edge36',
    },
    {
      clazz: 'flow',
      source: 'condition1600144141335',
      target: 'form1600144146929',
      sourceAnchor: 1,
      targetAnchor: 3,
      type: 'flow-polyline-round',
      id: 'edge37',
    },
  ],
  combos: [],
  groups: [],
};
