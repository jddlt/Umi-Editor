import React, { CSSProperties } from 'react';
import { Card, Button, Col } from 'antd';
import { ColProps } from 'antd/lib/col';

const gridStyle: CSSProperties = {
  width: '100%',
  textAlign: 'center',
  cursor: 'move',
};

// 偷懒行为
interface CompProps extends ColProps {}

// 属性
const TxpConfig: Txp.IFormItemConfig[] = [
  {
    title: '占格子数',
    dataIndex: 'span',
    type: 'Input',
    placeholder: '输填写占格子数',
  },
  {
    title: '左侧间隔',
    dataIndex: 'offset',
    type: 'Input',
    placeholder: '输填写左侧间隔格子数',
  },
  {
    title: 'flex布局',
    dataIndex: 'flex',
    type: 'Input',
    placeholder: '请填写flex布局属性',
  },
  {
    title: '左移格数',
    dataIndex: 'pull',
    type: 'Input',
    placeholder: '请填写左移格数',
  },
  {
    title: '右移格数',
    dataIndex: 'push',
    type: 'Input',
    placeholder: '请填写右移格数',
  },
];

const TxpProps: CompProps = {
  span: 6,
};

// 渲染Dom
export const TxpComp = (props: Txp.IPropsWithChild<CompProps> = {}) => {
  return (
    <Col
      className="TxpCol"
      {...props?.props}
      onClick={props.onClick}
      style={props?.style}
    >
      {props?.children || props.props?.children}
    </Col>
  );
};

// 左侧预览Dom
export const PreviewComp = (props: Txp.IPreviewProps): JSX.Element => {
  return (
    <Card title={<strong>Col</strong>} size="small">
      <Card.Grid
        style={gridStyle as CSSProperties}
        // @ts-ignore
        draggable
        onDragStart={(e: React.DragEvent) => {
          props.onDragStart(e, 'Col');
        }}
      >
        <Button type="dashed" block>
          Col
        </Button>
      </Card.Grid>
    </Card>
  );
};

const TxpStyle = {};

export default {
  Name: 'Col',
  Config: TxpConfig,
  Comp: TxpComp,
  Preview: PreviewComp,
  Props: TxpProps,
  Style: TxpStyle,
  Container: true,
} as Txp.IAntdComp<CompProps>;
