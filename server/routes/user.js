import bcrypt from "bcrypt";
import express from "express";
import jwt from "jsonwebtoken";
import db from "../db/connection.js";

// an instance of the express router
const router = express.Router();

const SECRET_KEY = process.env.SECRET_KEY;

router.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      firstName,
      lastName,
      email,
      password: hashedPassword,
    };

    const collection = db.collection("users");
    const result = await collection.insertOne(newUser);

    res.status(201).send({
      message: "User registered successfully",
      userId: result.insertedId,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error registering user");
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const collection = db.collection("users");
    const user = await collection.findOne({ email });

    if (!user) {
      return res.status(404).send("User not found");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send("Invalid credentials");
    }

    const token = jwt.sign({ userId: user._id }, SECRET_KEY, {
      expiresIn: "1h",
    });

    const { password: userPassword, ...userWithoutPassword } = user;

    res
      .status(200)
      .send({ message: "Login successful", token, user: userWithoutPassword });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error logging in user");
  }
});

export default router;
