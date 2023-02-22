import app from "./server";
import * as dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT || 5432;

app.get("/", (req, res) => {
  res.json({ message: "hello" });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
