import { Col, message, Row } from 'antd';
import GGEditor, { Flow } from 'gg-editor';
import _ from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import EditorMinimap from './components/editor-minimap';
import FlowContextMenu from './components/editor-context-menu/flow-context-menu';
import FlowDetailPanel from './components/editor-detail-panel/flow-detail-panel';
import FlowItemPanel from './components/editor-item-panel/flow-Item-panel';
import FlowToolbar from './components/editor-toolbar/flow-toolbar';
import styles from './styles.less';
import GraphOptionBar from '@/pages/editor-flow/components/editor-toolbar/graph-option-bar';
import { loadLocalGraph } from '@/service/util';

GGEditor.setTrackable(false);

const EditorFlow = () => {
  const flow = useRef<React.Component>(null);
  const [data, setData] = useState({});

  const handleRefreshData = _.memoize((theData: object) => {
    setData(theData);
    message.info('画布刷新');
  });

  useEffect(() => {
    const graphData = loadLocalGraph();
    setData(graphData);
  }, [flow.current]);

  const handleGraphData = () => {
    if (flow.current) {
      // @ts-ignore
      return flow.current.graph.save();
    }
    return {};
  };

  return (
    <GGEditor className={styles.editor}>
      <Row className={styles.editorHd}>
        <Col span={16}>
          <FlowToolbar />
        </Col>
        <Col span={8}>
          <GraphOptionBar
            onGetGraphData={handleGraphData}
            onLoadData={handleRefreshData}
          />
        </Col>
      </Row>

      <Row className={styles.editorBd}>
        <Col span={4} className={styles.editorSidebar}>
          <FlowItemPanel />
          <EditorMinimap />
        </Col>
        <Col span={15} className={styles.editorContent}>
          <Flow className={styles.flow} ref={flow} data={data} />
        </Col>
        <Col span={5} className={styles.editorSidebar}>
          <FlowDetailPanel project="测试项目" />
        </Col>
      </Row>

      <FlowContextMenu />
    </GGEditor>
  );
};
export default EditorFlow;
