import React, { CSSProperties } from 'react';
import { Button, Switch, Input, Card, Form, Row, Col } from 'antd';
import { ITxpComp } from '@/Components/BaseComp/index.d';
import { ButtonProps } from 'antd/lib/button';

const Config: Record<string, ITxpComp> = {
  TXP_BUTTON_PRIMARY: {
    Name: 'Button',
    Comp: (props: ButtonProps, style: CSSProperties) => (
      <Button {...props} style={style} type="primary">
        按钮
      </Button>
    ),
    Config: { type: 'primary' },
  },
  TXP_BUTTON: {
    Name: 'Button',
    Comp: (props: ButtonProps, style: CSSProperties) => <Button>重置</Button>,
    Config: {},
  },
  TXP_FORM: {
    Name: 'Form',
    Comp: (props: ButtonProps, style: CSSProperties) => <Form></Form>,
    Config: {},
    Container: true,
  },
  TXP_FORM_ITEM: {
    Name: 'Form.Item',
    Comp: (props: ButtonProps, style: CSSProperties) => (
      <Form.Item label="Form.Item"></Form.Item>
    ),
    Config: {},
    Container: true,
  },
  TXP_ROW: {
    Name: 'Row',
    Comp: (props: ButtonProps, style: CSSProperties) => <Row gutter={24}></Row>,
    Config: {},
    Container: true,
  },
  TXP_COL: {
    Name: 'Col',
    Comp: (props: ButtonProps, style: CSSProperties) => <Col></Col>,
    Config: {},
    Container: true,
  },
  TXP_INPUT_SEARCH: {
    Name: 'Input',
    Comp: (props: ButtonProps, style: CSSProperties) => (
      <Input.Search placeholder="input search text" enterButton />
    ),
    Config: {},
  },
  TXP_SWITCH: {
    Name: 'Switch',
    Comp: (props: ButtonProps, style: CSSProperties) => (
      <Switch defaultChecked />
    ),
    Config: {},
  },
  TXP_SWITCH_DISABLED: {
    Name: 'Switch',
    Comp: (props: ButtonProps, style: CSSProperties) => (
      <Switch defaultChecked disabled />
    ),
    Config: {},
  },
  TXP_CARD: {
    Name: 'Card',
    Comp: (props: ButtonProps, style: CSSProperties) => (
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
    Container: true,
  },
};

export default Config;
