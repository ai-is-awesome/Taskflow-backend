import mongoose from "mongoose";
import dotenv from "dotenv";
import Board from "./models/Board.js";

dotenv.config();

export class MongoDataSource {
  constructor(options) {
    this.dbConnection = this.initializeDBConnection();
    this.token = options.token;
  }
  async initializeDBConnection() {
    const url = process.env.MONGODB_URI;
    console.log("HELLO");
    return mongoose
      .connect(url, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      })
      .then(() => {
        console.log("CONNENCTED!");
      });
  }

  async getBoards() {
    const boards = await Board.find({});
    return boards;
  }
}
