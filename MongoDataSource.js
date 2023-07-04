import mongoose, { Mongoose } from "mongoose";
import dotenv from "dotenv";
import Board from "./models/Board.js";
import List from "./models/List.js";
import Item from "./models/Item.js";

dotenv.config();

export class MongoDataSource {
  constructor(options) {
    this.dbConnection = this.initializeDBConnection();
    this.token = options.token;
  }
  async initializeDBConnection() {
    const url = process.env.MONGODB_URI;
    return mongoose
      .connect(url, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      })
      .then(() => {});
  }

  async getBoards() {
    // const boards = await Board.find({}).populate("lists").lean();
    const boards = await Board.find({}).lean();
    return boards;
  }

  async getBoardData(boardId) {
    // const board = await Board.findOne({ _id: boardId }).populate("lists");
    const board = await Board.findOne({ _id: boardId });
    return board;
  }

  async createBoard(payload) {
    const board = new Board(payload);
    const b = await board.save();
    return b;
  }

  async createList(payload) {
    console.log(payload);
    payload.boardId = new mongoose.Types.ObjectId(payload.boardId);
    payload.numberOfItems = 0;
    payload.createDate = new Date();
    const list = new List(payload);
    const l = await list.save();
    await Board.findByIdAndUpdate(payload.boardId, { $push: { lists: l._id } });
    return l;
  }

  async createItem(payload) {
    const listId = payload.listId;
    const title = payload.title;
    const item = new Item({ title, createDate: new Date() }).save();
    await List.findByIdAndUpdate(listId, { $push: { items: item._id } });
    return item;
  }

  async getListsFromIds(idArr) {
    return await List.find({ _id: { $in: idArr } });
  }
}
