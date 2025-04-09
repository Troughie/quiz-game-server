import { Room, Player } from "../types/room";
import client from "../db/init.redis";

// Private storage
const rooms = new Map<string, Room>();

// Public functions
export const createRoom = async (
  roomId: string,
  player: Player,
  idQuiz: string
): Promise<Room> => {
  const oldRoomId = await client.get(player.id);

  let room: Room;
  if (oldRoomId) {
    const roomExist = getRoom(oldRoomId);

    console.log(roomExist);

    if (roomExist) {
      room = roomExist;
    } else {
      room = {
        id: oldRoomId,
        host: player,
        players: [],
        status: "waiting",
        createdAt: new Date(),
      };
    }
    rooms.set(oldRoomId, room);
    await client.set(player.id, oldRoomId);
    await client.set(oldRoomId, idQuiz);
  } else {
    room = {
      id: roomId,
      host: player,
      players: [],
      status: "waiting",
      createdAt: new Date(),
    };
    rooms.set(roomId, room);
    await client.set(player.id, roomId);
    await client.set(roomId, idQuiz);
  }
  return room;
};

export const getRoom = (roomId: string): Room | undefined => {
  return rooms.get(roomId);
};

export const leaveRoom = (roomId: string, playerId: string): boolean => {
  const room = rooms.get(roomId);

  if (!room) {
    return false;
  }

  room.players = room.players.filter((p) => p.socketId !== playerId);

  // // Nếu không còn người chơi nào, xóa room
  // if (room.players.length === 0) {
  //   rooms.delete(roomId);
  // }
  // // Nếu host rời đi, chọn host mới
  // else if (room.host && room.host.id === playerId) {
  //   room.host = room.players[0];
  // }

  return true;
};

export const getAllRooms = (): Room[] => {
  return Array.from(rooms.values());
};
