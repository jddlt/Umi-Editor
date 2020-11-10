import React, { CSSProperties } from 'react';
import { Card, Input } from 'antd';
import { InputProps } from 'antd/lib/input';

const gridStyle: CSSProperties = {
  width: '100%',
  textAlign: 'center',
  cursor: 'move',
};

// 偷懒行为
interface CompProps extends InputProps {}

// 属性
const TxpConfig: Txp.IFormItemConfig[] = [
  {
    title: '提示文字',
    dataIndex: 'placeholder',
    type: 'Input',
  },
  {
    title: '禁用状态',
    dataIndex: 'disabled',
    type: 'Switch',
  },
  {
    title: '内容',
    dataIndex: 'value',
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
    title: '类型',
    dataIndex: 'type',
    type: 'Select',
    options: ['text', 'password', 'emil', 'button', 'file', 'color', 'date'],
  },
];

const TxpProps: CompProps = {
  placeholder: '我是Input',
  type: 'text',
  size: 'middle',
};

// 渲染Dom
export const TxpComp = (props: Txp.IPropsWithChild<CompProps> = {}) => {
  return (
    <Input
      className="TxpInput"
      {...props?.props}
      onClick={props.onClick}
      style={props?.style}
    />
  );
};

// 左侧预览Dom
export const PreviewComp = (props: Txp.IPreviewProps): JSX.Element => {
  return (
    <Card title={<strong>Input</strong>} size="small">
      <Card.Grid
        style={gridStyle as CSSProperties}
        // @ts-ignore
        draggable
        onDragStart={(e: React.DragEvent) => {
          props.onDragStart(e, 'Input');
        }}
      >
        <Input placeholder="我是Input" />
      </Card.Grid>
    </Card>
  );
};

const OwnChildren: Txp.IChild[] = [
  {
    key: 'Input_AddonAfter',
    title: 'addonAfter',
    disabled: true,
    Container: true,
    children: [],
  },
  {
    key: 'Input_AddonBefore',
    title: 'addonBefore',
    disabled: true,
    Container: true,
    children: [],
  },
  {
    key: 'Input_Pefix',
    title: 'prefix',
    disabled: true,
    Container: true,
    children: [],
  },
  {
    key: 'Input_Suffix',
    title: 'suffix',
    disabled: true,
    Container: true,
    children: [],
  },
];

const TxpStyle = {};

export default {
  Name: 'Input',
  Config: TxpConfig,
  Comp: TxpComp,
  Preview: PreviewComp,
  Props: TxpProps,
  Style: TxpStyle,
  Container: false,
  Children: OwnChildren,
} as Txp.IAntdComp<CompProps>;
