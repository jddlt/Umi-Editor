import React, { CSSProperties } from 'react';
import { Card, Switch } from 'antd';
import {
  IFormItemConfig,
  IPropsWithChild,
  IPreviewProps,
  IAntdComp,
} from '@/Components/BaseComp/index.d';

interface TextProps {
  children: string;
  fontSize: string;
  color: string;
}
const gridStyle: CSSProperties = {
  width: '100%',
  textAlign: 'center',
  cursor: 'move',
};

// 偷懒行为
interface CompProps extends TextProps {}

const CompName = 'Text';

// 属性
const TxpConfig: IFormItemConfig[] = [
  {
    title: '内容',
    dataIndex: 'children',
    type: 'Input',
  },
  {
    title: '字体大小',
    dataIndex: 'fontSize',
    type: 'Input',
  },
  {
    title: '颜色',
    dataIndex: 'color',
    type: 'Input',
  },
];

const TxpProps: Partial<CompProps> = {
  fontSize: '15px',
  color: '#333',
  children: '我是文本',
};

// 渲染Dom
export const TxpComp = (props: IPropsWithChild<CompProps> = {}) => {
  return (
    <span style={props?.props} onClick={props?.onClick}>
      {props?.props?.children}
    </span>
  );
};

// 左侧预览Dom
export const PreviewComp = (props: IPreviewProps): JSX.Element => {
  return (
    <Card title={<strong>{CompName}</strong>} size="small">
      <Card.Grid
        style={gridStyle as CSSProperties}
        // @ts-ignore
        draggable
        onDragStart={(e: React.DragEvent) => {
          props.onDragStart(e, CompName);
        }}
      >
        <span>文本</span>
      </Card.Grid>
    </Card>
  );
};

const OwnChildren: Txp.StaticChildren[] = [];

const TxpStyle = {};

export default {
  Name: CompName,
  Config: TxpConfig,
  Comp: TxpComp,
  Preview: PreviewComp,
  Props: TxpProps,
  Style: TxpStyle,
  Container: false,
  Children: OwnChildren,
} as IAntdComp<CompProps>;
