import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import RoomApi from "@/lib/api/room";
import { ICreateRoom } from "@/types/room.d";

export const useRoomsQuery = () => {
  return useQuery({
    queryKey: ["rooms"],
    queryFn: RoomApi.getRooms,
  });
};

export const useRoomQuery = (id: string) => {
  return useQuery({
    queryKey: ["room", id],
    queryFn: () => RoomApi.getRoomById(id),
    enabled: !!id,
  });
};

export const useCreateRoomMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (room: ICreateRoom) => RoomApi.createRoom(room),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
    },
  });
};

export const useUpdateRoomMutation = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (room: ICreateRoom) => RoomApi.updateRoomById(id, room),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["room", id] });
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
    },
  });
};

export const useDeleteRoomMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => RoomApi.deleteRoomById(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
    },
  });
};

export const useJoinRoomMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => RoomApi.joinRoom(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
    },
  });
};

export const useLeaveRoomMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => RoomApi.leaveRoom(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
    },
  });
};

export const useRoomMembersQuery = (id: string) => {
  return useQuery({
    queryKey: ["room", id, "members"],
    queryFn: () => RoomApi.getRoomMembers(id),
    enabled: !!id,
  });
};

export const useGrantRoleMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      userId,
      role,
    }: {
      id: string;
      userId: string;
      role: string;
    }) => RoomApi.grantRole(id, userId, role),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
    },
  });
};
