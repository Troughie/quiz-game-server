import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createServer } from "http";
import "express-async-errors";
import routes from "./routes";
import { initializeSocket } from "./socket";
import { errorHandler } from "./Error/handle";

// Load environment variables
dotenv.config();

const app = express();
const httpServer = createServer(app);
const port = process.env.PORT || 3000;

// Initialize Socket.IO
const io = initializeSocket(httpServer);

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/v1/", routes);

//middleware handle error
app.use(errorHandler);

// Start server
httpServer.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
