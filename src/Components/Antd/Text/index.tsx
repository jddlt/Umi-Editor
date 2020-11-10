import React, { CSSProperties } from 'react';
import { Card } from 'antd';

interface TextProps {
  children: string;
  fontSize: string;
  color: string;
  lineHeight: string;
  display: 'inline' | 'line-block' | 'block';
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
const TxpConfig: Txp.IFormItemConfig[] = [
  {
    title: '内容',
    dataIndex: 'children',
    type: 'Textarea',
  },
  {
    title: '字体大小',
    dataIndex: 'fontSize',
    type: 'Select',
    options: new Array(24)
      .fill(null)
      .map((_: null, index: number) => `${index + 12}px`),
  },
  {
    title: '文本格式',
    dataIndex: 'display',
    type: 'Select',
    options: ['inline', 'inline-block', 'block'],
  },
  {
    title: '文字行高',
    dataIndex: 'lineHeight',
    type: 'Select',
    options: ['normal'].concat(
      new Array(18)
        .fill(null)
        .map((_: null, index: number) => String((index + 8) / 10)),
    ),
  },
  {
    title: '文字颜色',
    dataIndex: 'color',
    type: 'Color',
  },
];

const TxpProps: Partial<CompProps> = {
  fontSize: '15px',
  color: '#333',
  children: '我是文本',
  lineHeight: 'normal',
  display: 'inline',
};

// 渲染Dom
export const TxpComp = (props: Txp.IPropsWithChild<CompProps> = {}) => {
  return (
    <span
      style={{ ...props?.props }}
      className="TxpText"
      onClick={props?.onClick}
    >
      {props?.props?.children}
    </span>
  );
};

// 左侧预览Dom
export const PreviewComp = (props: Txp.IPreviewProps): JSX.Element => {
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

const OwnChildren: Txp.IChild[] = [];

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
} as Txp.IAntdComp<CompProps>;
