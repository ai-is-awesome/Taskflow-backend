import mongoose, { mongo } from "mongoose";

const itemSchema = mongoose.Schema({});

const Item = mongoose.model("Item", itemSchema);

export default Item;
