import express, { Request, Response } from "express";
import { Book } from "../models/bookModel";

export const booksRoute = express.Router()
// Get All data
booksRoute.get("/", async (req: Request, res: Response) => {
  const books = await Book.find()
  res.send(books)
})
// Post a booksInformation
booksRoute.post("/", async (req: Request, res: Response) => {
  try {
    const bookInfo = await Book.create(req.body)
    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: bookInfo,
    });
  } catch (error) {
    res.status(400).json({
      message: "Validation failed",
      success: false,
      error,
    });
  }
})
// Get Single Book
booksRoute.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const book = await Book.findById(id)
  if (!book) {
    res.status(404).json({
      success: false,
      message: "Book not found",
    });
  }
  res.send(book)
})
// Book Delete
booksRoute.delete("/:bookId", async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params;
    const deleteBook = await Book.findByIdAndDelete(bookId);
    if (!deleteBook) {
      res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }
    res.json({
      success: true,
      message: "Book Deleted successfully",
      data: deleteBook,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      success: false,
      error,
    });
  }
});
// Book Update
// ✅ PATCH book
booksRoute.patch("/:id", async (req: Request, res: Response) => {
  const updated = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});
