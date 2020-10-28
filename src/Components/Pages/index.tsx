import React, {
  useEffect,
  useState,
  useRef,
  ReactElement,
  ReactNode,
} from 'react';
import classnames from 'classnames';
import useMove from '@/hooks/useMove';
import { Draft } from 'immer';
import { message } from 'antd';
import { IDomList } from '@/Components/BaseComp/index.d';
import {
  SortableContainer,
  SortableElement,
  SortEnd,
  SortEvent,
} from 'react-sortable-hoc';
import ReactDom from 'react-dom';
import styles from './index.less';
import Config from '@/Components/BaseComp/comp.config';

interface IProps {
  domList: IDomList[];
  setDomList: (f: (draft: Draft<IDomList[]>) => void | IDomList[]) => void;
}

export default (props: IProps): JSX.Element => {
  const [transXY, handleMouseDown, reset] = useMove();
  const { domList, setDomList } = props;
  const [scale, setScale] = useState<number>(1);

  const handleUpOrDown = (e: KeyboardEvent) => {
    if (
      e.key == 'ArrowUp' &&
      (navigator.platform.match('Mac') ? e.metaKey : e.ctrlKey)
    ) {
      // Command + Up 放大
      e.preventDefault();
      setScale(r => r + 0.03);
    } else if (
      // Command + Down 缩小
      e.key == 'ArrowDown' &&
      (navigator.platform.match('Mac') ? e.metaKey : e.ctrlKey)
    ) {
      e.preventDefault();
      setScale(r => r - 0.03);
    } else if (e.key === 'r' && e.ctrlKey) {
      // Ctrl + R 重置
      reset && reset();
      setScale(1);
    }
  };

  const SortableCompContainer = SortableContainer(() => (
    <div
      className={styles.realContainer}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {domList.map((item, index) => (
        <SortableComp
          style={{ zIndex: '10' }}
          key={index}
          index={index}
          Comp={item.Comp}
        ></SortableComp>
      ))}
    </div>
  ));
  console.log('domList', domList[0]?.Comp({}));

  const SortableComp = SortableElement(({ Comp }: any) => Comp());

  const handleDrop = function(e: React.DragEvent) {
    e.preventDefault();
    const name = e.dataTransfer.getData('name');
    const Dom = Config[name].Comp;
    if (!Dom) return message.error(`未找到 ${name} 组件`);
    const container = e.currentTarget;
    console.log(name, container);
    setDomList(r => {
      r.push({
        Name: Config[name].Name,
        Comp: Dom,
        Container: Config[name].Container,
      });
    });
  };

  const handleDragOver = function(e: React.DragEvent) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleSortEnd = ({ newIndex, oldIndex }: SortEnd, e: SortEvent) => {
    setDomList(d => {
      const item = d.splice(oldIndex, 1);
      d.splice(newIndex, 0, item[0]);
    });
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
        className={styles.mainBox}
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
        <SortableCompContainer
          pressDelay={0}
          helperClass={styles.helper}
          onSortEnd={handleSortEnd}
        />
        {/* <SortableCompContainer
          handleDragOver={handleDragOver}
          handleDrop={handleDrop}
        >
          {domList.map(
            (item, index) =>
              item.Comp,
              // <SortableComp
              //   key={index}
              //   index={index}
              //   Comp={item.Comp}
              // ></SortableComp>
          )}
        </SortableCompContainer> */}

        {/* <div
          className={styles.realContainer}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {domList.map((item, index) => item.Comp)}
        </div> */}
        {/* 牛逼！！ */}
      </article>
      <div className={styles.tips}>
        Cmd+Up/Down: 缩放 &nbsp;|&nbsp; Ctrl+R: 重置 &nbsp;|&nbsp; 当前缩放:{' '}
        {Math.floor(scale * 100)}% &nbsp;|&nbsp; 偏移量：
        {transXY.x}px {transXY.y}px
      </div>
    </div>
  );
};
