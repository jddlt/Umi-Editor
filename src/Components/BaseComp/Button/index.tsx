import React, { CSSProperties, useMemo } from 'react';
import { Button, Card } from 'antd';

interface IProps {
  children?: React.ReactNode;
  onDragStart: (e: React.DragEvent, name: string) => void;
}

interface ITxpComp {
  Name: string;
  Comp: React.ReactNode | Element;
  Config: Record<keyof any, any>;
}
const gridStyle = {
  width: '50%',
  textAlign: 'center',
};

export default (props: IProps): JSX.Element => {
  return (
    <Card title={<strong>Button</strong>} size="small">
      <Card.Grid
        style={gridStyle as CSSProperties}
        draggable
        onDragStart={(e: React.DragEvent) => {
          props.onDragStart(e, 'TXP_BUTTON_PRIMARY');
        }}
      >
        <Button type="primary">按钮</Button>
      </Card.Grid>
      <Card.Grid
        style={gridStyle as CSSProperties}
        draggable
        onDragStart={(e: React.DragEvent) => {
          props.onDragStart(e, 'TXP_BUTTON');
        }}
      >
        <Button>重置</Button>
      </Card.Grid>
    </Card>
  );
};
