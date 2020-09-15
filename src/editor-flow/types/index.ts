export interface IDefaultModel {
  id?: string;
  clazz?: 'start' | 'page' | 'form' | 'condition' | 'project' | 'flow';
  label?: string;
  x?: number;
  y?: number;
  active?: boolean;
  hideIcon?: boolean;
}

export interface IScriptModel extends IDefaultModel {
  script?: string;
}

export interface IFlowModel extends IDefaultModel {
  source?: string;
  target?: string;
  sourceAnchor?: number;
  targetAnchor?: number;
  conditionExpression?: string;
  seq?: string;
  reverse?: boolean;
}

export interface IProjectModel extends IDefaultModel {
  name?: string;
  dataObjs?: object[];
}

export interface ISelectData {
  id?: string;
  name?: string;
}
