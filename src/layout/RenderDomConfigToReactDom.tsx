import React, { useCallback } from 'react';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import useContextMenu from '@/hooks/useContextMenu';
import { createPortal } from 'react-dom';

export const RenderDomConfigToReactDom = (
  props: Txp.IChild[],
  handleClick: (e: string) => void,
) => {
  const [MenuList, ContextClick] = useContextMenu();
  const loopDom = useCallback(
    (props: Txp.IChild[]) => {
      return props.map(
        ({ Comp, Props, Style, key, children }) =>
          Comp && (
            <Comp
              key={key}
              props={{
                ...Props,
                ...transStaticChildren(
                  (children || []).filter((item: Txp.IChild) => !item.Comp),
                ),
                onContextMenu: (e: React.MouseEvent) => {
                  ContextClick(e, key as string);
                },
              }}
              style={Style}
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                handleClick && handleClick(key as string);
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
          ),
      );
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
  return (
    <>
      {Dom}
      {createPortal(MenuList, document.body)}
    </>
  );
};
