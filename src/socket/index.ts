import { Server, Socket } from "socket.io";
import { Server as HttpServer } from "http";
import {
  createRoom,
  leaveRoom,
  getRoom,
  getAllRooms,
} from "../services/roomService";
import { Player } from "../types/room";
import { splitPin } from "../utils/index";
import { STATUS_ROOM } from "../constant";

export const initializeSocket = (httpServer: HttpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: "*", // In production, replace with your frontend URL
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket: Socket) => {
    console.log("Client connected:", socket.id);
    // Tạo room mới
    socket.on(
      "createRoom",
      async ({ player, idQuiz }: { player: Player; idQuiz: string }) => {
        player = {
          ...player,
          socketId: socket.id,
        };
        let roomId: string = splitPin();

        const rooms = getAllRooms();

        if (rooms.find((e) => e.id === roomId.toString())) {
          return socket.emit("createRoomError", {
            message: "Room already exists",
          });
        }

        const room = await createRoom(roomId, player, idQuiz);
        socket.join(room.id);

        socket.emit("createRoomSuccess", room);
        // Thông báo cho tất cả người chơi trong room
        io.to(room.id).emit("roomUpdate", room);
        console.log(`Room created: ${room.id}`);
      }
    );

    socket.on("getRoom", (data: { roomId: string }) => {});

    // Tham gia room
    socket.on("joinRoom", (data: { roomId: string; player: Player }) => {
      const room = getRoom(data.roomId);
      data.player = {
        ...data.player,
        socketId: socket.id,
      };
      if (room) {
        socket.join(data.roomId);
        // Thông báo cho tất cả người chơi trong room
        const existPlayer = room.players.find((pl) => pl.id === data.player.id);
        if (!existPlayer) room.players.push(data.player);
        io.to(data.roomId).emit("roomUpdate", room);

        socket.emit("joinSuccess", room);
        console.log(
          `Player ${data.player.name} joined room: ${data.roomId} - ${room}`
        );
      } else {
        socket.emit("joinError", {
          message: "Wrong pin",
        });
      }
    });

    // Rời room
    socket.on("leaveRoom", (roomId: string, status: string) => {
      const success = leaveRoom(roomId, socket.id, status);

      if (success) {
        socket.leave(roomId);
        const room = getRoom(roomId);
        if (room) {
          io.to(roomId).emit("roomUpdate", room);
        }
        console.log(`Player ${socket.id} left room: ${roomId}`);
      }
    });

    socket.on("getPlayersRoom", (roomId: string) => {
      const room = getRoom(roomId);
      if (room) {
        io.to(roomId).emit("playersRoom", room.players || 0);
      }
    });

    socket.on("play", (roomId: string) => {
      const room = getRoom(roomId);
      if (room) {
        room.status = STATUS_ROOM.PLAYING;
        io.to(roomId).emit("roomUpdate", room);
      }
    });

    // Xử lý ngắt kết nối
    socket.on("disconnect", () => {
      const rooms = getAllRooms();
      rooms.forEach((room) => {
        if (room.host.socketId === socket.id) {
          return;
        }
        if (room.players.some((p) => p.socketId === socket.id)) {
          leaveRoom(room.id, socket.id, "");
          const updatedRoom = getRoom(room.id);
          if (updatedRoom) {
            io.to(room.id).emit("roomUpdate", updatedRoom);
          }
        }
      });

      console.log("Client disconnected:", socket.id);
    });
  });

  return io;
};
