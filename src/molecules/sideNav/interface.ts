export interface INavItem {
  name: string;
  icon: string;
  id: string;
  action: (event?: React.MouseEvent, id?: string) => void;
}
