import React, { useRef, useState, useEffect, useContext } from 'react';
import { Tabs, Tree, message } from 'antd';
import styles from './index.less';
import cloneDeep from 'lodash/cloneDeep';
import { findCompByKey } from '@/utils/index';
import AntdComp from '@/Components/Antd';
import { DataNode } from 'antd/lib/tree';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import {
  DomListContext,
  SetDomListContext,
  SetCurrentDomContext,
} from '@/store';

const { TabPane } = Tabs;

export default () => {
  const domList = useContext(DomListContext);
  const setDomList = useContext(SetDomListContext);
  const setCurrent = useContext(SetCurrentDomContext);

  const [menuShow, setMenuShow] = useState(false);
  const [point, setPoint] = useState({ x: '0', y: '0' });
  const rightClickKey = useRef<null | string>(null);
  function handleDragStart(e: React.DragEvent, name: string) {
    e.dataTransfer.dropEffect = 'move';
    e.dataTransfer.setData('name', name);
  }
  const onDrop = (info: any) => {
    const dropKey = info.node.props.eventKey; // 掉落的目标
    const dragKey = info.dragNode.props.eventKey; // 拖拽的目标
    const isContainer = info.node.Container; // 掉落的目标是否是容器
    const dropPos = info.node.props.pos.split('-'); // 啥玩意
    const dropPosition =
      info.dropPosition - Number(dropPos[dropPos.length - 1]); // 掉落的目标的位置 1:上  2:下  0:内

    if (!isContainer && dropPosition === 0)
      return message.error('无法放入非容器组件中');

    let data: any = [...domList];
    let dragObj: Txp.IChild = {} as Txp.IChild;
    findCompByKey(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1);
      dragObj = cloneDeep(item);
    });

    if (!info.dropToGap) {
      findCompByKey(data, dropKey, item => {
        try {
          item.children = item.children || [];
          item.children.push(dragObj);
        } catch (err) {
          console.warn('err', item, dragObj, err);
        }
      });
    } else if (
      (info.node.props.children || []).length > 0 &&
      info.node.props.expanded &&
      dropPosition === 1
    ) {
      findCompByKey(data, dropKey, item => {
        item.children = item.children || [];
        item.children.unshift(dragObj);
      });
    } else {
      let ar: Txp.IChild[] = [];
      let i: number = 0;
      findCompByKey(data, dropKey, (_, index, arr) => {
        ar = arr;
        i = index;
      });
      if (dropPosition === -1) {
        if (ar[i].disabled) return message.error('无法放入非容器组件中');
        ar.splice(i, 0, dragObj);
      } else {
        ar.splice(i + 1, 0, dragObj);
      }
    }
    setDomList(data);
  };

  const displayMemu = () => setMenuShow(false);

  useEffect(() => {
    document.addEventListener('click', displayMemu);
    return () => document.removeEventListener('click', displayMemu);
  }, []);

  const MemuList = () => {
    return (
      <div
        className={styles.menu}
        style={{
          display: menuShow ? 'block' : 'none',
          left: point.x,
          top: point.y,
        }}
      >
        <div className={styles.menuList} onClick={copyNode}>
          复制
        </div>
        <div className={styles.menuList} onClick={deleteNode}>
          删除
        </div>
      </div>
    );
  };

  const copyNode = () => {
    if (!rightClickKey.current) return;
    let data: any = [...domList];
    findCompByKey(data, rightClickKey.current, (item, index, arr) => {
      arr.splice(index, 0, cloneDeep(changeKey(item)));
    });
    setDomList(data);
  };

  const changeKey = (data: any, index = 0) => {
    return {
      ...data,
      key: `${data.Name}_${index}${Date.now()}`,
      children:
        data.children?.map((item: any, index2: number) =>
          changeKey(item, index2),
        ) || [],
    };
  };

  const deleteNode = () => {
    if (!rightClickKey.current) return;
    let data: any = [...domList];
    findCompByKey(data, rightClickKey.current, (_, index, arr) => {
      arr.splice(index, 1);
    });
    setDomList(data);
  };

  const SortableCompContainer = SortableContainer(() => (
    <div className={styles.realContainer}>
      <div className={styles.tabContainer}>
        {Object.entries(AntdComp).map(([_, Item]) => (
          <SortableComp
            handleDragStart={handleDragStart}
            Preview={Item.Preview}
          />
        ))}
      </div>
    </div>
  ));

  const SortableComp = SortableElement(({ handleDragStart, Preview }: any) => (
    <Preview onDragStart={handleDragStart} />
  ));

  return (
    <div className={styles['baseCmpContainer']}>
      <Tabs
        defaultActiveKey="Comp"
        onChange={() => {}}
        style={{ padding: '0 12px' }}
      >
        <TabPane tab="基础组件" key="Comp">
          <div className={styles.tabContainer}>
            {Object.entries(AntdComp).map(([_, Item]) => (
              <Item.Preview key={Item.Name} onDragStart={handleDragStart} />
            ))}
          </div>
          {/* <SortableCompContainer helperClass={styles.helper} /> */}
        </TabPane>
        <TabPane tab="页面结构" key="tree">
          {domList.length > 0 ? (
            <Tree
              className="draggable-tree"
              draggable
              blockNode
              key="key"
              onDragEnter={() => {}}
              onDrop={onDrop}
              onRightClick={({ event, node }) => {
                event.preventDefault();
                if (node.disabled) return;
                rightClickKey.current = String(node.key);
                setPoint({ x: `${event.clientX}px`, y: `${event.clientY}px` });
                setMenuShow(true);
              }}
              onClick={(_, b) => {
                // @ts-ignore
                if (b.Comp) setCurrent({ ...b });
              }}
              treeData={domList as DataNode[]}
            />
          ) : (
            <div style={{ textAlign: 'center', letterSpacing: '1px' }}>
              空空的没有DOM!{' '}
            </div>
          )}
        </TabPane>
      </Tabs>
      <MemuList />
    </div>
  );
};
