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
exports.routeOfBorrow = void 0;
const express_1 = __importDefault(require("express"));
const borrowModel_1 = require("../models/borrowModel");
const bookModel_1 = require("../models/bookModel");
exports.routeOfBorrow = express_1.default.Router();
// ✅ POST: Borrow Book
exports.routeOfBorrow.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { book, quantity, dueDate } = req.body;
    try {
        const bookDoc = yield bookModel_1.Book.findById(book);
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
        const borrow = new borrowModel_1.Borrow({ book, quantity, dueDate });
        yield borrow.save();
        bookDoc.copies -= quantity;
        yield bookDoc.save();
        res.status(201).json({
            message: "📚 Book borrowed successfully",
            data: borrow,
        });
    }
    catch (error) {
        res.status(400).json({
            message: "❌ Borrow failed",
            error: error.message,
        });
    }
}));
// ✅ GET: Borrow Summary
exports.routeOfBorrow.get("/summary", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const summary = yield borrowModel_1.Borrow.aggregate([
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
    }
    catch (error) {
        res.status(500).json({
            message: "❌ Failed to get summary",
            error: error.message,
        });
    }
}));
