import React, { CSSProperties } from 'react';
import { Card, Form } from 'antd';
import { FormItemProps } from 'antd/lib/form';

const gridStyle: CSSProperties = {
  width: '100%',
  textAlign: 'center',
  cursor: 'move',
};

// 偷懒行为
interface CompProps extends FormItemProps {}

// 属性
const TxpConfig: Txp.IFormItemConfig[] = [
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
  {
    title: '文本占比',
    dataIndex: 'labelCol',
    type: 'Input',
    placeholder: '请填写文本占比',
  },
  {
    title: '表单占比',
    dataIndex: 'wrapperCol',
    type: 'Input',
    placeholder: '请填写表单占比',
  },
];

const TxpProps: CompProps = {
  colon: true,
  hidden: false,
  labelAlign: 'left',
  noStyle: false,
  required: false,
  labelCol: 6 as any,
  wrapperCol: 18 as any,
};

// 渲染Dom
export const TxpComp = (props: Txp.IPropsWithChild<CompProps> = {}) => {
  return (
    <Form.Item
      className="TxpFormItem"
      // @ts-ignore
      onClick={props.onClick}
      labelCol={{ span: Number(props?.props?.labelCol) }}
      wrapperCol={{ span: Number(props?.props?.wrapperCol) }}
      {...props?.props}
      style={props?.style}
    >
      {props?.children || props.props?.children}
    </Form.Item>
  );
};

// 左侧预览Dom
export const PreviewComp = (props: Txp.IPreviewProps): JSX.Element => {
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
          <></>
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
} as Txp.IAntdComp<CompProps>;
