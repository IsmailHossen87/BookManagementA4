import express, { Application, Request, Response } from "express";
import { booksRoute } from "./controler/bookControler";
import { borrowRoute } from "./controler/borrowControler";
import cors from "cors";

const app: Application = express();

// ✅ CORS middleware
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());

// ✅ Route declarations
app.use("/api/books", booksRoute);
app.use("/api/borrow", borrowRoute);

// ✅ Test endpoint
app.get("/", async (req: Request, res: Response) => {
  res.send("Redux project Running");
});

export default app;
