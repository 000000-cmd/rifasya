export interface ListItem {
  id: string;
  code: string;
  name: string;
  order: number;
  indicatorEnabled?: boolean;
  payload?: any;
}
