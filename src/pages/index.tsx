import React, { useEffect, ReactNode } from 'react';
import { Button } from 'antd';
import BaseCmp from '@/Components/BaseComp';
import PropsSetting from '@/Components/PropsSetting';
import { IDomList } from '@/Components/BaseComp/index.d';
import { useImmer } from 'use-immer';
import Pages from '@/Components/Pages';
import styles from './index.less';

export default () => {
  const [domList, setDomList] = useImmer<IDomList[]>([]);
  useEffect(() => {
    document.body.style.margin = '0';
  }, []);

  return (
    <div className={styles.main}>
      <header className={styles.header}>Umi-Txp-Editor</header>
      <div className={styles.container}>
        <BaseCmp domList={domList} setDomList={setDomList} />
        <Pages domList={domList} setDomList={setDomList} />
        <PropsSetting />
      </div>
    </div>
  );
};
