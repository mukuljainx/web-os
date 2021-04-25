export type IMetaData = Partial<{
  mousePosition: {
    x: number;
    y: number;
  };
}>;

export interface IApp {
  icon: string;
  appName: string;
  id: string;
  name: string;
  sleepTimeout: number;
  data: Record<string, any>;
  metaData?: IMetaData;
}

export interface IAppGroup extends Pick<IApp, "id" | "name"> {
  instances: IApp[];
  // to sort in appBar
  // no pinning as of now or dragging
  initialWeight: number;
  weight: number;
}
