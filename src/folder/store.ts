import { IFile } from "./interfaces";

interface IState {
  root: IFile;
}

export const initialState: IState = {
  root: {
    parent: null,
    icon: "root",
    id: "root",
    isFolder: true,
    name: "/",
    path: "/",
    files: [
      {
        parent: "/",
        icon: "system",
        id: "system",
        isFolder: true,
        name: "System",
        path: "/system",
        files: [],
      },
      {
        parent: "/",
        icon: "system",
        id: "system",
        isFolder: true,
        name: "Applications",
        path: "/system",
        files: [],
      },
      {
        parent: "/",
        icon: "system",
        id: "system",
        isFolder: true,
        name: "System",
        path: "/System",
        files: [],
      },
      {
        parent: "/",
        icon: "users",
        id: "users",
        isFolder: true,
        name: "Users",
        path: "/Users",
        files: [
          {
            parent: "/users",
            icon: "home",
            id: "home",
            isFolder: true,
            name: "${user}",
            path: "/Users/${user}",
            files: [
              {
                parent: "/users/${user}",
                icon: "desktop",
                id: "desktop",
                isFolder: true,
                name: "Desktop",
                path: "/Users/${user}/Desktop",
                files: [
                  {
                    parent: "/users/${user}/Dekstop",
                    icon: "generic",
                    id: "desktop-1",
                    isFolder: true,
                    name: "Desktop 1",
                    path: "/Users/${user}/Desktop/Desktop 1",
                    files: [],
                  },
                  {
                    parent: "/users/${user}/Dekstop",
                    icon: "generic",
                    id: "desktop-2",
                    isFolder: true,
                    name: "Desktop 2",
                    path: "/Users/${user}/Desktop/Desktop 2",
                    files: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
};

export const actionCreators = {
  getProblemsStarted: () => (state: IState) => ({
    ...state,
    loading: true,
  }),
};
