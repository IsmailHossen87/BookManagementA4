
import express, { Application, Request, Response } from "express";
import { booksRoute } from "./controler/bookControler";
import cors from "cors";
import { routeOfBorrow } from "./controler/controlerOfBorrow";

const app: Application = express();

app.use(cors({
  origin: ["http://localhost:5173", "https://books-management-library.vercel.app"],
  credentials: false,
}));

app.use(express.json());

app.use("/api/books", booksRoute);
// app.use("/api/borrow", Router);
app.use("/api/borrow",routeOfBorrow)

app.get("/", async (req: Request, res: Response) => {
  res.send("Redux project Running");
});

export default app;

