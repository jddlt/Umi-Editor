import React, { CSSProperties, ReactNode, ReactElement } from 'react';
import { DataNode } from 'antd/lib/tree';

export type IComp = (props: IProps | IPropsWithChild) => React.ReactElement;

export interface ITxpComp {
  Name: string;
  Comp: IComp;
  Config: Record<keyof any, any>;
  Container?: boolean;
}

export interface IAntdComp<T> {
  Name: string;
  Config: IFormItemConfig[];
  Comp: (props: IPropsWithChild<T>) => ReactElement;
  Preview: (props: IPreviewProps) => ReactElement;
  Props: T;
  Style: {};
  Container: boolean;
}

export interface IProps<T> {
  props?: T;
  style?: CSSProperties;
}
export interface IPropsWithChild<T> extends IProps<T> {
  children?: ReactNode;
}

export interface IDomItem<T> extends IAntdComp<T> {
  title: ReactNode;
  key: string;
  children?: IDomItem<T>[];
}
export interface IPreviewProps {
  children?: React.ReactNode;
  onDragStart: (e: React.DragEvent, name: string) => void;
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
  dataIndex: string;
  type: 'Input' | 'Switch' | 'Select' | 'Radio';
  defaultValue?: string | boolean;
  options?: string[];
  placeholder?: string;
  required?: boolean;
  requiredMsg?: string;
}
