export interface INotification {
  title: string;
  description: string;
  date: number;
  id: number;
}

export type ButtonType = "NESTED" | "WITH_OPTIONS";
export interface IButtonAction {
  type?: ButtonType;
  label: string;
  icon: string;
  id: string;
  selected: boolean;
}
