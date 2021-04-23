export interface IMenuItem {
  icon?: string;
  label: string;
  action?: (label: string, id: string) => void;
  disabled?: boolean;
  id: string;
}

export type ShowMenuType = (props: {
  left: number;
  top: number;
  items: MenuItemsType[];
}) => void;

export type HideMenuType = () => void;

export type MenuItemsType = Array<
  IMenuItem & { children?: IMenuItem[] | IMenuItem[][] }
>;
