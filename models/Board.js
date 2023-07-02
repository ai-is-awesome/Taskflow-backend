import mongoose, { mongo } from "mongoose";

const boardSchema = mongoose.Schema({
  name: String,
  lists: [{ type: mongoose.Schema.Types.ObjectId, ref: "List" }],
  dateCreated: Date,
  members: [String],
  // Status is public or private
  status: String,
});

const Board = mongoose.model("Board", boardSchema);

export default Board;
