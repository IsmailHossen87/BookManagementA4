"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.booksRoute = void 0;
const express_1 = __importDefault(require("express"));
const bookModel_1 = require("../models/bookModel");
exports.booksRoute = express_1.default.Router();
// Get All data
exports.booksRoute.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const books = yield bookModel_1.Book.find();
    res.send(books);
}));
// Post a booksInformation
exports.booksRoute.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookInfo = yield bookModel_1.Book.create(req.body);
        res.status(201).json({
            success: true,
            message: "Book created successfully",
            data: bookInfo,
        });
    }
    catch (error) {
        res.status(400).json({
            message: "Validation failed",
            success: false,
            error,
        });
    }
}));
// Get Single Book
exports.booksRoute.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const book = yield bookModel_1.Book.findById(id);
    if (!book) {
        res.status(404).json({
            success: false,
            message: "Book not found",
        });
    }
    res.send(book);
}));
// Book Delete
exports.booksRoute.delete("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.params;
        const deleteBook = yield bookModel_1.Book.findByIdAndDelete(bookId);
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
    }
    catch (error) {
        res.status(500).json({
            message: "Server error",
            success: false,
            error,
        });
    }
}));
// Book Update
// ✅ PATCH book
exports.booksRoute.patch("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updated = yield bookModel_1.Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
}));
