import { Router } from "express";
import quotesController from "../controllers/quotesController";

const v1QuotesRouter = Router();

v1QuotesRouter.get("/", quotesController.getAllQuotes);
v1QuotesRouter.get("/:id", quotesController.getQuoteById);

export default v1QuotesRouter;
