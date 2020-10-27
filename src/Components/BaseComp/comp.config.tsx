import React from 'react';
import { Button, Switch, Input, Card } from 'antd';

interface ITxpComp {
  Comp: React.ReactNode | Element;
  Config: Record<keyof any, any>;
}

const Config: Record<string, ITxpComp> = {
  TXP_BUTTON_PRIMARY: {
    Comp: <Button type="primary">按钮</Button>,
    Config: { type: 'primary' },
  },
  TXP_BUTTON: {
    Comp: <Button>重置</Button>,
    Config: {},
  },
  TXP_INPUT_SEARCH: {
    Comp: <Input.Search placeholder="input search text" enterButton />,
    Config: {},
  },
  TXP_SWITCH: {
    Comp: <Switch defaultChecked />,
    Config: {},
  },
  TXP_SWITCH_DISABLED: {
    Comp: <Switch defaultChecked disabled />,
    Config: {},
  },
  TXP_CARD: {
    Comp: (
      <Card
        style={{ width: '300px' }}
        bordered
        title={<strong>Card</strong>}
        headStyle={{
          display: 'flex',
          alignContent: 'center',
          height: '20px',
        }}
        bodyStyle={{ textAlign: 'center' }}
        size="small"
      >
        卡片
      </Card>
    ),
    Config: {},
  },
};

export default Config;
