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
  width: '100%',
  textAlign: 'left',
  padding: '10px',
};

export default (props: IProps): JSX.Element => {
  return (
    <Card title={<strong>Card</strong>} size="small">
      <Card.Grid
        style={gridStyle as CSSProperties}
        draggable
        onDragStart={(e: React.DragEvent) => {
          props.onDragStart(e, 'TXP_CARD');
        }}
      >
        <Card
          title={<strong>Card</strong>}
          size="small"
          bodyStyle={{
            textAlign: 'center',
            lineHeight: '40px',
            minHeight: '40px',
          }}
        >
          卡片
        </Card>
      </Card.Grid>
    </Card>
  );
};
