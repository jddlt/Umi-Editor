import React, { CSSProperties } from 'react';
import { Input, Card } from 'antd';

interface IProps {
  children?: React.ReactNode;
  onDragStart: (e: React.DragEvent, name: string) => void;
}

const gridStyle = {
  width: '100%',
  textAlign: 'center',
};

export default (props: IProps): JSX.Element => {
  return (
    <Card title={<strong>Input</strong>} size="small">
      <Card.Grid
        style={gridStyle as CSSProperties}
        draggable
        onDragStart={(e: React.DragEvent) => {
          props.onDragStart(e, 'TXP_INPUT_SEARCH');
        }}
      >
        <Input.Search placeholder="input search text" enterButton />
      </Card.Grid>
    </Card>
  );
};
