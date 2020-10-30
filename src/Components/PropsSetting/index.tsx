import React, { useEffect, Dispatch, SetStateAction } from 'react';
import { Tabs, Form, Button } from 'antd';
import styles from './index.less';
import classNames from 'classnames';
import { IGloableProps } from '@/Components/BaseComp/index.d';
import { findCompByKey } from '@/utils/index';
import { renderFormItem as RenderFormItem } from '@/layout/renderFormItem';
const { TabPane } = Tabs;

export default (props: IGloableProps): JSX.Element => {
  const [form] = Form.useForm();
  const { domList, setDomList, current, setCurrent } = props;

  const handleSaveButtonProps = () => {
    const val = form.getFieldsValue();
    const data = [...domList];
    findCompByKey(data, current.key, item => {
      item.Props = { ...val };
    });
    setDomList(data);
    setCurrent({ ...current, Props: val });
  };
  console.log('domList', domList);

  useEffect(() => {
    form.setFieldsValue(current.Props);
  }, [current.Props]);

  return (
    <div className={styles['propsContainer']}>
      <Tabs defaultActiveKey="props">
        <TabPane tab={<span>属性配置</span>} key="props">
          {current.key ? (
            <>
              <div className={styles.tabContainer}>
                <Form form={form}>
                  {current.Config.map(item => (
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
            </>
          ) : (
            <div className={classNames(styles.tabContainer, styles.empty)}>
              空空如也
            </div>
          )}
        </TabPane>
        <TabPane tab={<span>样式微调</span>} key="styles">
          <div className={styles.tabContainer}>样式微调</div>
        </TabPane>
      </Tabs>
    </div>
  );
};
