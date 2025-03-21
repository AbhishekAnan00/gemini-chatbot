export const socketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("message", (msg) => {
      console.log("Received message:", msg);
      io.emit("message", {
        sender: "ai",
        text: "This is a reply from server.",
      });
    });
    
    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};
