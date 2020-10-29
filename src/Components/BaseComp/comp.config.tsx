import React, { CSSProperties, ReactNode } from 'react';
import { Button, Switch, Input, Card, Form, Row, Col } from 'antd';
import {
  ITxpComp,
  IProps,
  IPropsWithChild,
} from '@/Components/BaseComp/index.d';

const Config: Record<string, ITxpComp> = {
  TXP_BUTTON: {
    Name: 'Button',
    Comp: (props: IProps = {}) => (
      <Button {...props?.props} style={props?.style} type="primary">
        按钮
      </Button>
    ),
    Config: { type: 'primary' },
  },
  TXP_FORM: {
    Name: 'Form',
    Comp: (props: IProps = {}) => <Form></Form>,
    Config: {},
    Container: true,
  },
  TXP_FORM_ITEM: {
    Name: 'Form.Item',
    Comp: (props: IPropsWithChild = {}) => (
      <Form.Item label="Form.Item">{props.children}</Form.Item>
    ),
    Config: {},
    Container: true,
  },
  TXP_ROW: {
    Name: 'Row',
    Comp: (props: IPropsWithChild = {}) => (
      <Row gutter={24}>{props.children}</Row>
    ),
    Config: {},
    Container: true,
  },
  TXP_COL: {
    Name: 'Col',
    Comp: (props: IPropsWithChild = {}) => <Col>{props.children}</Col>,
    Config: {},
    Container: true,
  },
  TXP_INPUT_SEARCH: {
    Name: 'Input',
    Comp: (props: IProps = {}) => (
      <Input.Search placeholder="input search text" enterButton />
    ),
    Config: {},
  },
  TXP_SWITCH: {
    Name: 'Switch',
    Comp: (props: IProps = {}) => <Switch defaultChecked />,
    Config: {},
  },
  TXP_SWITCH_DISABLED: {
    Name: 'Switch',
    Comp: (props: IProps = {}) => <Switch defaultChecked disabled />,
    Config: {},
  },
  TXP_CARD: {
    Name: 'Card',
    Comp: (props: IPropsWithChild = {}) => (
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
        {props.children || '卡片'}
      </Card>
    ),
    Config: {},
    Container: true,
  },
};

export default Config;
