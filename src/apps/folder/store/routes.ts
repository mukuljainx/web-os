import { IFile } from "../interfaces";

// interface IState {
//   root: IFile;
// }

export const getDefaultRoutes = (): IFile => ({
  parent: null,
  icon: "root",
  id: "root",
  isFolder: true,
  name: "/",
  path: "/",
  appName: "folder",
  files: {
    system: {
      parent: "/",
      icon: "system",
      id: "system",
      isFolder: true,
      name: "System",
      path: "/System",
      appName: "folder",
      files: {},
    },
    applications: {
      parent: "/",
      icon: "applications",
      id: "applications",
      isFolder: true,
      name: "Applications",
      path: "/Applications",
      appName: "folder",
      files: {},
    },
    users: {
      parent: "/",
      icon: "users",
      id: "users",
      isFolder: true,
      name: "Users",
      path: "/Users",
      appName: "folder",
      files: {
        home: {
          parent: "/Users",
          icon: "home",
          id: "home",
          isFolder: true,
          name: "${user}",
          path: "/Users/${user}",
          appName: "folder",
          files: {
            desktop: {
              parent: "/Users/${user}",
              icon: "desktop",
              id: "desktop",
              isFolder: true,
              name: "Desktop",
              path: "/Users/${user}/Desktop",
              appName: "folder",
              files: {
                "desktop-1": {
                  parent: "/Users/${user}/Desktop",
                  icon: "folder",
                  id: "desktop-1",
                  isFolder: true,
                  name: "Desktop 1",
                  path: "/Users/${user}/Desktop/Desktop 1",
                  appName: "folder",
                  files: {},
                },
                "desktop-2": {
                  parent: "/Users/${user}/Desktop",
                  icon: "folder",
                  id: "desktop-2",
                  isFolder: true,
                  name: "Desktop 2",
                  path: "/Users/${user}/Desktop/Desktop 2",
                  appName: "folder",
                  files: {},
                },
              },
            },
          },
        },
      },
    },
  },
});
