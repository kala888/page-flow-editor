import styles from './index.less';
import { Input } from 'antd';
import React, { useContext } from 'react';
import DefaultDetail from './DefaultDetail';
import LangContext from '../../util/context';
import { IScriptModel } from '../../types';

export interface PageProps {
  model: IScriptModel;
  onChange: (...args: any[]) => any;
  readOnly: boolean;
}

const PageNodeDetail: React.FC<PageProps> = ({
  model,
  onChange,
  readOnly = false,
}) => {
  const { i18n } = useContext(LangContext);
  const title = i18n['page'];
  return (
    <div data-clazz={model.clazz}>
      <div className={styles.panelTitle}>{title}</div>
      <div className={styles.panelBody}>
        <DefaultDetail model={model} onChange={onChange} readOnly={readOnly} />
        <div className={styles.panelRow}>
          <div>{i18n['page.script']}：</div>
          <Input.TextArea
            style={{ width: '100%', fontSize: 12 }}
            rows={4}
            value={model.script}
            onChange={e => {
              onChange('script', e.target.value);
            }}
            disabled={readOnly}
          />
        </div>
      </div>
    </div>
  );
};

export default PageNodeDetail;
