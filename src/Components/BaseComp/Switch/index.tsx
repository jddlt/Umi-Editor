import React from 'react';
import { Switch, Card } from 'antd';

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
    <Card title={<strong>Switch</strong>} size="small">
      <Card.Grid
        style={gridStyle}
        draggable
        onDragStart={(e: React.DragEvent) => {
          props.onDragStart(e, 'TXP_SWITCH');
        }}
      >
        <Switch defaultChecked />
      </Card.Grid>
      <Card.Grid
        style={gridStyle}
        draggable
        onDragStart={(e: React.DragEvent) => {
          props.onDragStart(e, 'TXP_SWITCH_DISABLED');
        }}
      >
        <Switch disabled defaultChecked />
      </Card.Grid>
    </Card>
  );
};
