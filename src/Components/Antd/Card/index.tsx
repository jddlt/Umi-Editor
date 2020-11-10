import React, { CSSProperties } from 'react';
import { Card } from 'antd';
import { CardProps } from 'antd/lib/card';

const gridStyle: CSSProperties = {
  width: '100%',
  textAlign: 'center',
  cursor: 'move',
};

// Button属性
const CardConfig: Txp.IFormItemConfig[] = [
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
  // {
  //   title: '右上角内容',
  //   dataIndex: 'extra',
  //   type: 'Input',
  //   placeholder: '输入ReactNode',
  // },
  {
    title: '卡片大小',
    dataIndex: 'size',
    type: 'Radio',
    options: ['default', 'small'],
  },
];

// 渲染Button
export const TxpCard = (
  props: Txp.IPropsWithChild<CardProps> = {},
): JSX.Element => {
  return (
    <Card
      className="TxpCard"
      {...props?.props}
      onClick={props.onClick}
      style={props?.style}
      extra={props?.props?.extra}
    >
      {props?.children || props.props?.children}
    </Card>
  );
};

// 左侧预览Card
export const PreviewCard = (props: Txp.IPreviewProps): JSX.Element => {
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

const OwnChildren: Txp.IChild[] = [
  {
    key: 'Card_Extra',
    title: 'extra',
    disabled: true,
    Container: true,
    children: [],
  },
];

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
  Children: OwnChildren,
} as Txp.IAntdComp<CardProps>;
