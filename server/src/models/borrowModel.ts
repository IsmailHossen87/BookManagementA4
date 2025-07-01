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
borrowSchema.pre("save", async function (next) {
  const borrow = this;
  try {
    const book = await Book.findById(borrow.book);
    if (!book) {
      throw new Error("Book not found");
    }

    // কপি পর্যাপ্ত আছে কিনা চেক
    if (book.copies < borrow.quantity) {
      throw new Error(`Not enough copies available. Only ${book.copies} copies left`);
    }
    // কপি আপডেট করি
    book.copies -= borrow.quantity;
    book.available = book.copies > 0;

    await book.save();
    next();
  } catch (error: any) {
    next(error);
  }
});

export const Borrow = model("Borrow", borrowSchema);
