import * as React from "react";
import { useDispatch } from "react-redux";

import { createFolder } from "../store";

const useFolderAction = ({ route, user }: { route?: string; user: string }) => {
  const dispatch = useDispatch();

  const MenuItemAction = React.useCallback(
    (__: string, id: string) => {
      if (!route) {
        return;
      }
      switch (id) {
        case "new-folder": {
          dispatch(createFolder({ route, user }));
          return;
        }
      }
    },
    [route]
  );

  const menuItems = [
    {
      label: "New Folder",
      action: MenuItemAction,
      id: "new-folder",
      icon: "ViewAll",
    },
  ];

  return { menuItems };
};

export default useFolderAction;
