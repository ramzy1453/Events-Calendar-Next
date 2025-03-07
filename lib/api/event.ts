import { ICreateEvent, IEvent, IQueryEvent } from "@/types/event";
import { Http } from "./http";
import { buildUrl } from "@/utils/url";

export default class EventApi {
  static async createEvent(room: string, event: ICreateEvent) {
    const response = await Http.post<IEvent, ICreateEvent>(
      `/event/${room}`,
      event
    );

    return response.data;
  }

  static async getRoomEvents(room: string, query: IQueryEvent) {
    const response = await Http.get<IEvent[]>(
      buildUrl(`/event/room/${room}`, query)
    );

    return response.data;
  }
}
