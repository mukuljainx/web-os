"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDefaultRoutes = void 0;
var getDefaultRoutes = function () { return [
    {
        parent: null,
        icon: "root",
        id: "root",
        isFolder: true,
        name: "/",
        path: "/",
        appName: "folder",
        files: [
            {
                parent: "/",
                icon: "system",
                id: "system",
                isFolder: true,
                name: "System",
                path: "/System",
                appName: "folder",
                files: [],
            },
            {
                parent: "/",
                icon: "applications",
                id: "applications",
                isFolder: true,
                name: "Applications",
                path: "/Applications",
                appName: "folder",
                files: [],
            },
            {
                parent: "/",
                icon: "users",
                id: "users",
                isFolder: true,
                name: "Users",
                path: "/Users",
                appName: "folder",
                files: [
                    {
                        parent: "/Users",
                        icon: "home",
                        id: "home",
                        isFolder: true,
                        name: "${user}",
                        path: "/Users/${user}",
                        appName: "folder",
                        files: [
                            {
                                parent: "/Users/${user}",
                                icon: "desktop",
                                id: "desktop",
                                isFolder: true,
                                name: "Desktop",
                                path: "/Users/${user}/Desktop",
                                appName: "folder",
                                files: [
                                    {
                                        parent: "/Users/${user}/Desktop",
                                        icon: "generic",
                                        id: "desktop-1",
                                        isFolder: true,
                                        name: "Desktop 1",
                                        path: "/Users/${user}/Desktop/Desktop 1",
                                        appName: "folder",
                                        files: [],
                                    },
                                    {
                                        parent: "/Users/${user}/Desktop",
                                        icon: "generic",
                                        id: "desktop-2",
                                        isFolder: true,
                                        name: "Desktop 2",
                                        path: "/Users/${user}/Desktop/Desktop 2",
                                        appName: "folder",
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
]; };
exports.getDefaultRoutes = getDefaultRoutes;
//# sourceMappingURL=routes.js.map