import React, { CSSProperties, ReactNode } from 'react';
import { DataNode } from 'antd/lib/tree';

export type IComp = (props: IProps | IPropsWithChild) => React.ReactElement;

export interface ITxpComp {
  Name: string;
  Comp: IComp;
  Config: Record<keyof any, any>;
  Container?: boolean;
}

export interface IProps<T> {
  props?: T;
  style?: CSSProperties;
}
export interface IPropsWithChild<T> extends IProps<T> {
  children?: ReactNode;
}

export interface IDomList {
  Name: string;
  Comp: IComp;
  Container?: boolean;
  children?: ITransData[];
}

export interface ITransData extends DataNode {
  comp: IComp;
  children: ITransData[];
  container?: boolean;
  name: string;
}
export interface ILabelinValue {
  label: string;
  value: string | undefined;
}

export interface IFormItemConfig {
  title: string;
  key: string;
  type: 'Input' | 'Switch' | 'Select' | 'Radio';
  defaultValue?: string | boolean;
  options?: string[];
  placeholder?: string;
  required?: boolean;
  requiredMsg?: string;
}
