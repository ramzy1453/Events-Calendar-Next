import { ICreateEvent, IEvent } from "@/types/event";
import { Http } from "./http";

export default class EventApi {
  static async createEvent(room: string, event: ICreateEvent) {
    const response = await Http.post<IEvent, ICreateEvent>(
      `/event/${room}`,
      event
    );

    return response.data;
  }

  static async getRoomEvents(room: string) {
    const response = await Http.get<IEvent[]>(`/event/room/${room}`);

    return response.data;
  }
}
