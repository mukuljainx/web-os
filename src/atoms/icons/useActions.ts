import * as React from "react";
import * as actions from "apps/folder/store";
import { useDispatch } from "react-redux";

const useActions = (
  iconRef: React.RefObject<HTMLElement>,
  label: string,
  path: string
) => {
  const folderName = React.useRef(label);
  const dispatch = useDispatch();
  const initRename = React.useCallback(() => {
    const pElement = iconRef.current!.children[1] as HTMLElement;
    pElement.classList.remove("ellipsis");
    pElement.contentEditable = "true";
    pElement.focus();
  }, []);

  const renameFolder = React.useCallback(
    (event: React.FocusEvent) => {
      const element = event.target as HTMLElement;
      const text = element.textContent || "";
      if (folderName.current === text) {
        return;
      }
      folderName.current = text;
      dispatch(
        actions.renameFolder({
          route: path,
          name: folderName.current,
        })
      );
      element.classList.add("ellipsis");
      element.contentEditable = "false";
    },
    [dispatch, actions.renameFolder, path]
  );

  const deleteFolder = React.useCallback(() => {
    dispatch(
      actions.deleteFolder({
        route: path,
        name: folderName.current,
      })
    );
  }, [dispatch, actions.deleteFolder]);

  return { renameFolder, initRename, deleteFolder };
};

export default useActions;
