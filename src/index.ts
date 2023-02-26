import express from "express";
import morgan from "morgan";
import v1RandomRouter from "./v1/routes/randomRoute";
import v1QuotesRouter from "./v1/routes/quotesRoute";
import v1BooksRouter from "./v1/routes/booksRoute";
import * as dotenv from "dotenv";

dotenv.config();
const port = process.env.SERVER_PORT || 3000;
const app = express();

// Middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/random", v1RandomRouter);
app.use("/api/v1/quotes", v1QuotesRouter);
app.use("/api/v1/books", v1BooksRouter);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

export default app;
