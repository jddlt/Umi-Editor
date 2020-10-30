import React, { CSSProperties, useMemo } from 'react';
import { Card } from 'antd';
import {
  IFormItemConfig,
  IPropsWithChild,
  IPreviewProps,
  IAntdComp,
} from '@/Components/BaseComp/index.d';
import { CardProps } from 'antd/lib/card';

const gridStyle: CSSProperties = {
  width: '100%',
  textAlign: 'center',
};

// Button属性
const CardConfig: IFormItemConfig[] = [
  {
    title: '卡片标题',
    dataIndex: 'title',
    type: 'Input',
    placeholder: '输入卡片标题',
  },
  {
    title: '有无边框',
    dataIndex: 'bordered',
    type: 'Switch',
  },
  {
    title: '右上角内容',
    dataIndex: 'extra',
    type: 'Input',
    placeholder: '输入ReactNode',
  },
  {
    title: '卡片大小',
    dataIndex: 'size',
    type: 'Radio',
    options: ['middle', 'small'],
  },
];

// 渲染Button
export const TxpCard = (props: IPropsWithChild<CardProps> = {}) => {
  return (
    <Card {...props?.props} style={props?.style}>
      {props?.children || props.props?.children}
    </Card>
  );
};

// 左侧预览Card
export const PreviewCard = (props: IPreviewProps): JSX.Element => {
  return (
    <Card title={<strong>Card</strong>} size="small">
      <Card.Grid
        style={gridStyle as CSSProperties}
        // @ts-ignore
        draggable
        onDragStart={(e: React.DragEvent) => {
          props.onDragStart(e, 'Card');
        }}
      >
        <Card
          title={<strong>Card</strong>}
          size="small"
          bodyStyle={{
            textAlign: 'center',
            lineHeight: '40px',
            minHeight: '40px',
          }}
        >
          卡片
        </Card>
      </Card.Grid>
    </Card>
  );
};

const TxpCardProps: CardProps = {
  title: 'Card',
  bordered: true,
  size: 'default',
  children: '卡片',
};

const CardStyle = {};

export default {
  Name: 'Card',
  Config: CardConfig,
  Comp: TxpCard,
  Preview: PreviewCard,
  Props: TxpCardProps,
  Style: CardStyle,
  Container: true,
} as IAntdComp<CardProps>;
