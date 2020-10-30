import React, {
  CSSProperties,
  ReactNode,
  ReactElement,
  Dispatch,
  SetStateAction,
} from 'react';

export interface IGloableProps {
  domList: IDomItem<any>[];
  setDomList: Dispatch<SetStateAction<IDomItem<any>[]>>;
  current: IDomItem<any>;
  setCurrent: Dispatch<SetStateAction<IDomItem<any>>>;
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
  onClick?: (e: React.MouseEvent) => void;
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
