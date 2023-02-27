import express, { Request, Response, NextFunction } from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import v1RandomRouter from "./v1/routes/randomRoute";
import v1QuotesRouter from "./v1/routes/quotesRoute";
import v1BooksRouter from "./v1/routes/booksRoute";

class AppError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);

    Object.setPrototypeOf(this, new.target.prototype);
    this.name = Error.name;
    this.statusCode = statusCode;
    Error.captureStackTrace(this);
  }
}

const port = process.env.PORT || 3000;
const app = express();
const apiLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});
dotenv.config();

/* Middleware */
app.use(apiLimiter);
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", (req, res) => {
  throw new Error();
});
app.use("/api/v1/random", v1RandomRouter);
app.use("/api/v1/quotes", v1QuotesRouter);
app.use("/api/v1/books", v1BooksRouter);

/* Error handling middleware functions */
const errorLogger = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(`error ${error.message}`);
  next(error);
};

const errorResponder = (
  error: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.header("Content-Type", "application/json");

  const status = error.statusCode || 400;
  res.status(status).send(error.message);
};

const invalidPathHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(400).send("Invalid path");
};

app.use(errorLogger);
app.use(errorResponder);
app.use(invalidPathHandler);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

export default app;
