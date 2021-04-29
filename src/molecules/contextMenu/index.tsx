import * as React from "react";
import * as ReactDOM from "react-dom";

import Menu from "./menu";
import useGlobal from "./useGlobal";
import useLocal from "./useLocal";
import { MenuItemsType, IMenuItem } from "./interface";

interface IProps {
  wrapperRef: React.RefObject<HTMLDivElement | null>;
  items: MenuItemsType[] | MenuItemsType;
  childMenu?: {
    show: boolean;
    style: React.CSSProperties;
  };
}

const getMenuItems = (dirtyItems: MenuItemsType[] | MenuItemsType) => {
  let itemsGroup: MenuItemsType[] = [];
  if (!Array.isArray(dirtyItems[0])) {
    itemsGroup = [dirtyItems as MenuItemsType];
  } else {
    itemsGroup = dirtyItems as MenuItemsType[];
  }

  return itemsGroup.map((items) => {
    return items.map((i) => {
      let x: MenuItemsType[] = [];
      if (i.children && i.children.length > 0) {
        if (!Array.isArray(i.children[0])) {
          x = [i.children as MenuItemsType];
        } else {
          x = i.children as MenuItemsType[];
        }
      }
      return {
        ...i,
        children: i.children ? (x as MenuItemsType[]) : undefined,
      };
    });
  });
};

const ContextMenu = ({ wrapperRef, items: dirtyItems, childMenu }: IProps) => {
  let items = React.useMemo(() => {
    return getMenuItems(dirtyItems);
  }, [dirtyItems]);

  const menuRef = React.useRef<HTMLDivElement>(null);
  const state = useGlobal(wrapperRef, menuRef);
  const childState = useLocal();

  const handleItemClick = React.useCallback(
    (event: React.MouseEvent) => {
      if (!childMenu) {
        childState.hideMenu();
      }
      const element = event.currentTarget;
      const isChildMenu = element.getAttribute("data-childmenu") === "true";
      const i = parseInt(element.getAttribute("data-row")!, 10);
      const j = parseInt(element.getAttribute("data-col")!, 10);

      let item: IMenuItem = items[i][j];
      if (isChildMenu) {
        item = childState.items[i][j];
      }

      if (!item.action) {
        return;
      }
      item.action!(item.label, item.id);
      state.hideMenu();
    },
    [items, childState]
  );

  const handleItemMouseEnter = React.useCallback(
    (event: React.MouseEvent) => {
      const element = event.currentTarget;
      const i = parseInt(element.getAttribute("data-row")!, 10);
      const j = parseInt(element.getAttribute("data-col")!, 10);
      const childItems = items[i][j].children || [];

      if (childItems.length === 0) {
        childState.hideMenu();
        return;
      }
      childState.showMenu({
        items: childItems,
        left: element.getBoundingClientRect().right,
        top: element.getBoundingClientRect().top,
      });
    },
    [items]
  );

  React.useEffect(() => {
    childState.hideMenu();
  }, [state.show]);

  return (
    <>
      {ReactDOM.createPortal(
        <span ref={menuRef} onMouseLeave={childState.hideMenu}>
          <Menu
            test-id="context-menu"
            itemAction={{
              onClick: handleItemClick,
              onMouseEnter: handleItemMouseEnter,
            }}
            show={state.show}
            style={state.style}
            items={items}
          />
          <Menu
            test-id="child-context-menu"
            itemAction={{
              onClick: handleItemClick,
            }}
            childMenu
            show={childState.show}
            style={childState.style}
            items={childState.items}
          />
        </span>,
        document.body
      )}
    </>
  );
};

export default React.memo(ContextMenu);
