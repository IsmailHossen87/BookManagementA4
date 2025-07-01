import express, { Request, Response } from "express";
import { Borrow } from "../models/borrowModel";

export const borrowRoute = express.Router();


borrowRoute.post("/", async (req: Request, res: Response) => {
  const { bookId, quantity, dueDate } = req.body;
  try {
    const borrow = new Borrow({
      book: bookId,
      quantity,
      dueDate,
    });
    await borrow.save();

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
        },
      },
    ]);

    res.status(200).json({
      message: "📊 Borrow summary fetched",
      data: summary,
    });
  } catch (error) {
    res.status(500).json({
      message: "❌ Failed to get summary",
    });
  }
});
