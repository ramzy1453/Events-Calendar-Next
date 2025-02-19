export interface IDay {
  date: Date;
  events: IEvent[];
}
export interface IEvent {
  id: string;
  title: string;
  date: Date;
  description: string;
  color: string;
}
