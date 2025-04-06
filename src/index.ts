import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database";
import studentRoutes from "./routes/studentRoutes";
import path from "path";
import { studentModel } from "./models/studentModel";
import methodOverride from "method-override";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(methodOverride("_method"));

app.use(express.static("public"));


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "view"));

app.use("/api", studentRoutes);

app.get("/", async (req, res) => {
  try {
    const students = await studentModel.find();
    res.render("index", { students });
  } catch (err) {
    res.status(500).send("Error fetching students");
  }
});

app.post("/create-student", async (req, res) => {
  try {
    const { name, email, phone, department } = req.body;
    const student = new studentModel({ name, email, phone, department });
    await student.save();
    res.redirect("/");
  } catch (error) {
    res.status(500).send("Error creating student");
  }
});

app.listen(PORT, () => {
  console.log(`Student Management App running at http://localhost:${PORT}`);
});
