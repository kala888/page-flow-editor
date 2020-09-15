import styles from './index.less';
import React, { useContext } from 'react';
import DefaultDetail, { DefaultProps } from './DefaultDetail';
import LangContext from '../../util/context';

const ConditionNodeDetail: React.FC<DefaultProps> = ({
  model,
  onChange,
  readOnly = false,
}) => {
  const { i18n } = useContext(LangContext);
  return (
    <div data-clazz={model.clazz}>
      <div className={styles.panelTitle}>{i18n['condition']}</div>
      <div className={styles.panelBody}>
        <DefaultDetail model={model} onChange={onChange} readOnly={readOnly} />
      </div>
    </div>
  );
};

export default ConditionNodeDetail;
