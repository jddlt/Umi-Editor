import React from 'react';

// 核心 渲染DomList
export const DomListContext = React.createContext<Txp.IDomListContext>([]);
// 设置
export const SetDomListContext = React.createContext<Txp.ISetDomListContext>(
  () => {},
);

// 当前选中的Dom
export const CurrentDomContext = React.createContext<Txp.ICurrentDomContext>(
  {},
);
// 设置
export const SetCurrentDomContext = React.createContext<
  Txp.ISetCurrentDomContext
>(() => {});
