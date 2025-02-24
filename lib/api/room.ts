import { Http } from "./http";
import { ICreateRoom, IRoom } from "@/types/room.d";

export default class RoomApi {
  static async createRoom(room: ICreateRoom) {
    const response = await Http.post<IRoom, ICreateRoom>("/room", room);

    return response?.data;
  }
  static async getUserRooms() {
    const response = await Http.get<IRoom[]>("/room");

    return response?.data;
  }

  static async getRoomById(id: string) {
    const response = await Http.get<IRoom>(`/room/${id}`);

    return response?.data;
  }

  static async updateRoomById(id: string, room: ICreateRoom) {
    const response = await Http.put<IRoom, ICreateRoom>(`/room/${id}`, room);

    return response?.data;
  }

  static async deleteRoomById(id: string) {
    const response = await Http.delete<IRoom>(`/room/${id}`);

    return response?.data;
  }

  static async joinRoom(id: string) {
    const response = await Http.get(`/room/join/${id}`);

    return response?.data;
  }

  static async createMagicLink(id: string) {
    const response = await Http.post<{ magicLink: string }, null>(
      `/room/magic-link/${id}`,
      null
    );

    return response?.data;
  }

  static async leaveRoom(id: string) {
    const response = await Http.post<IRoom, null>(`/room/leave/${id}`, null);

    return response?.data;
  }

  static async getRoomMembers(id: string) {
    const response = await Http.get<IRoom>(`/room/${id}/user`);

    return response?.data;
  }

  static async grantRole(id: string, userId: string, role: string) {
    const response = await Http.post<IRoom, { role: string }>(
      `/room/${id}/grant/${userId}`,
      { role }
    );

    return response?.data;
  }
}
