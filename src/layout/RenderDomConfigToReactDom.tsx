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
          props={Props}
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
          {Array.isArray(children) && children.length ? (
            loopDom(children)
          ) : (
            <span
              dangerouslySetInnerHTML={{ __html: Props.children || '' }}
            ></span>
          )}
        </Comp>
      ));
    },
    [props],
  );
  return loopDom(props);
};
