import React, { useCallback, useState } from 'react';
import { IDomItem } from '@/Components/BaseComp/index.d';
import {
  SortableContainer,
  SortableElement,
  SortEnd,
  SortEvent,
} from 'react-sortable-hoc';

export const RenderDomConfigToReactDom = (
  props: IDomItem<any>[],
  handleClick: (e: string) => void,
) => {
  const [activeKey, setActiveKey] = useState<string>('');
  const loopDom = useCallback(
    (props: IDomItem<any>[]) => {
      return props.map(({ Comp, Props, Style, key, children }) => (
        <Comp
          key={key}
          props={{
            ...Props,
            ...transStaticChildren((children || []).filter(item => !item.Comp)),
          }}
          // {}
          style={{
            ...Style,
            outline:
              activeKey === key ? '1px dashed green !important' : undefined,
          }}
          onClick={e => {
            e.stopPropagation();
            setActiveKey(key);
            handleClick && handleClick(key);
          }}
        >
          {Array.isArray(children) &&
          children.filter(item => item.Comp)?.length ? (
            loopDom(children.filter(item => item.Comp))
          ) : (
            <span
              dangerouslySetInnerHTML={{ __html: Props?.children || '' }}
            ></span>
          )}
        </Comp>
      ));
    },
    [props],
  );
  const transStaticChildren = (Children: any) => {
    const props: any = {};
    Children.forEach((item: any) => {
      props[item.title] = item.children?.length ? loopDom(item.children) : null;
    });
    return props;
  };
  const Dom = loopDom(props);
  console.log('Dom', Dom);
  return Dom;
};
