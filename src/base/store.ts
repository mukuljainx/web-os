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
        path: "/System",
        files: [],
      },
      {
        parent: "/",
        icon: "system",
        id: "system",
        isFolder: true,
        name: "Applications",
        path: "/Applications",
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
            parent: "/Users",
            icon: "home",
            id: "home",
            isFolder: true,
            name: "${user}",
            path: "/Users/${user}",
            files: [
              {
                parent: "/Users/${user}",
                icon: "desktop",
                id: "desktop",
                isFolder: true,
                name: "Desktop",
                path: "/Users/${user}/Desktop",
                files: [
                  {
                    parent: "/Users/${user}/Desktop",
                    icon: "generic",
                    id: "desktop-1",
                    isFolder: true,
                    name: "Desktop 1",
                    path: "/Users/${user}/Desktop/Desktop 1",
                    files: [],
                  },
                  {
                    parent: "/Users/${user}/Desktop",
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
  sampleAction: () => (state: IState): IState => ({
    ...state,
  }),
};
