import express, { Request, Response } from "express";
import { Borrow } from "../models/borrowModel";
import { Book } from "../models/bookModel";

export const borrowRoute = express.Router();


borrowRoute.post("/", async (req: Request, res: Response) => {
  const { book, quantity, dueDate } = req.body;
  try {
    const bookDoc = await Book.findById(book);
    if (!bookDoc) {
      return res.status(404).json({ message: "Book not found" });
    }

    if (quantity > bookDoc.copies) {
      return res.status(400).json({
        message: `Only ${bookDoc.copies} copies available.`,
      });
    }

    const borrow = new Borrow({ book, quantity, dueDate });
    await borrow.save();

    bookDoc.copies -= quantity;
    await bookDoc.save();

    return res.status(201).json({
      message: "📚 Book borrowed successfully",
      data: borrow,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: "❌ Borrow failed",
      error: error.message,
    });
  }
});

// Get Borrow
borrowRoute.get("/summary", async (req: Request, res: Response) => {
  try {
    const summary = await Borrow.aggregate([
      {
        $group: {
          _id: "$book",
          totalQuantity: { $sum: "$quantity" },
        },
      },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "bookInfo",
        },
      },
      { $unwind: "$bookInfo" },
      {
        $project: {
          title: "$bookInfo.title",
          isbn: "$bookInfo.isbn",
          totalQuantity: 1,
          dueDate: 1
        },
      },
    ]);

    res.send(summary)
  } catch (error) {
    res.status(500).json({
      message: "❌ Failed to get summary",
    });
  }
});
