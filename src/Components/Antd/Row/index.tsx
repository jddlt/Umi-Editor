import React, { CSSProperties } from 'react';
import { Card, Button, Row } from 'antd';
import {
  IFormItemConfig,
  IPropsWithChild,
  IPreviewProps,
  IAntdComp,
} from '@/Components/BaseComp/index.d';
import { RowProps } from 'antd/lib/row';

const gridStyle: CSSProperties = {
  width: '100%',
  textAlign: 'center',
  cursor: 'move',
};

// 属性
const TxpConfig: IFormItemConfig[] = [
  {
    title: '栅格间隔',
    dataIndex: 'gutter',
    type: 'Input',
    placeholder: '输填写栅格间隔',
  },
  {
    title: '垂直对齐方式',
    dataIndex: 'align',
    type: 'Select',
    options: ['top', 'middle', 'bottom'],
  },
  {
    title: '水平排列方式',
    dataIndex: 'justify',
    type: 'Select',
    options: ['start', 'end', 'center', 'space-around', 'space-between'],
  },
];

// 渲染Dom
export const TxpComp = (props: IPropsWithChild<RowProps> = {}) => {
  return (
    <Row {...props?.props} onClick={props.onClick} style={props?.style}>
      {props?.children || props.props?.children}
    </Row>
  );
};

// 左侧预览Dom
export const PreviewComp = (props: IPreviewProps): JSX.Element => {
  return (
    <Card title={<strong>Row</strong>} size="small">
      <Card.Grid
        style={gridStyle as CSSProperties}
        // @ts-ignore
        draggable
        onDragStart={(e: React.DragEvent) => {
          props.onDragStart(e, 'Row');
        }}
      >
        <Button type="dashed" block>
          Row
        </Button>
      </Card.Grid>
    </Card>
  );
};

const TxpProps: RowProps = {
  gutter: 24,
  align: 'top',
  justify: 'start',
};

const TxpStyle = {};

export default {
  Name: 'Row',
  Config: TxpConfig,
  Comp: TxpComp,
  Preview: PreviewComp,
  Props: TxpProps,
  Style: TxpStyle,
  Container: true,
} as IAntdComp<RowProps>;
