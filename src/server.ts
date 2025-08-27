/* eslint-disable no-console */
import { Server } from "http";
import mongoose from "mongoose";
import { app } from "./app";

let server: Server;

const startServer = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://admin_um:Jayed778@cluster0.lugl172.mongodb.net/tour-management-backend?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("Connected to db");

    server = app.listen(5000, () => {
      console.log("Server is listening port 5000");
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();

process.on("unhandledRejection", (err) => {
  console.log("Unhandle Rejecection Error... Server shutting down", err);

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on("uncaughtException", (err) => {
  console.log("Unhandle Exception Error... Server shutting down", err);

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on("SIGTERM", () => {
  console.log("Sigterm signal received ... Server shutting down");

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on("SIGINT", () => {
  console.log("SIGINT signal received ... Server shutting down");

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

// Promise.reject(new Error("I forgot to catch this error"));

throw new Error("I forgot to handle this local error");
