import React, { CSSProperties } from 'react';
import { Card, Button, Form } from 'antd';
import { FormProps } from 'antd/lib/form';

const gridStyle: CSSProperties = {
  width: '100%',
  textAlign: 'center',
  cursor: 'move',
};

// 偷懒行为
interface CompProps extends FormProps {}

// 属性
const TxpConfig: Txp.IFormItemConfig[] = [
  {
    title: '表单Ref',
    dataIndex: 'form',
    type: 'Radio',
    options: ['无用字段'],
  },
  {
    title: '是否有冒号',
    dataIndex: 'colon',
    type: 'Switch',
  },
  {
    title: '初始值',
    dataIndex: 'initialValues',
    type: 'Input',
    placeholder: '输填写初始值',
  },
  {
    title: '表单大小',
    dataIndex: 'size',
    type: 'Radio',
    options: ['small', 'middle', 'large'],
  },
  {
    title: '表单布局',
    dataIndex: 'layout',
    type: 'Select',
    options: ['horizontal', 'vertical', 'inline'],
  },
  {
    title: '对齐方向',
    dataIndex: 'labelAlign',
    type: 'Radio',
    options: ['left', 'right'],
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
  size: 'middle',
  labelAlign: 'left',
  labelCol: 6 as any,
  wrapperCol: 18 as any,
  layout: 'horizontal',
  form: '无用字段' as any,
};

// 渲染Dom
export const TxpComp = (props: Txp.IPropsWithChild<CompProps> = {}) => {
  return (
    <Form
      className="TxpForm"
      {...props?.props}
      labelCol={{ span: props?.props?.labelCol as number }}
      wrapperCol={{ span: props?.props?.wrapperCol as number }}
      onClick={props.onClick}
      style={props?.style}
      form={undefined}
    >
      {props?.children || props.props?.children}
    </Form>
  );
};

// 左侧预览Dom
export const PreviewComp = (props: Txp.IPreviewProps): JSX.Element => {
  return (
    <Card title={<strong>Form</strong>} size="small">
      <Card.Grid
        style={gridStyle as CSSProperties}
        // @ts-ignore
        draggable
        onDragStart={(e: React.DragEvent) => {
          props.onDragStart(e, 'Form');
        }}
      >
        <Button type="dashed" block>
          Form
        </Button>
      </Card.Grid>
    </Card>
  );
};

const TxpStyle = {};

export default {
  Name: 'Form',
  Config: TxpConfig,
  Comp: TxpComp,
  Preview: PreviewComp,
  Props: TxpProps,
  Style: TxpStyle,
  Container: true,
} as Txp.IAntdComp<CompProps>;
