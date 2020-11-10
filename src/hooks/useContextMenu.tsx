import React, { useEffect, useState, useRef, useContext } from 'react';
import styled from 'styled-components';
import { DomListContext, SetDomListContext } from '@/store';
import cloneDeep from 'lodash/cloneDeep';
import { findCompByKey } from '@/utils/index';

interface IMenuOptions {
  title: string;
  done: () => void;
}
const Menu = styled.div`
  width: 70px;
  border: 1px solid #eee;
  box-shadow: 0 0 4px #eee;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 99;
  background-color: #fff;
  .menuList {
    cursor: pointer;
    width: 100%;
    height: 32px;
    line-height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #333;
    font-size: 14px;
  }
  .menuList:hover {
    background-color: #eee;
  }
`;

const useContextMenu = () => {
  const domList = useContext(DomListContext);
  const setDomList = useContext(SetDomListContext);
  const [menuShow, setMenuShow] = useState(false);
  const [point, setPoint] = useState({ x: '0', y: '0' });
  const rightClickKey = useRef<null | string>(null);
  const menuOptions: IMenuOptions[] = [
    { title: '复制', done: copyNode },
    { title: '删除', done: deleteNode },
  ];

  const displayMemu = () => setMenuShow(false);

  useEffect(() => {
    document.addEventListener('click', displayMemu);
    return () => document.removeEventListener('click', displayMemu);
  }, []);

  const ContextClick = (event: React.MouseEvent, key: string) => {
    event.preventDefault();
    rightClickKey.current = String(key);
    setPoint({ x: `${event.clientX}px`, y: `${event.clientY}px` });
    setMenuShow(true);
  };

  function copyNode() {
    if (!rightClickKey.current) return;
    let data: any = [...domList];
    findCompByKey(data, rightClickKey.current, (item, index, arr) => {
      arr.splice(index, 0, cloneDeep(changeKey(item)));
    });
    setDomList(data);
  }

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

  function deleteNode() {
    if (!rightClickKey.current) return;
    let data: any = [...domList];
    findCompByKey(data, rightClickKey.current, (_, index, arr) => {
      arr.splice(index, 1);
    });
    setDomList(data);
  }

  const MenuList = (
    <Menu
      style={{
        display: menuShow ? 'block' : 'none',
        left: point.x,
        top: point.y,
      }}
    >
      {menuOptions.map(item => (
        <div className="menuList" onClick={item.done} key={item.title}>
          {item.title}
        </div>
      ))}
    </Menu>
  );

  return [MenuList, ContextClick] as [
    JSX.Element,
    (event: React.MouseEvent, key: string) => void,
  ];
};

export default useContextMenu;
