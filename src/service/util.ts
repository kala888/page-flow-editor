import _ from 'lodash';
import { message } from 'antd';
// null=> true
// true=> true
// 1 => false
// [1,2]=> false
// {} => true
// {a:'1'} => false
export const isEmpty = (value: any) => {
  if (_.isNumber(value) || _.isBoolean(value)) {
    return false;
  }
  return _.isEmpty(value);
};
export const isNotEmpty = (value: any) => {
  return !isEmpty(value);
};
export const toBoolean = (value: any) => {
  if (isEmpty(value)) {
    return false;
  }
  if (_.isString(value)) {
    const p = value.toLowerCase().trim();
    if (p === 'true') {
      return true;
    }
    if (p === 'false') {
      return false;
    }
  }
  return value;
};

export function parseJSON(json: string) {
  if (_.isObject()) {
    return json;
  }
  if (_.isString(json)) {
    try {
      return JSON.parse(json);
    } catch (e) {
      return {};
    }
  }
  return json;
}

export const noop = () => {};

export const loadLocalGraph = () => {
  const theData = window.localStorage.getItem('graphData') || '{}';
  try {
    return JSON.parse(theData);
  } catch (e) {
    message.error('解析数据失败');
    return {};
  }
};
export const saveLocalGraph = (graphData = {}) => {
  const data = _.isString(graphData) ? graphData : JSON.stringify(graphData);
  window.localStorage.setItem('graphData', data);
};
