import { Router } from "express";
import randomController from "../controllers/randomController";

const v1RandomRouter = Router();

v1RandomRouter.get("/", randomController.getRandomQuote);

export default v1RandomRouter;
