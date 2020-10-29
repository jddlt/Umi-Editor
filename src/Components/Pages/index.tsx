import React from 'react';
import classnames from 'classnames';
import useMove from '@/hooks/useMove';
import useKeyPress from '@/hooks/useKeyPress';
import { Draft } from 'immer';
import { message } from 'antd';
import { IDomList } from '@/Components/BaseComp/index.d';
import styles from './index.less';
import AntdComp from '@/Components/Antd';

interface IProps {
  domList: IDomList[];
  setDomList: (f: (draft: Draft<IDomList[]>) => void | IDomList[]) => void;
}

export default (props: IProps): JSX.Element => {
  const [transXY, handleMouseDown, reset] = useMove();
  const [scale] = useKeyPress(reset);
  const { domList, setDomList } = props;

  // 拖拽结束
  const handleDragOver = function(e: React.DragEvent) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  // 拖拽松开
  const handleDrop = function(e: React.DragEvent) {
    e.preventDefault();
    const name = e.dataTransfer.getData('name');
    const comp = AntdComp[name];
    const Dom = comp.Comp;
    console.log('Dom', <Dom />);

    if (!Dom) return message.error(`未找到 ${name} 组件`);
    // const container = e.currentTarget;
    // console.log(name, container);
    setDomList(r => {
      r.push({
        key: `${item.Name}_${index}`,
        name: item.Name,
        title: (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span style={{ fontSize: '15px' }}>{item.Name}</span>
            {item.Container && (
              <span style={{ color: 'skyblue', fontSize: '12px' }}>容</span>
            )}
          </div>
        ),
        container: item.Container,
        children: item.children || [],
        comp: item.Comp,
      });
    });
  };

  return (
    <div className={styles.pages}>
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

        <div
          className={styles.realContainer}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {domList.map((item, index) => item.Comp({}))}
        </div>
        {/* 牛逼！！ */}
      </article>
      <footer className={styles.tips}>
        Cmd+Up/Down: 缩放 &nbsp;|&nbsp; Ctrl+R: 重置 &nbsp;|&nbsp; 当前缩放:{' '}
        {Math.floor(scale * 100)}% &nbsp;|&nbsp; 偏移量：
        {transXY.x}px {transXY.y}px
      </footer>
    </div>
  );
};
