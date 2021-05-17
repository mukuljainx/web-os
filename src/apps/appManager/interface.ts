import { IUser } from "auth/interface";

export interface IApp {
  name: string;
  icon: string;
  appId: string;
  userId: string;
  type: "GLOBAL" | "LOCAL";
  options: {
    width: number | string;
    height: number | string;
  };
  _id: string;
  updatedAt: Date;
  createdAt: Date;
  user: IUser;
}
