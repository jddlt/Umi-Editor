import React, { useEffect, useState, ReactNode } from 'react';
import { Tabs, Tree, message } from 'antd';
import { IDomList } from '@/Components/BaseComp/index.d';
import { DataNode } from 'antd/lib/tree';
import styles from './index.less';
import TxpButton from './Button';
import TxpSwitch from './Switch';
import TxpInput from './Input';
import TxpCard from './Card';
import TxpForm from './Form';
import TxpRow from './Row';

const { TabPane } = Tabs;

interface IProps {
  domList: IDomList[];
  setDomList: (f: (draft: IDomList[]) => void | IDomList) => void;
}
interface ITransData extends DataNode {
  comp: ReactNode;
  container?: boolean;
  children: ITransData[];
}

export default (props: IProps) => {
  const { domList, setDomList } = props;
  const [transData, setTransData] = useState<ITransData[]>([]);
  function handleDragStart(e: React.DragEvent, name: string) {
    e.dataTransfer.dropEffect = 'move';
    e.dataTransfer.setData('name', name);
  }

  useEffect(() => {
    const data = domList.map((item, index) => ({
      key: `${item.Name}_${index}`,
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
      children: [],
      comp: item.Comp,
    }));
    setTransData([...data]);
  }, [domList]);

  // React.cloneElement

  // useEffect(() => {
  //   const data: IDomList[] = transData.map((item) => {
  //     return {
  //       Name: item.title,
  //       Comp: ,
  //       Container: item.container
  //     }
  //   })
  // }, [transData])

  const onDrop = (info: any) => {
    console.log(info);
    const dropKey = info.node.props.eventKey; // 掉落的目标
    const dragKey = info.dragNode.props.eventKey; // 拖拽的目标
    const isContainer = info.node.container; // 掉落的目标是否是容器
    const dropPos = info.node.props.pos.split('-'); // 啥玩意
    const dropPosition =
      info.dropPosition - Number(dropPos[dropPos.length - 1]); // 掉落的目标的位置 1:上  2:下  0:内

    if (!isContainer && dropPosition === 0)
      return message.error('无法放入非容器组件中');

    const loop = (
      data: ITransData[],
      key: string,
      callback: (item: ITransData, index: number, arr: ITransData[]) => void,
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

    const data = [...transData];
    let dragObj: ITransData = {} as ITransData;
    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1);
      dragObj = item;
    });

    if (!info.dropToGap) {
      loop(data, dropKey, item => {
        item.children = item.children || [];
        // where to insert 示例添加到尾部，可以是随意位置
        item.children.push(dragObj);
      });
    } else if (
      (info.node.props.children || []).length > 0 && // Has children
      info.node.props.expanded && // Is expanded
      dropPosition === 1 // On the bottom gap
    ) {
      loop(data, dropKey, item => {
        item.children = item.children || [];
        // where to insert 示例添加到头部，可以是随意位置
        item.children.unshift(dragObj);
      });
    } else {
      let ar: ITransData[] = [];
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
    setTransData([...data]);
  };

  return (
    <div className={styles['baseCmpContainer']}>
      <Tabs defaultActiveKey="Comp" onChange={() => {}}>
        <TabPane tab="基础组件" key="Comp">
          <TxpButton onDragStart={handleDragStart} />
          <br />
          <TxpInput onDragStart={handleDragStart} />
          <br />
          <TxpSwitch onDragStart={handleDragStart} />
          <br />
          <TxpCard onDragStart={handleDragStart} />
          <br />
          <TxpForm onDragStart={handleDragStart} />
          <br />
          <TxpRow onDragStart={handleDragStart} />
        </TabPane>
        <TabPane tab="页面结构" key="tree">
          {transData.length > 0 ? (
            <Tree
              className="draggable-tree"
              // defaultExpandedKeys={this.state.expandedKeys}
              draggable
              blockNode
              onDragEnter={() => {}}
              onDrop={onDrop}
              treeData={transData}
            />
          ) : (
            <span>空空的没有DOM!</span>
          )}
        </TabPane>
      </Tabs>
    </div>
  );
};