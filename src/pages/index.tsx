import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import BaseCmp from '@/Components/BaseComp';
import PropsSetting from '@/Components/PropsSetting';
import { IDomItem, IGloableProps } from '@/Components/BaseComp/index.d';
import Pages from '@/Components/Pages';
import styles from './index.less';

export default () => {
  const [domList, setDomList] = useState<IDomItem<any>[]>([]);
  const [current, setCurrent] = useState<IDomItem<any>>({} as IDomItem<any>);
  useEffect(() => {
    document.body.style.margin = '0';
  }, []);
  // 全局属性
  const GloableData: IGloableProps = {
    domList,
    setDomList,
    current,
    setCurrent,
  };
  return (
    <div className={styles.main}>
      <header className={styles.header}>
        <h1>Umi-Txp-Editor</h1>
        <div>
          <Button shape="round" style={{ marginRight: '12px' }}>
            清除
          </Button>
          <Button type="primary" shape="round">
            保存
          </Button>
        </div>
      </header>
      <div className={styles.container}>
        <BaseCmp {...GloableData} />
        <Pages {...GloableData} />
        <PropsSetting {...GloableData} />
      </div>
    </div>
  );
};
