import React, { useEffect, useState, useRef } from 'react';
import classnames from 'classnames';
import { useImmer } from 'use-immer';
import useMove from '@/hooks/useMove';
import { message, Button } from 'antd';
import ReactDom, { createPortal } from 'react-dom';
import styles from './index.less';
import Config from '@/Components/BaseComp/comp.config';

const hammerOption = {
  recognizers: {
    pinch: { enable: true },
    rotate: { enable: true },
  },
};

export default (): JSX.Element => {
  const [transXY, handleMouseDown] = useMove();
  const [domList, setDomList] = useImmer<React.ReactElement[]>([]);
  const [scale, setScale] = useState<number>(1);

  const handleUpOrDown = (e: KeyboardEvent) => {
    if (
      e.key == 'ArrowUp' &&
      (navigator.platform.match('Mac') ? e.metaKey : e.ctrlKey)
    ) {
      e.preventDefault();
      setScale(r => r + 0.03);
    } else if (
      e.key == 'ArrowDown' &&
      (navigator.platform.match('Mac') ? e.metaKey : e.ctrlKey)
    ) {
      e.preventDefault();
      setScale(r => r - 0.03);
    }
  };

  const handleDrop = function(e: React.DragEvent) {
    e.preventDefault();
    const name = e.dataTransfer.getData('name');
    const Dom = Config[name].Comp;
    if (!Dom) return message.error(`未找到 ${name} 组件`);
    const container = e.currentTarget;
    console.log('name', Dom, container);
    // const outDom = document.createElement('span');
    setDomList(r => {
      r.push(ReactDom.createPortal(Dom as React.ReactElement, container));
    });
    // container.appendChild(dom);
    // console.log('dom', dom);
  };

  const handleDragOver = function(e: React.DragEvent) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  useEffect(() => {
    document.addEventListener('keydown', handleUpOrDown, false);
    return () => {
      document.removeEventListener('keydown', handleUpOrDown, false);
    };
  }, [handleUpOrDown]);

  return (
    <div className={styles['pages']}>
      <article
        onDrop={handleDrop}
        className={styles.mainBox}
        onDragOver={handleDragOver}
        style={{
          transition: 'transform .15s',
          transform: `translate(${transXY.x}px, ${transXY.y}px) scale(${scale})`,
        }}
      >
        <header className={styles.mainBoxHeader} onMouseDown={handleMouseDown}>
          <span className={classnames(styles.dot, styles.color1)} />
          <span className={classnames(styles.dot, styles.color2)} />
          <span className={classnames(styles.dot, styles.color3)} />
        </header>
        {/* 牛逼！！ */}
        {domList.map(item => item)}
      </article>
    </div>
  );
};
