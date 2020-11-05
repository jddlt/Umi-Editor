import React, { CSSProperties } from 'react';
import { Card, Button, Input } from 'antd';
import {
  IFormItemConfig,
  IPropsWithChild,
  IPreviewProps,
  IAntdComp,
} from '@/Components/BaseComp/index.d';
import { InputProps } from 'antd/lib/input';

const gridStyle: CSSProperties = {
  width: '100%',
  textAlign: 'center',
  cursor: 'move',
};

// 偷懒行为
interface CompProps extends InputProps {}

// prefixCls?: string;
//     size?: SizeType;
//     type?: LiteralUnion<'button' | 'checkbox' | 'color' | 'date' | 'datetime-local' | 'email' | 'file' | 'hidden' | 'image' | 'month' | 'number' | 'password' | 'radio' | 'range' | 'reset' | 'search' | 'submit' | 'tel' | 'text' | 'time' | 'url' | 'week', string>;
//     onPressEnter?: React.KeyboardEventHandler<HTMLInputElement>;
//     addonBefore?: React.ReactNode;
//     addonAfter?: React.ReactNode;
//     prefix?: React.ReactNode;
//     suffix?: React.ReactNode;
//     allowClear?: boolean;
//     bordered?: boolean;

// 属性
const TxpConfig: IFormItemConfig[] = [
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
export const TxpComp = (props: IPropsWithChild<CompProps> = {}) => {
  return (
    <Input {...props?.props} onClick={props.onClick} style={props?.style} />
  );
};

// 左侧预览Dom
export const PreviewComp = (props: IPreviewProps): JSX.Element => {
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

const OwnChildren: Txp.StaticChildren[] = [
  {
    key: 'Input_AddonAfter',
    title: 'addonAfter',
    // disabled: true,
    Container: true,
    children: [],
  },
  {
    key: 'Input_AddonBefore',
    title: 'addonBefore',
    // disabled: true,
    Container: true,
    children: [],
  },
  {
    key: 'Input_Pefix',
    title: 'prefix',
    // disabled: true,
    Container: true,
    children: [],
  },
  {
    key: 'Input_Suffix',
    title: 'suffix',
    // disabled: true,
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
} as IAntdComp<CompProps>;
