import { IEvent } from "./event";

export interface IDay {
  date: Date;
  events: IEvent[];
}
