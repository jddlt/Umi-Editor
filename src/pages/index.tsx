import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import BaseCmp from '@/Components/BaseComp';
import PropsSetting from '@/Components/PropsSetting';
import Pages from '@/Components/Pages';
import {
  DomListContext,
  CurrentDomContext,
  SetDomListContext,
  SetCurrentDomContext,
} from '@/store';
import styles from './index.less';

export default () => {
  const [domList, setDomList] = useState<Txp.IChild[]>([]);
  const [current, setCurrent] = useState<Txp.IChild>({} as Txp.IChild);
  useEffect(() => {
    document.body.style.margin = '0';
  }, []);
  return (
    <DomListContext.Provider value={domList}>
      <SetDomListContext.Provider value={setDomList}>
        <CurrentDomContext.Provider value={current}>
          <SetCurrentDomContext.Provider value={setCurrent}>
            <div className={styles.main}>
              <Header />
              <div className={styles.container}>
                <BaseCmp />
                <Pages />
                <PropsSetting />
              </div>
            </div>
          </SetCurrentDomContext.Provider>
        </CurrentDomContext.Provider>
      </SetDomListContext.Provider>
    </DomListContext.Provider>
  );
};

const Header = () => {
  return (
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
  );
};
