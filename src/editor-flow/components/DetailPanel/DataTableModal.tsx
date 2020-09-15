import React, { useState } from 'react';
import { Modal } from 'antd';
// @ts-ignore
import EditableTable from 'antd-etable';

export interface ModalProps {
  visible: boolean;
  title: string;
  onOk: (...args: any[]) => any;
  onCancel: (...args: any[]) => any;
  data: any[];
  cols: any[];
  newRowKeyPrefix: string;
  lang: 'zh' | 'en';
}

const DataTableModal: React.FC<ModalProps> = ({
  visible,
  title,
  onOk,
  onCancel,
  data,
  cols,
  newRowKeyPrefix,
  lang,
}) => {
  const [changedData, setChangedData] = useState([]);
  const handleOk = () => {
    const updateData = data
      .map(d => {
        const updater: any = changedData.find((s: any) => d.id === s.id);
        if (updater) {
          if (updater.isDelete) {
            return;
          } else {
            const u = { ...d, ...updater };
            delete u.isNew;
            delete u.isUpdate;
            return u;
          }
        }
        return d;
      })
      .filter(s => !!s);
    const newData = changedData
      .filter((s: any) => s.isNew)
      .map((s: any) => {
        delete s.isNew;
        delete s.isUpdate;
        return s;
      });
    const result = newData.concat(updateData);
    onOk(result);
  };
  const handleCancel = () => {
    setChangedData([]);
    onCancel();
  };
  return (
    <Modal
      title={title}
      destroyOnClose
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      width={800}
      maskClosable={false}
    >
      <EditableTable
        title=""
        lang={lang}
        newRowKeyPrefix={newRowKeyPrefix}
        showTopPager={false}
        showToolbar={false}
        loading={false}
        data={data}
        changedData={changedData}
        pageSize={data.length}
        total={data.length}
        cols={cols}
        onChangedDataUpdate={(d: any) => {
          setChangedData(d);
        }}
      />
    </Modal>
  );
};

export default DataTableModal;
