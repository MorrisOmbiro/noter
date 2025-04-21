import express from "express";
import { ObjectId } from "mongodb";
import db from "../db/connection.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authenticate, async (req, res) => {
  try {
    const { category } = req.query;
    const collection = db.collection("notes");
    const qCatg = category ? { category } : {};
    const notes = await collection
      .find({ ...qCatg, userId: req.userId })
      .toArray();
    res.status(200).send(notes);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching notes");
  }
});

router.get("/:id", authenticate, async (req, res) => {
  let collection = db.collection("notes");
  let query = { _id: new ObjectId(req.params.id), userId: req.userId };
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

router.post("/", authenticate, async (req, res) => {
  try {
    const newNote = {
      title: req.body.title,
      content: req.body.content,
      userId: req.userId,
      favorite: req.body.favorite,
      tags: req.body.tags,
      pinned: req.body.pinned,
      category: req.body.category,
      dateCreated: new Date(),
      dateUpdated: new Date(),
    };

    const collection = db.collection("notes");
    const result = await collection.insertOne(newNote);

    res.status(201).send({
      message: "Note created successfully",
      noteId: result.insertedId,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating note");
  }
});

router.patch("/:id", authenticate, async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id), userId: req.userId };
    const updates = {
      $set: {
        title: req.body.title,
        content: req.body.content,
        favorite: req.body.favorite,
        tags: req.body.tags,
        pinned: req.body.pinned,
        category: req.body.category,
        dateUpdated: new Date(),
      },
    };

    const collection = db.collection("notes");
    const result = await collection.updateOne(query, updates);

    if (result.matchedCount === 0) {
      return res.status(404).send("Note not found or access denied");
    }

    res.status(200).send({ message: "Note updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating note");
  }
});

router.delete("/:id", authenticate, async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id), userId: req.userId };

    const collection = db.collection("notes");
    const result = await collection.deleteOne(query);

    if (result.deletedCount === 0) {
      return res.status(404).send("Note not found or access denied");
    }

    res.status(200).send({ message: "Note deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting note");
  }
});

export default router;
