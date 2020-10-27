import React from 'react';
import { Tabs } from 'antd';
import styles from './index.less';
import TxpButton from './Button';
import TxpSwitch from './Switch';
import TxpInput from './Input';
import TxpCard from './Card';

const { TabPane } = Tabs;

interface ITxpComp {
  Name: string;
  Comp: React.ReactNode | Element;
  Config: Record<keyof any, any>;
}

export default () => {
  function handleDragStart(e: React.DragEvent, name: string) {
    e.dataTransfer.dropEffect = 'move';
    e.dataTransfer.setData('name', name);
  }

  return (
    <div className={styles['baseCmpContainer']}>
      <Tabs defaultActiveKey="Comp" onChange={() => {}}>
        <TabPane tab="基础组件" key="Comp">
          <TxpButton onDragStart={handleDragStart} />
          <br />
          <TxpInput onDragStart={handleDragStart} />
          <br />
          <TxpSwitch onDragStart={handleDragStart} />
          <br />
          <TxpCard onDragStart={handleDragStart} />
        </TabPane>
        <TabPane tab="页面结构" key="tree">
          coming soon!
        </TabPane>
      </Tabs>
    </div>
  );
};
