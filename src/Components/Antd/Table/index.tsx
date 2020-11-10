import React, { CSSProperties } from 'react';
import { Card, Table } from 'antd';
import { TableProps } from 'antd/lib/table';

const gridStyle: CSSProperties = {
  width: '100%',
  textAlign: 'center',
  cursor: 'move',
};

// 偷懒行为
interface CompProps extends Omit<TableProps<any>, 'columns'> {
  columns?: string;
  onContextMenu?: () => {};
  align?: 'left' | 'center' | 'right';
}

// 组件名
const CompName = 'Table';

// 属性
const TxpConfig: Txp.IFormItemConfig[] = [
  {
    title: '边框',
    dataIndex: 'bordered',
    type: 'Switch',
  },
  {
    title: '表头列',
    dataIndex: 'columns',
    type: 'Textarea',
  },
  {
    title: '展示位置',
    dataIndex: 'align',
    type: 'Select',
    options: ['left', 'center', 'right'],
  },
  {
    title: '表格Key',
    dataIndex: 'rowKey',
    type: 'Input',
  },
  {
    title: '加载中',
    dataIndex: 'loading',
    type: 'Switch',
  },
  {
    title: '粘性表头',
    dataIndex: 'sticky',
    type: 'Switch',
  },
  {
    title: '表格大小',
    dataIndex: 'size',
    type: 'Radio',
    options: ['large', 'middle', 'small'],
  },
];

const TxpProps: CompProps = {
  size: 'middle',
  bordered: true,
  align: 'center',
};

// 渲染Dom
export const TxpComp = (props: Txp.IPropsWithChild<CompProps> = {}) => {
  let concatProps = props?.props || ({} as CompProps);
  if (concatProps.footer) {
    concatProps.footer = () => concatProps.footer;
  } else delete concatProps.footer;

  let myColumns = [];
  try {
    myColumns = eval(('(' + props.props?.columns + ')') as any).map(
      (i: CompProps) => ({
        ...i,
        align: props.props!.align,
      }),
    );
  } catch (err) {}
  return (
    <div
      className="TxpTable"
      onClick={props?.onClick}
      onContextMenu={props?.props?.onContextMenu}
      style={{ display: 'inline-block', width: '100%', ...props?.style }}
    >
      <Table
        rowKey="name"
        scroll={{ x: 'max-content' }}
        bordered
        {...concatProps}
        columns={props.props?.columns ? myColumns : []}
        dataSource={[{ name: '江' }]}
      />
    </div>
  );
};

const a = [
  { title: '姓名', dataIndex: 'name' },
  { title: '年龄', dataIndex: 'age' },
  { title: '电话', dataIndex: 'phone' },
  { title: '地址·', dataIndex: 'address' },
];

// 左侧预览Dom
export const PreviewComp = (props: Txp.IPreviewProps): JSX.Element => {
  return (
    <Card title={<strong>{CompName}</strong>} size="small">
      <Card.Grid
        style={gridStyle as CSSProperties}
        // @ts-ignore
        draggable
        onDragStart={(e: React.DragEvent) => {
          props.onDragStart(e, CompName);
        }}
      >
        <Table
          rowKey="name"
          size="small"
          pagination={false}
          bordered
          columns={[{ title: '作者', dataIndex: 'name', align: 'center' }]}
          dataSource={[{ name: 'Mrpzx' }]}
        />
      </Card.Grid>
    </Card>
  );
};

const OwnChildren: Txp.IChild[] = [
  {
    key: 'Table_footer',
    title: 'footer',
    Container: true,
    children: [],
    disabled: true,
  },
];

const TxpStyle = {};

export default {
  Name: CompName,
  Config: TxpConfig,
  Comp: TxpComp,
  Preview: PreviewComp,
  Props: TxpProps,
  Style: TxpStyle,
  Container: false,
  Children: OwnChildren,
} as Txp.IAntdComp<CompProps>;
