import React from 'react';
import { Select, Switch, Radio, Input, Form } from 'antd';
import { IFormItemConfig, ILabelinValue } from '@/Components/BaseComp/index.d';

export const renderFormItem = (props: IFormItemConfig) => {
  return (
    <Form.Item
      key={props.dataIndex}
      name={props.dataIndex}
      label={<span>{props.title}</span>}
      valuePropName={props.type === 'Switch' ? 'checked' : 'value'}
      rules={[
        {
          required: props.required,
          message: props.requiredMsg || props.placeholder,
        },
      ]}
    >
      {caseType(props)}
    </Form.Item>
  );
};

const caseType = (props: IFormItemConfig) => {
  switch (props.type) {
    case 'Select':
      return (
        <Select placeholder={props.placeholder}>
          {props.options?.map(item => (
            <Select.Option key={item} value={item}>
              {item}
            </Select.Option>
          ))}
        </Select>
      );
    case 'Switch':
      return <Switch />;
    case 'Input':
      return <Input placeholder={props.placeholder} />;
    case 'Radio':
      return (
        <Radio.Group size="small" buttonStyle="solid">
          {props.options?.map((item: string | ILabelinValue) => {
            if (typeof item === 'string') {
              return (
                <Radio.Button key={item} value={item}>
                  {item}
                </Radio.Button>
              );
            } else {
              return (
                <Radio.Button key={item.label} value={item.value}>
                  {item.label}
                </Radio.Button>
              );
            }
          })}
        </Radio.Group>
      );
  }
};
