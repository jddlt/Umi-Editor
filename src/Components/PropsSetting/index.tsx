import React from 'react';
import { Tabs, Form, Button } from 'antd';
import { AppleOutlined, AndroidOutlined } from '@ant-design/icons';
import styles from './index.less';
import TxpButton from '@/Components/Antd/Button';
import { renderFormItem } from '@/layout/renderFormItem';
const { TabPane } = Tabs;

export default () => {
  const [form] = Form.useForm();

  const handleSaveButtonProps = () => {
    const val = form.getFieldsValue();
    console.log('val', val);
  };

  return (
    <div className={styles['propsContainer']}>
      <Tabs defaultActiveKey="props">
        <TabPane tab={<span>属性配置</span>} key="props">
          <div className={styles.tabContainer}>
            <Form form={form} initialValues={TxpButton.Props}>
              {TxpButton.Config.map(item => renderFormItem(item))}
            </Form>
          </div>
          <Button
            type="primary"
            shape="round"
            className={styles.saveButton}
            onClick={handleSaveButtonProps}
          >
            保存
          </Button>
        </TabPane>
        <TabPane tab={<span>样式微调</span>} key="styles">
          <div className={styles.tabContainer}>样式微调</div>
        </TabPane>
      </Tabs>
    </div>
  );
};
