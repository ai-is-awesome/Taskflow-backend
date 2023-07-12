import mongoose, { mongo } from "mongoose";

const listSchema = mongoose.Schema({
  name: String,
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: "Item" }],
  createDate: Date,
  numberOfItems: Number,
});
const List = mongoose.model("List", listSchema);

export default List;
