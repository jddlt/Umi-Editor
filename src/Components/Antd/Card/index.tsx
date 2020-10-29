import React, { CSSProperties, useMemo } from 'react';
import { Button, Card } from 'antd';
import { IFormItemConfig, IProps } from '@/Components/BaseComp/index.d';
import { CardProps } from 'antd/lib/card';

interface IPreviewProps {
  children?: React.ReactNode;
  onDragStart: (e: React.DragEvent, name: string) => void;
}

const gridStyle: CSSProperties = {
  width: '100%',
  textAlign: 'center',
};

// Button属性
const CardConfig: IFormItemConfig[] = [
  {
    title: '卡片标题',
    key: 'title',
    type: 'Input',
    placeholder: '输入卡片标题',
  },
  {
    title: '有无边框',
    key: 'bordered',
    type: 'Switch',
  },
  {
    title: '右上角内容',
    key: 'extra',
    type: 'Input',
    placeholder: '输入ReactNode',
  },
  {
    title: '卡片大小',
    key: 'size',
    type: 'Radio',
    options: ['middle', 'small'],
  },
];

// 渲染Button
export const TxpCard = (props: IProps<CardProps>) => {
  return (
    <Card {...props?.props} style={props?.style}>
      {props.props?.children}
    </Card>
  );
};

// 左侧预览Card
export const PreviewCard = (props: IPreviewProps): JSX.Element => {
  return (
    <Card title={<strong>Card</strong>} size="small">
      <Card.Grid
        style={gridStyle as CSSProperties}
        draggable
        onDragStart={(e: React.DragEvent) => {
          props.onDragStart(e, 'TXP_CARD');
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
  title: '<strong>Card</strong>',
  bordered: true,
  size: 'default',
};

const CardStyle = {};

export default {
  name: 'Card',
  Config: CardConfig,
  Comp: TxpCard,
  Preview: PreviewCard,
  Props: TxpCardProps,
  Style: CardStyle,
  Container: true,
};
