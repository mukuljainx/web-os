export interface IMenuItem {
  icon?: string;
  label: string;
  action?: (label: string, id: string) => void;
  id: string;
}

export type ShowMenuType = (props: {
  left: number;
  top: number;
  items: IMenuItem[];
}) => void;

export type HideMenuType = () => void;
