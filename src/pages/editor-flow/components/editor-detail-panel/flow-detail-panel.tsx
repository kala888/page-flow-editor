import {
  CanvasPanel,
  DetailPanel,
  EdgePanel,
  GroupPanel,
  MultiPanel,
  NodePanel,
} from 'gg-editor';

import { Card } from 'antd';
import React from 'react';
import DetailForm from './detail-form';
import styles from './styles.less';

const FlowDetailPanel = (props: any) => (
  <DetailPanel className={styles.detailPanel}>
    <NodePanel>
      <DetailForm type="node" />
    </NodePanel>
    <EdgePanel>
      <DetailForm type="edge" />
    </EdgePanel>
    <GroupPanel>
      <DetailForm type="group" />
    </GroupPanel>
    <MultiPanel>
      <Card type="inner" size="small" title="多选" bordered={false} />
    </MultiPanel>
    <CanvasPanel>
      <Card type="inner" size="small" title="画布" bordered={false}>
        {props.project}
      </Card>
    </CanvasPanel>
  </DetailPanel>
);

export default FlowDetailPanel;
