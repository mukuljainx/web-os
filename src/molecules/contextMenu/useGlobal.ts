import * as React from "react";

const useGlobal = (
  wrapperRef: React.RefObject<HTMLDivElement | null>,
  menuRef: React.RefObject<HTMLDivElement | null>
) => {
  const [state, setState] = React.useState<{
    style: React.CSSProperties;
    show: boolean;
  }>({ show: false, style: {} });

  const handleContextMenuClick = React.useCallback((event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setState({
      style: { left: event.clientX + 8, top: event.clientY + 8 },
      show: true,
    });
  }, []);

  const hideMenu = React.useCallback((event?: MouseEvent) => {
    if (
      event &&
      menuRef.current &&
      menuRef.current.contains((event.target as HTMLElement)!)
    ) {
      return;
    }
    setState((prev) => ({
      ...prev,
      show: false,
    }));
  }, []);

  React.useEffect(() => {
    wrapperRef.current?.addEventListener("contextmenu", handleContextMenuClick);
    return () => {
      wrapperRef.current?.removeEventListener(
        "contextmenu",
        handleContextMenuClick
      );
    };
  }, [wrapperRef]);

  React.useEffect(() => {
    if (state.show) {
      document.addEventListener("click", hideMenu);
    } else {
      document.removeEventListener("click", hideMenu);
    }
  }, [state.show]);

  return { ...state, hideMenu };
};

export default useGlobal;
