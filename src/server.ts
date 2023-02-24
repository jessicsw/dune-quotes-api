import express from "express";
import morgan from "morgan";

const app = express();

// Middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/example", (req, res) => {
  console.log("hello");
  res.json({ message: "heeloooo" });
});

export default app;
