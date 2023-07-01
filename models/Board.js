import mongoose, { mongo } from "mongoose";

const boardSchema = mongoose.Schema({
  name: String,
});

const Board = mongoose.model("Board", boardSchema);

export default Board;
