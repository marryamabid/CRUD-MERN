const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userModel = require("./model/User");
const app = express();

mongoose
  .connect(
    "mongodb+srv://marryamabid:blog123@mern.5w5peom.mongodb.net/?retryWrites=true&w=majority&appName=mern"
  )
  .then(() => {
    console.log("Connected to MongoDB");
  });
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  try {
    const user = await userModel.find({});
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});
app.get("/getUser/:id", async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});
app.post("/createUser", async (req, res) => {
  const { name, email, age } = req.body;
  const user = await userModel.create({ name, email, age });
  res.json({ user });
});
app.post("/updateUser/:id", async (req, res) => {
  const { name, email, age } = req.body;
  try {
    const updateUser = await userModel.findByIdAndUpdate(
      req.params.id,
      { name, email, age },
      { new: true }
    );
    res.json({ updateUser });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});
app.delete("/deleteUser/:id", async (req, res) => {
  try {
    const deletedUser = await userModel.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully", user: deletedUser });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});
app.listen(3000);
