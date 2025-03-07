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

export interface IQueryEvent {
  start_date?: string;
  end_date?: string;
}
