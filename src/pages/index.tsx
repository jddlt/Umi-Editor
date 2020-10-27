import React, { useEffect } from 'react';
import { Button } from 'antd';
import BaseCmp from '@/Components/BaseComp';
import PropsSetting from '@/Components/PropsSetting';
import Pages from '@/Components/Pages';
import styles from './index.less';

export default () => {
  useEffect(() => {
    document.body.style.margin = '0';
  }, []);

  return (
    <div className={styles.main}>
      <header className={styles.header}>Umi-Txp-Editor</header>
      <div className={styles.container}>
        <BaseCmp />
        <Pages />
        <PropsSetting />
      </div>
    </div>
  );
};
