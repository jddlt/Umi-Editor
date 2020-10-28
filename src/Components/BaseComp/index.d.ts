import React, { CSSProperties, ReactNode } from 'react';
import { ButtonProps } from 'antd/lib/button';
import { DataNode } from 'antd/lib/tree';

export type IComp = (props: IProps | IPropsWithChild) => React.ReactElement;

export interface ITxpComp {
  Name: string;
  Comp: IComp;
  Config: Record<keyof any, any>;
  Container?: boolean;
}

export interface IProps {
  props?: ButtonProps;
  style?: CSSProperties;
}
export interface IPropsWithChild extends IProps {
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
