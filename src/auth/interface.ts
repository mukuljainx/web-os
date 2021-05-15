export interface IUser {
  guest: boolean;
  name: string;
  type: "ADMIN" | "USER";
  avatar: string | null;
  active: boolean;
  id: number | string;
  email: string;
  token: string;
}
