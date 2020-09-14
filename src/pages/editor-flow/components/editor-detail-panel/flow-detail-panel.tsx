import React from 'react';
import { CanvasPanel, EdgePanel, MultiPanel, NodePanel } from './panel';

const FlowDetailPanel = (props: any) => (
  <div>
    <NodePanel />
    <EdgePanel />
    <MultiPanel />
    <CanvasPanel />
  </div>
);

export default FlowDetailPanel;
