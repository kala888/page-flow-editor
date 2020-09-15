import styles from './index.less';
import { Button, Input } from 'antd';
import React, { useContext, useState } from 'react';
import LangContext from '../../util/context';
import DataTableModal from './DataTableModal';
import { IProjectModel } from '../../types';

export interface ProjectProps {
  model: IProjectModel;
  onChange: (...args: any[]) => any;
  readOnly: boolean;
}

const ProjectDetail: React.FC<ProjectProps> = ({
  model,
  onChange,
  readOnly = false,
}) => {
  const { i18n, lang } = useContext(LangContext);
  const [dataObjsModalVisible, setDataObjsModalVisible] = useState(false);
  const dataObjCols = [
    { title: i18n['project.dataObjs.id'], dataIndex: 'id', editable: false },
    { title: i18n['project.dataObjs.name'], dataIndex: 'name', editable: true },
    {
      title: i18n['project.dataObjs.type'],
      dataIndex: 'type',
      editable: true,
      editor: {
        type: 'select',
        options: [
          { key: 'string', value: 'string' },
          { key: 'boolean', value: 'boolean' },
          { key: 'datetime', value: 'datetime' },
          { key: 'double', value: 'double' },
          { key: 'int', value: 'int' },
          { key: 'long', value: 'long' },
        ],
      },
    },
    {
      title: i18n['project.dataObjs.defaultValue'],
      dataIndex: 'defaultValue',
      editable: true,
    },
  ];
  return (
    <>
      <div data-clazz={model.clazz}>
        <div className={styles.panelTitle}>{i18n['project']}</div>
        <div className={styles.panelBody}>
          <div className={styles.panelRow}>
            <div>{i18n['project.id']}：</div>
            <Input
              style={{ width: '100%', fontSize: 12 }}
              value={model.id}
              onChange={e => onChange('id', e.target.value)}
              disabled={readOnly}
            />
          </div>
          <div className={styles.panelRow}>
            <div>{i18n['project.name']}：</div>
            <Input
              style={{ width: '100%', fontSize: 12 }}
              value={model.name}
              onChange={e => onChange('name', e.target.value)}
              disabled={readOnly}
            />
          </div>
          <div className={styles.panelRow}>
            <div>
              {i18n['project.dataObjs']}：
              <Button
                disabled={readOnly}
                onClick={() => setDataObjsModalVisible(true)}
              >
                {i18n['tooltip.edit']}
              </Button>
            </div>
          </div>
        </div>
      </div>
      <DataTableModal
        title={i18n['project.dataObjs']}
        lang={lang}
        newRowKeyPrefix="dataObj"
        cols={dataObjCols}
        data={model.dataObjs || []}
        visible={dataObjsModalVisible}
        onOk={d => {
          setDataObjsModalVisible(false);
          onChange('dataObjs', d);
        }}
        onCancel={() => setDataObjsModalVisible(false)}
      />
    </>
  );
};

export default ProjectDetail;
