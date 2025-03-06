import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import EventApi from "../api/event";
import { ICreateEvent, IEvent } from "@/types/event";
import { useSocket } from "@/hooks/useSocket";
import { useEffect } from "react";
import { HTTPResponse } from "@/types/response";
import { produce } from "immer";

export const useGetRoomEventsQuery = (room: string) => {
  const queryClient = useQueryClient();
  const socket = useSocket((state) => state.socket);

  const query = useQuery({
    queryKey: ["events", room],
    queryFn: () => EventApi.getRoomEvents(room),
  });

  useEffect(() => {
    if (!socket) return;
    const handleNewEvent = (newEvent: IEvent) => {
      queryClient.setQueryData(
        ["events", room],
        (oldData: HTTPResponse<IEvent[]>) =>
          produce(oldData, (draft) => {
            draft.data.push(newEvent);
          })
      );
    };
    socket.on("new_event", handleNewEvent);
    return () => {
      socket.off("new_event", handleNewEvent);
    };
  }, [socket, queryClient, room]);

  return query;
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
