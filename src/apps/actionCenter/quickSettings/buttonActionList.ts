import { IButtonAction } from "../interface";

export const buttonActions: Array<Omit<IButtonAction, "selected">> = [
  {
    type: "WITH_OPTIONS",
    label: "WiFi",
    icon: "wifi",
    id: "wifi",
  },
  {
    type: "WITH_OPTIONS",
    label: "Bluetooth",
    icon: "bluetooth",
    id: "bluetooth",
  },
  {
    type: "NESTED",
    label: "Not Connected",
    icon: "TVMonitor",
    id: "external-monitor",
  },
  {
    id: "theme",
    type: "NESTED",
    label: "Light Mode",
    icon: "Lightbulb",
  },
  {
    id: "tablet-mode",
    label: "Tablet mode",
    icon: "TabletMode",
  },
  {
    id: "dnd",
    label: "Do not distrub",
    icon: "Blocked2",
  },
  {
    id: "airplane",
    label: "Airplane",
    icon: "Airplane",
  },
  {
    id: "location",
    label: "Location",
    icon: "MapPin",
  },
  {
    id: "ease-of-access",
    label: "Ease of Access",
    icon: "EaseOfAccess",
    type: "NESTED",
  },
];

export const dummyNotification = [
  {
    title: "Budget Book",
    description: "Just got installed, check it out.",
    date: new Date().getTime(),
    id: 1,
  },
  {
    title: "Ping Pong",
    description: "Just got installed, check it out.",
    date: new Date().getTime() - 23134,
    id: 2,
  },
];
