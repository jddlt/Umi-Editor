import React, { useCallback } from 'react';
import { IDomItem } from '@/Components/BaseComp/index.d';

export const RenderDomConfigToReactDom = (props: IDomItem<any>[]) => {
  const loopDom = useCallback(
    (props: IDomItem<any>[]) => {
      return props.map(({ Comp, Props, Style, key, children }) => (
        <Comp props={Props} key={key} style={Style}>
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
