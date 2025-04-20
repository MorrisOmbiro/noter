import cors from "cors";
import express from "express";
import notes from "./routes/note.js";

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/note", notes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
