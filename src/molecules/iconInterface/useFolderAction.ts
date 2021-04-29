import * as React from "react";
import { useDispatch } from "react-redux";

import { createFolder, sortFolder } from "apps/folder/store";

const useFolderAction = ({
  route,
  user,
  clearStore,
}: {
  route?: string;
  user: string;
  clearStore: () => void;
}) => {
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
        case "sort-name": {
          dispatch(sortFolder({ route, sortKey: "NAME" }));
          clearStore();
          return;
        }
        case "sort-date-created": {
          dispatch(sortFolder({ route, sortKey: "createdOn" }));
          clearStore();
          return;
        }
        case "sort-date-updated": {
          dispatch(sortFolder({ route, sortKey: "updateOn" }));
          clearStore();
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
    },
    {
      label: "Sort By",
      action: MenuItemAction,
      id: "sort-by",
      children: [
        {
          label: "Name",
          action: MenuItemAction,
          id: "sort-name",
        },
        {
          label: "Date Created",
          action: MenuItemAction,
          id: "sort-date-created",
        },
        {
          label: "Date Modified",
          action: MenuItemAction,
          id: "sort-date-updated",
        },
      ],
    },
  ];

  return { menuItems };
};

export default useFolderAction;
