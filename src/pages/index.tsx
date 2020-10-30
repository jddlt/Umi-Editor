import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import BaseCmp from '@/Components/BaseComp';
import PropsSetting from '@/Components/PropsSetting';
import { IDomItem } from '@/Components/BaseComp/index.d';
import { useImmer } from 'use-immer';
import Pages from '@/Components/Pages';
import styles from './index.less';

export default () => {
  const [domList, setDomList] = useState<IDomItem<any>[]>([]);
  useEffect(() => {
    document.body.style.margin = '0';
  }, []);
  // createContext
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
        <BaseCmp domList={domList} setDomList={setDomList} />
        <Pages domList={domList} setDomList={setDomList} />
        <PropsSetting />
      </div>
    </div>
  );
};
