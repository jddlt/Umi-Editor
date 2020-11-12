import React, { useEffect, useContext } from 'react';
import { Tabs, Form, Button } from 'antd';
import styles from './index.less';
import classNames from 'classnames';
import {
  DomListContext,
  SetDomListContext,
  CurrentDomContext,
  SetCurrentDomContext,
} from '@/store';
import { findCompByKey } from '@/utils/index';
import { renderFormItem as RenderFormItem } from '@/layout/renderFormItem';
import { RenderStyleForm } from '@/layout/RenderStyleForm';
const { TabPane } = Tabs;

export default (): JSX.Element => {
  const [form] = Form.useForm();
  const [styleForm] = Form.useForm();
  const domList = useContext(DomListContext);
  const setDomList = useContext(SetDomListContext);
  const current = useContext(CurrentDomContext);
  const setCurrent = useContext(SetCurrentDomContext);

  // 保存属性配置
  const handleSaveButtonProps = () => {
    const val = form.getFieldsValue();
    const data = [...domList];
    findCompByKey(data, current.key!, item => {
      item.Props = { ...val };
    });
    setDomList(data);
    setCurrent({ ...current, Props: val });
  };

  // 保存样式配置
  const handleSaveButtonStyles = () => {
    const val = styleForm.getFieldsValue();
    let myStyle = {};
    try {
      myStyle = eval('(' + val.style + ')');
    } catch (err) {}

    const data = [...domList];
    findCompByKey(data, current.key!, item => {
      delete val.style;
      item.Style = { ...val, ...myStyle };
    });
    setDomList(data);
    setCurrent({ ...current, Style: { ...val, ...myStyle } });
  };

  // 重置样式
  const handleResetButtonStyles = () => {
    styleForm.resetFields();
    handleSaveButtonStyles();
  };
  // console.log('domList', domList);

  useEffect(() => {
    form.setFieldsValue(current.Props);
  }, [current.Props]);

  useEffect(() => {
    styleForm.resetFields();
    styleForm.setFieldsValue(current.Style);
  }, [current.Style]);

  return (
    <div className={styles['propsContainer']}>
      <Tabs defaultActiveKey="props">
        <TabPane tab={<span>属性配置</span>} key="props">
          {current.key ? (
            <>
              <div className={styles.tabContainer}>
                <Form form={form}>
                  {current.Config?.map((item: any) => (
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
          {current.key ? (
            <>
              <div className={styles.tabContainer}>
                <Form form={styleForm} initialValues={{ position: 'static' }}>
                  <RenderStyleForm />
                </Form>
              </div>
              <div className={styles.saveStyleButton}>
                <Button
                  shape="round"
                  className={styles.saveStyleButtonItem}
                  onClick={handleResetButtonStyles}
                >
                  重置
                </Button>
                <Button
                  type="primary"
                  className={styles.saveStyleButtonItem}
                  shape="round"
                  onClick={handleSaveButtonStyles}
                >
                  保存
                </Button>
              </div>
            </>
          ) : (
            <div className={classNames(styles.tabContainer, styles.empty)}>
              找不到了 Σ( ° △ °|||)︴
            </div>
          )}
        </TabPane>
      </Tabs>
    </div>
  );
};
