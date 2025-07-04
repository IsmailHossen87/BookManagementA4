import express, { Request, Response } from "express";
import { Borrow } from "../models/borrowModel";
import { Book } from "../models/bookModel";

export const routeOfBorrow = express.Router();

// ✅ POST: Borrow Book
routeOfBorrow.post("/", async (req: Request, res: Response) => {
  const { book, quantity, dueDate } = req.body;
  try {
    const bookDoc = await Book.findById(book);

    if (!bookDoc) {
      res.status(404).json({ message: "Book not found" });
      return;
    }

    if (quantity > bookDoc.copies) {
      res.status(400).json({
        message: `Only ${bookDoc.copies} copies available.`,
      });
      return;
    }

    const borrow = new Borrow({ book, quantity, dueDate });
    await borrow.save();

    bookDoc.copies -= quantity;
    await bookDoc.save();

    res.status(201).json({
      message: "📚 Book borrowed successfully",
      data: borrow,
    });
  } catch (error: any) {
    res.status(400).json({
      message: "❌ Borrow failed",
      error: error.message,
    });
  }
});

// ✅ GET: Borrow Summary
routeOfBorrow.get("/summary", async (req: Request, res: Response) => {
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
        },
      },
    ]);

    res.status(200).json(summary);
  } catch (error: any) {
    res.status(500).json({
      message: "❌ Failed to get summary",
      error: error.message,
    });
  }
});
