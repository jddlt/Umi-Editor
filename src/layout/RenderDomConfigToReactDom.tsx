import React, { useCallback } from 'react';
import { IDomItem } from '@/Components/BaseComp/index.d';

export const RenderDomConfigToReactDom = (
  props: IDomItem<any>[],
  handleClick: (e: string) => void,
) => {
  const loopDom = useCallback(
    (props: IDomItem<any>[]) => {
      return props.map(({ Comp, Props, Style, key, children }) => (
        <Comp
          key={key}
          props={Props}
          style={Style}
          onClick={e => {
            e.stopPropagation();
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
