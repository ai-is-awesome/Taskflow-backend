import mongoose, { mongo } from "mongoose";

const itemSchema = mongoose.Schema({
  title: String,
  // listId: { type: mongoose.Schema.Types.ObjectId, ref: "List" },
  description: String,
  type: String,
  createDate: Date,
  //   Checklists to be added for later
});

const Item = mongoose.model("Item", itemSchema);

export default Item;
