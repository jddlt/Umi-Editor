import React, { CSSProperties } from 'react';
import { Input, Card, Button } from 'antd';

interface IProps {
  children?: React.ReactNode;
  onDragStart: (e: React.DragEvent, name: string) => void;
}

const gridStyle = {
  width: '50%',
  textAlign: 'center',
};

export default (props: IProps): JSX.Element => {
  return (
    <Card title={<strong>Form</strong>} size="small">
      <Card.Grid
        style={gridStyle as CSSProperties}
        draggable
        onDragStart={(e: React.DragEvent) => {
          props.onDragStart(e, 'TXP_FORM');
        }}
      >
        <Button>Form</Button>
      </Card.Grid>
      <Card.Grid
        style={gridStyle as CSSProperties}
        draggable
        onDragStart={(e: React.DragEvent) => {
          props.onDragStart(e, 'TXP_FORM_ITEM');
        }}
      >
        <Button>Item</Button>
      </Card.Grid>
    </Card>
  );
};
