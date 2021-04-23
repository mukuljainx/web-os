import * as React from "react";

import { ShowMenuType, HideMenuType, IMenuItem } from "./interface";

const useGlobal = () => {
  const [state, setState] = React.useState<{
    style: React.CSSProperties;
    show: boolean;
    items: IMenuItem[];
  }>({ show: false, style: {}, items: [] });

  const hideMenu: HideMenuType = React.useCallback(() => {
    setState((prev) => ({
      ...prev,
      show: false,
    }));
  }, []);

  const showMenu: ShowMenuType = React.useCallback(({ items, ...props }) => {
    setState({
      show: true,
      style: props,
      items,
    });
  }, []);

  return { ...state, showMenu, hideMenu };
};

export default useGlobal;
