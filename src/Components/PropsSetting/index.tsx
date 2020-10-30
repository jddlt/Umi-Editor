import React, { useEffect, Dispatch, SetStateAction } from 'react';
import { Tabs, Form, Button } from 'antd';
import styles from './index.less';
import { IGloableProps } from '@/Components/BaseComp/index.d';
import TxpButton from '@/Components/Antd/Button';
import { renderFormItem as RenderFormItem } from '@/layout/renderFormItem';
const { TabPane } = Tabs;

export default (props: IGloableProps): JSX.Element => {
  const [form] = Form.useForm();

  const handleSaveButtonProps = () => {
    const val = form.getFieldsValue();
    console.log('val', val);
  };

  useEffect(() => {
    form.setFieldsValue(TxpButton.Props);
  }, [TxpButton.Props]);

  return (
    <div className={styles['propsContainer']}>
      <Tabs defaultActiveKey="props">
        <TabPane tab={<span>属性配置</span>} key="props">
          <div className={styles.tabContainer}>
            <Form form={form}>
              {TxpButton.Config.map(item => (
                <RenderFormItem key={item.dataIndex} {...item} />
              ))}
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
