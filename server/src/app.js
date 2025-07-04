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
const express_1 = __importDefault(require("express"));
const bookControler_1 = require("./controler/bookControler");
const cors_1 = __importDefault(require("cors"));
const controlerOfBorrow_1 = require("./controler/controlerOfBorrow");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: ["http://localhost:5173", "https://books-management-library.vercel.app"],
    credentials: false,
}));
app.use(express_1.default.json());
app.use("/api/books", bookControler_1.booksRoute);
// app.use("/api/borrow", Router);
app.use("/api/borrow", controlerOfBorrow_1.routeOfBorrow);
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("Redux project Running");
}));
exports.default = app;
