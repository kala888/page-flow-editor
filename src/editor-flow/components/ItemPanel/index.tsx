import React, { forwardRef, useContext } from 'react';
import styles from './index.less';
import { Collapse } from 'antd';
import 'antd/lib/collapse/style';
import LangContext from '../../util/context';

const { Panel } = Collapse;

export interface ItemPanelProps {
  height: number;
}

const ItemPanel = forwardRef<any, ItemPanelProps>(({ height }, ref) => {
  const { i18n } = useContext(LangContext);
  return (
    <div ref={ref} className={styles.itemPanel} style={{ height }}>
      <Collapse bordered={false} defaultActiveKey={[1]}>
        <Panel header={i18n['pageFlowEditor']} key="1" forceRender>
          <div className={styles.item}>
            <img
              data-item={"{clazz:'start',size:'30*30',label:''}"}
              src={require('../../../assets/flow/start.svg')}
              style={{ width: 42, height: 42 }}
            />
            <div>{i18n['startEvent']}</div>
          </div>

          <div className={styles.item}>
            <img
              data-item={
                "{clazz:'page',size:'80*44',label:'" + i18n['page'] + "'}"
              }
              src={require('../../../assets/flow/script-task.svg')}
              style={{ width: 80, height: 44 }}
            />
            <div>{i18n['page']}</div>
          </div>

          <div className={styles.item}>
            <img
              data-item={
                "{clazz:'form',size:'80*44',label:'" + i18n['form'] + "'}"
              }
              src={require('../../../assets/flow/receive-task.svg')}
              style={{ width: 80, height: 44 }}
            />
            <div>{i18n['form']}</div>
          </div>

          <div className={styles.item}>
            <img
              data-item="{clazz:'condition',size:'40*40',label:''}"
              src={require('../../../assets/flow/inclusive-gateway.svg')}
              style={{ width: 48, height: 48 }}
            />
            <div>{i18n['condition']}</div>
          </div>
        </Panel>
      </Collapse>
    </div>
  );
});

export default ItemPanel;
