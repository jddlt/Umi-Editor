import React, { CSSProperties } from 'react';
import { Button, Card } from 'antd';
import {
  IFormItemConfig,
  IProps,
  IPreviewProps,
  IAntdComp,
} from '@/Components/BaseComp/index.d';
import { ButtonProps } from 'antd/lib/button';

const gridStyle: CSSProperties = {
  width: '100%',
  textAlign: 'center',
};

// Button属性
const ButtonConfig: IFormItemConfig[] = [
  {
    title: '内容',
    key: 'children',
    type: 'Input',
    placeholder: '输入按钮内容',
  },
  {
    title: '类型',
    key: 'type',
    type: 'Select',
    placeholder: '选择按钮类型',
    options: ['default', 'primary', 'ghost', 'dashed', 'link', 'text'],
  },
  {
    title: '危险按钮',
    key: 'danger',
    type: 'Switch',
  },
  {
    title: '图标',
    key: 'icon',
    type: 'Input',
    placeholder: '请输入icon图标',
  },
  {
    title: '按钮形状',
    key: 'shape',
    type: 'Radio',
    options: ['default', 'circle', 'round'],
  },
  {
    title: '按钮尺寸',
    key: 'size',
    type: 'Radio',
    options: ['middle', 'small', 'large'],
  },
  {
    title: '正在加载',
    key: 'loading',
    type: 'Switch',
  },
  {
    title: '幽灵按钮',
    key: 'ghost',
    type: 'Switch',
  },
  {
    title: '撑满宽度',
    key: 'block',
    type: 'Switch',
  },
];

// 渲染Button
export const TxpButton = (props: IProps<ButtonProps> = {}) => {
  return (
    <Button {...props?.props} style={props?.style} type="primary">
      {props.props?.children}
    </Button>
  );
};

// 左侧预览Button
export const PreviewButton = (props: IPreviewProps): JSX.Element => {
  return (
    <Card title={<strong>Button</strong>} size="small">
      <Card.Grid
        style={gridStyle}
        draggable
        onDragStart={(e: React.DragEvent) => {
          props.onDragStart(e, 'Button');
        }}
      >
        <Button type="primary">按钮</Button>
      </Card.Grid>
    </Card>
  );
};

const TxpButtonProps: ButtonProps = {
  children: '按钮',
  type: 'primary',
  shape: 'default' as 'round', // sb操作
  size: 'middle',
};

const ButtonStyle = {};

export default {
  name: 'Button',
  Config: ButtonConfig,
  Comp: TxpButton,
  Preview: PreviewButton,
  Props: TxpButtonProps,
  Style: ButtonStyle,
  Container: false,
} as IAntdComp<ButtonProps>;
