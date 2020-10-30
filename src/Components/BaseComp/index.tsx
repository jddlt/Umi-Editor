import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
  ReactElement,
} from 'react';
import { Tabs, Tree, message } from 'antd';
import { IDomItem } from '@/Components/BaseComp/index.d';
import styles from './index.less';
import AntdComp from '@/Components/Antd';

const { TabPane } = Tabs;

interface IProps {
  domList: IDomItem<any>[];
  setDomList: Dispatch<SetStateAction<IDomItem<any>[]>>;
}

export default (props: IProps) => {
  const { domList, setDomList } = props;
  function handleDragStart(e: React.DragEvent, name: string) {
    e.dataTransfer.dropEffect = 'move';
    e.dataTransfer.setData('name', name);
  }

  const onDrop = (info: any) => {
    console.log(info);
    const dropKey = info.node.props.eventKey; // 掉落的目标
    const dragKey = info.dragNode.props.eventKey; // 拖拽的目标
    const isContainer = info.node.Container; // 掉落的目标是否是容器
    const dropPos = info.node.props.pos.split('-'); // 啥玩意
    const dropPosition =
      info.dropPosition - Number(dropPos[dropPos.length - 1]); // 掉落的目标的位置 1:上  2:下  0:内

    if (!isContainer && dropPosition === 0)
      return message.error('无法放入非容器组件中');

    const loop = (
      data: IDomItem<any>[],
      key: string,
      callback: (
        item: IDomItem<any>,
        index: number,
        arr: IDomItem<any>[],
      ) => void,
    ) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].key === key) {
          return callback(data[i], i, data);
        }
        if (data[i].children) {
          loop(data[i].children || [], key, callback);
        }
      }
    };

    let data: any = [...domList];
    let dragObj: IDomItem<any> = {} as IDomItem<any>;
    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1);
      dragObj = item;
    });

    if (!info.dropToGap) {
      loop(data, dropKey, item => {
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
      loop(data, dropKey, item => {
        item.children = item.children || [];
        item.children.unshift(dragObj);
      });
    } else {
      let ar: IDomItem<any>[] = [];
      let i: number = 0;
      loop(data, dropKey, (_, index, arr) => {
        ar = arr;
        i = index;
      });
      if (dropPosition === -1) {
        ar.splice(i, 0, dragObj);
      } else {
        ar.splice(i + 1, 0, dragObj);
      }
    }
    console.log('data111', data);
    setDomList(data);
  };

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
              treeData={domList}
            />
          ) : (
            <div style={{ textAlign: 'center', letterSpacing: '1px' }}>
              空空的没有DOM!{' '}
            </div>
          )}
        </TabPane>
      </Tabs>
    </div>
  );
};
