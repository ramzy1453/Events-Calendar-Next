import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import EventApi from "../api/event";
import { ICreateEvent } from "@/types/event";

export const useGetRoomEventsQuery = (room: string) => {
  return useQuery({
    queryKey: ["events", room],
    queryFn: () => EventApi.getRoomEvents(room),
  });
};

export const useCreateEventMutation = (room: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (event: ICreateEvent) => EventApi.createEvent(room, event),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events", room] });
    },
  });
};
