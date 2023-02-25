import { Router } from "express";
import booksController from "../controllers/booksController";

const v1BooksRouter = Router();

// Get all books
v1BooksRouter.get("/", booksController.getAllBooks);
v1BooksRouter.get("/:id", booksController.getBookById);

export default v1BooksRouter;
