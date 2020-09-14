import { message, Modal, Upload } from 'antd';
import React from 'react';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import moment from 'moment';
import {
  loadLocalGraph,
  noop,
  parseJSON,
  saveLocalGraph,
} from '@/service/util';

import styles from './graph-option-bar.less';
import ToolbarButton from '@/pages/editor-flow/components/editor-toolbar/toolbar-button';

const FileSaver = require('file-saver');

interface IGraphOptionBar {
  onGetGraphData: Function;
  onLoadData: Function;
}

const GraphOptionBar: React.FC<IGraphOptionBar> = props => {
  const { onGetGraphData = noop, onLoadData = noop } = props;
  const handleSave2Local = () => {
    const graphData = onGetGraphData();
    saveLocalGraph(graphData);
    message.info('暂存成功');
  };
  const handleSave2File = () => {
    const graphData = onGetGraphData();
    saveLocalGraph(graphData);

    const blob = new Blob([JSON.stringify(graphData)], {
      type: 'text/plain;charset=utf-8',
    });
    const fileName = 'page_' + moment().format('YYYY_MM_DD_HHmmss') + '.json';
    FileSaver.saveAs(blob, fileName);
  };

  const handleLoadFromLocal = () => {
    const graphData = loadLocalGraph();
    onLoadData(graphData);
  };

  const handleLoadFromFile = (file: any) => {
    const reader = new FileReader();
    reader.onload = (event: any) => {
      const graphData = parseJSON(event.target.result);
      Modal.confirm({
        title: 'Confirm',
        icon: <ExclamationCircleOutlined />,
        content: '加载新的文件，将清空历史画布？',
        okText: '确认',
        cancelText: '取消',
        onOk: () => {
          onLoadData(graphData);
          saveLocalGraph(graphData);
        },
      });
    };
    reader.readAsText(file, 'UTF-8');
    return false;
  };

  const handleClear = () => {
    Modal.confirm({
      title: 'Confirm',
      icon: <ExclamationCircleOutlined />,
      content: '是否确认清空缓存，新建画布？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        onLoadData({});
        saveLocalGraph({});
      },
    });
  };

  return (
    <div className={styles.graphOptionBar}>
      <ToolbarButton command="save" onClick={handleSave2Local} />
      <Upload beforeUpload={handleLoadFromFile} showUploadList={false}>
        <ToolbarButton command="import" onClick={noop} />
      </Upload>

      <ToolbarButton command="export" onClick={handleSave2File} />
      <ToolbarButton command="reload" onClick={handleLoadFromLocal} />
      <ToolbarButton command="clear" onClick={handleClear} />
    </div>
  );
};

export default GraphOptionBar;
