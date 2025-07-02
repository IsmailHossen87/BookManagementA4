import { Schema, model, Types } from "mongoose";
import { Book } from "./bookModel";

const borrowSchema = new Schema({
  book: { type: Types.ObjectId, ref: "Book", required: true },
  quantity: { type: Number, required: true },
  dueDate: { type: Date, required: true },
}, {
   versionKey:false,
  timestamps:true
});

export const Borrow = model("Borrow", borrowSchema);
