import React, { CSSProperties } from 'react';
import { Card, Input, Form } from 'antd';
import {
  IFormItemConfig,
  IPropsWithChild,
  IPreviewProps,
  IAntdComp,
} from '@/Components/BaseComp/index.d';
import { FormItemProps } from 'antd/lib/form';

const gridStyle: CSSProperties = {
  width: '100%',
  textAlign: 'center',
};

// 偷懒行为
interface CompProps extends FormItemProps {}

// 属性
const TxpConfig: IFormItemConfig[] = [
  {
    title: '表单名称',
    dataIndex: 'label',
    type: 'Input',
    placeholder: '请填写表单名称',
  },
  {
    title: '额外提示信息',
    dataIndex: 'extra',
    type: 'Input',
    placeholder: '请填写额外提示信息',
  },
  {
    title: '是否有冒号',
    dataIndex: 'colon',
    type: 'Switch',
  },
  {
    title: '提示信息',
    dataIndex: 'help',
    type: 'Input',
    placeholder: '请填写提示信息',
  },
  {
    title: '是否隐藏字段',
    dataIndex: 'hidden',
    type: 'Switch',
  },
  {
    title: '去除样式',
    dataIndex: 'noStyle',
    type: 'Switch',
  },
  {
    title: '对齐方向',
    dataIndex: 'labelAlign',
    type: 'Radio',
    options: ['left', 'right'],
  },
  {
    title: '是否必填',
    dataIndex: 'required',
    type: 'Switch',
  },
];

const TxpProps: CompProps = {
  colon: true,
  hidden: false,
  labelAlign: 'left',
  noStyle: false,
  required: false,
};

// 渲染Dom
export const TxpComp = (props: IPropsWithChild<CompProps> = {}) => {
  return (
    <Form.Item onClick={props.onClick} {...props?.props} style={props?.style}>
      {props?.children || props.props?.children}
    </Form.Item>
  );
};

// 左侧预览Dom
export const PreviewComp = (props: IPreviewProps): JSX.Element => {
  return (
    <Card title={<strong>Form.Item</strong>} size="small">
      <Card.Grid
        style={gridStyle as CSSProperties}
        // @ts-ignore
        draggable
        onDragStart={(e: React.DragEvent) => {
          props.onDragStart(e, 'Form.Item');
        }}
      >
        <Form.Item label="姓名" style={{ marginBottom: '0' }}>
          <Input
            style={{ width: '150px', textAlign: 'center' }}
            size="small"
            value="yaHaHa!"
            readOnly
          />
        </Form.Item>
      </Card.Grid>
    </Card>
  );
};

const TxpStyle = {};

export default {
  Name: 'Form.Item',
  Config: TxpConfig,
  Comp: TxpComp,
  Preview: PreviewComp,
  Props: TxpProps,
  Style: TxpStyle,
  Container: true,
} as IAntdComp<CompProps>;
