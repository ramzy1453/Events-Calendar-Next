import { IUser } from "./user";

export interface ICreateEvent {
  name: string;
  description: string;
  date: Date;
}

export interface IEvent {
  _id: string;
  name: string;
  date: Date;
  description: string;
  user: IUser;
}
