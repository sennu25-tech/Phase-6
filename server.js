import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import Feedback from "./models/Feedback.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.post("/feedback", async (req, res) => {
    const feedback = new Feedback(req.body);
    await feedback.save();
    res.json(feedback);
});

app.get("/feedback", async (req, res) => {
    const feedback = await Feedback.find();
    res.json(feedback);
});


app.put("/feedback/:id", async (req, res) => {
    const feedback = await Feedback.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.json(feedback);
});


app.delete("/feedback/:id", async (req, res) => {
    await Feedback.findByIdAndDelete(req.params.id);
    res.json({ message: "Feedback deleted successfully!" });
});



mongoose.connect(process.env.MONGO_URI)
  .then(async() => {
    console.log("MongoDB connected successfully!");

    //     const searchTerm = "";

    // const collection = await mongoose.connection.useDb("School").collection("Students");

    //    const query = searchTerm 
    //     ? { name: { $regex: searchTerm, $options: "i" } } 
    //     : {};

    //     const students= await collection
    //     .find(query)
    //     .collation({ locale: "en", strength: 2 }) 
    //     .sort({ name: 1 })
    //     .toArray();
    // console.log(students);

    // const students = await mongoose.connection.useDb("School").collection("Students").find({"class":10});
    // console.log(students);
    

    app.listen(PORT, () => {
      console.log(`Feedback API: http://localhost:${PORT}/feedback`);
      console.log("Frontend URL: http://localhost:5500/index.html");
      console.log("All Feedback: http://localhost:5500/feedback.html");
    });
  })
  .catch((error) => {
    console.log("MongoDB connection error:", error.message);
  });




