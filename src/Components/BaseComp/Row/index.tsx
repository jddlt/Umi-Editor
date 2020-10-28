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
    <Card title={<strong>Row</strong>} size="small">
      <Card.Grid
        style={gridStyle as CSSProperties}
        draggable
        onDragStart={(e: React.DragEvent) => {
          props.onDragStart(e, 'TXP_ROW');
        }}
      >
        <Button>Row</Button>
      </Card.Grid>
      <Card.Grid
        style={gridStyle as CSSProperties}
        draggable
        onDragStart={(e: React.DragEvent) => {
          props.onDragStart(e, 'TXP_COL');
        }}
      >
        <Button>Col</Button>
      </Card.Grid>
    </Card>
  );
};
