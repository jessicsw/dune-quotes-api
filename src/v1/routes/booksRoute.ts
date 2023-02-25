import { Router } from "express";
import booksController from "../controllers/booksController";

const v1BooksRouter = Router();

// Get all books
v1BooksRouter.get("/", booksController.getAllBooks);

export default v1BooksRouter;
