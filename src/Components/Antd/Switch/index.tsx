import React, { CSSProperties } from 'react';
import { Card, Switch } from 'antd';
import { SwitchProps } from 'antd/lib/switch';

const gridStyle: CSSProperties = {
  width: '100%',
  textAlign: 'center',
  cursor: 'move',
};

const outStyle: CSSProperties = {
  width: '100%',
  display: 'inline-block',
};

// 偷懒行为
interface CompProps extends SwitchProps {}

// 属性
const TxpConfig: Txp.IFormItemConfig[] = [
  {
    title: '选中',
    dataIndex: 'checked',
    type: 'Switch',
  },
  {
    title: '初始选中',
    dataIndex: 'defaultChecked',
    type: 'Switch',
  },
  {
    title: '禁用',
    dataIndex: 'disabled',
    type: 'Switch',
  },
  {
    title: '加载中',
    dataIndex: 'loading',
    type: 'Switch',
  },
  {
    title: '开关大小',
    dataIndex: 'size',
    type: 'Radio',
    options: ['default', 'small'],
  },
];

const TxpProps: CompProps = {
  size: 'default',
};

// 渲染Dom
export const TxpComp = (props: Txp.IPropsWithChild<CompProps> = {}) => {
  return (
    <span
      className="TxpSwitch"
      onClick={props?.onClick}
      style={{ fontSize: 0 }}
    >
      <Switch {...props?.props} style={props?.style} />
    </span>
  );
};

// 左侧预览Dom
export const PreviewComp = (props: Txp.IPreviewProps): JSX.Element => {
  return (
    <Card title={<strong>Switch</strong>} size="small">
      <Card.Grid
        style={gridStyle as CSSProperties}
        // @ts-ignore
        draggable
        onDragStart={(e: React.DragEvent) => {
          props.onDragStart(e, 'Switch');
        }}
      >
        <Switch defaultChecked />
      </Card.Grid>
    </Card>
  );
};

const OwnChildren: Txp.IChild[] = [];

const TxpStyle = {};

export default {
  Name: 'Switch',
  Config: TxpConfig,
  Comp: TxpComp,
  Preview: PreviewComp,
  Props: TxpProps,
  Style: TxpStyle,
  Container: false,
  Children: OwnChildren,
} as Txp.IAntdComp<CompProps>;
