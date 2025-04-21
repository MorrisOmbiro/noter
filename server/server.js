import cors from "cors";
import express from "express";
import notes from "./routes/note.js";
import user from "./routes/user.js";

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/note", notes);
app.use("/user", user);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
