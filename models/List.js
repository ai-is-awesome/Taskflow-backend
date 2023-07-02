import mongoose, { mongo } from "mongoose";

const listSchema = mongoose.Schema({
  listName: String,
  items: [String],
  createDate: Date,
  boardId: { type: mongoose.Schema.Types.ObjectId, ref: "Board" },
  numberOfItems: Number,
});

const List = mongoose.model("List", listSchema);

export default List;
