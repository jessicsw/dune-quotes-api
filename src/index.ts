import express, { Response } from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import rateLimit, { RateLimitRequestHandler } from "express-rate-limit";
import v1RandomRouter from "./v1/routes/randomRoute";
import v1QuotesRouter from "./v1/routes/quotesRoute";
import v1BooksRouter from "./v1/routes/booksRoute";

const port = process.env.PORT || 3000;
const app = express();
const apiLimiter: RateLimitRequestHandler = rateLimit({
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
app.use(helmet());
app.use(compression());
app.use(cors());

/* Routes */
app.use("/v1/random", v1RandomRouter);
app.use("/v1/quotes", v1QuotesRouter);
app.use("/v1/books", v1BooksRouter);
app.use("/", (_, res) =>
  res.send({ errors: { message: "No matching route for request." } })
);

/* Error handling middleware functions */

const invalidPathHandler = (res: Response) => {
  res.status(400).send("Invalid path");
};

app.use(invalidPathHandler);

app.listen(port, () => {
  console.log(`Server running on PORT ${port}`);
});

export default app;
