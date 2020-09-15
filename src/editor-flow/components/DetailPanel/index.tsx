import React, { forwardRef } from 'react';
import ConditionNodeDetail from './ConditionNodeDetail';
import StartEventDetail from './StartEventDetail';
import 'antd/lib/input/style';
import 'antd/lib/select/style';
import 'antd/lib/switch/style';
import styles from './index.less';
import { IDefaultModel, ISelectData } from '../../types';
import PageNodeDetail from '@/editor-flow/components/DetailPanel/PageNodeDetail';
import ProjectDetail from '@/editor-flow/components/DetailPanel/ProjectDetail';
import FlowDetail from '@/editor-flow/components/DetailPanel/FlowDetail';

export interface DetailProps {
  height: number;
  model: IDefaultModel;
  messageDefs: ISelectData[];
  signalDefs: ISelectData[];
  onChange: (...args: any[]) => any;
  readOnly: boolean;
}

const DetailPanel = forwardRef<any, DetailProps>(
  ({ height, model, onChange, readOnly = false }, ref) => {
    return (
      <div ref={ref} className={styles.detailPanel} style={{ height }}>
        {model.clazz === 'start' && (
          <StartEventDetail
            model={model}
            onChange={onChange}
            readOnly={readOnly}
          />
        )}
        {model.clazz === 'page' && (
          <PageNodeDetail
            model={model}
            onChange={onChange}
            readOnly={readOnly}
          />
        )}
        {model.clazz === 'form' && (
          <PageNodeDetail
            model={model}
            onChange={onChange}
            readOnly={readOnly}
          />
        )}
        {model.clazz === 'condition' && (
          <ConditionNodeDetail
            model={model}
            onChange={onChange}
            readOnly={readOnly}
          />
        )}
        {model.clazz === 'project' && (
          <ProjectDetail
            model={model}
            onChange={onChange}
            readOnly={readOnly}
          />
        )}
        {model.clazz === 'flow' && (
          <FlowDetail model={model} onChange={onChange} readOnly={readOnly} />
        )}
      </div>
    );
  },
);

export default DetailPanel;
