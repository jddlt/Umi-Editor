import React from 'react';
import { Row, Col, Form, Input, Select } from 'antd';

export const RenderStyleForm = () => {
  return (
    <Row gutter={24}>
      <Col span={24}>
        <Form.Item label={<strong>基本样式</strong>} />
      </Col>
      <Col span={12}>
        <Form.Item name="width" label="宽度">
          <Input placeholder="宽度" />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item name="height" label="高度">
          <Input placeholder="高度" />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item name="fontSize" label="字体">
          <Input placeholder="大小" />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item name="color" label="颜色">
          <Input placeholder="颜色" type="color" />
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item label={<strong>外边距</strong>} />
      </Col>
      <Col span={12}>
        <Form.Item name="marginTop" label="MTop">
          <Input placeholder="上外边距" />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item name="marginBottom" label="MBot">
          <Input placeholder="下外边距" />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item name="marginLeft" label="MLeft">
          <Input placeholder="左外边距" />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item name="marginRight" label="MRight">
          <Input placeholder="右外边距" />
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item label={<strong>内边距</strong>} />
      </Col>
      <Col span={12}>
        <Form.Item name="paddingTop" label="PTop">
          <Input placeholder="上内边距" />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item name="paddingBottom" label="PBot">
          <Input placeholder="下内边距" />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item name="paddingLeft" label="PLeft">
          <Input placeholder="左内边距" />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item name="paddingRight" label="PRight">
          <Input placeholder="右内边距" />
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item name="position" label={<strong>定位方式</strong>}>
          <Select>
            {['static', 'relative', 'absolute', 'fixed', 'sticky'].map(item => (
              <Select.Option key={item} value={item}>
                {item}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item name="top" label="Top">
          <Input placeholder="顶部" />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item name="bottom" label="Bot">
          <Input placeholder="底部" />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item name="left" label="Left">
          <Input placeholder="左侧" />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item name="right" label="Right">
          <Input placeholder="右侧" />
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item name="style" label={<strong>自定义</strong>}>
          <Input.TextArea
            autoSize={{ minRows: 2, maxRows: 6 }}
            placeholder="自定义样式"
          />
        </Form.Item>
      </Col>
    </Row>
  );
};
