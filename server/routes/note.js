import express from "express";

// This will help us connect to the database
import db from "../db/connection.js";

// This helps convert the id from string to ObjectId for the _id.
import { ObjectId } from "mongodb";

// router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /note.
const router = express.Router();

// This section will help you get a list of all the notes.
router.get("/", async (req, res) => {
  const { category } = req.query;
  let collection = await db.collection("notes");
  const query = category ? { category } : {};
  let results = await collection.find(query).toArray();
  res.send(results).status(200);
});

// This section will help you get a single note by id
router.get("/:id", async (req, res) => {
  let collection = await db.collection("notes");
  let query = { _id: new ObjectId(req.params.id) };
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// This section will help you create a new note.
router.post("/", async (req, res) => {
  try {
    let newDocument = {
      title: req.body.title,
      content: req.body.content,
      favorite: req.body.favorite,
      tags: req.body.tags,
      pinned: req.body.pinned,
      category: req.body.category,
      dateCreated: new Date(), // Automatically set the creation date
      dateUpdated: new Date(), // Initially set the same as creation date
    };
    let collection = await db.collection("notes");
    let result = await collection.insertOne(newDocument);
    res.send(result).status(201); // Use 201 for resource creation
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding note");
  }
});

// This section will help you update a note by id.
router.patch("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const updates = {
      $set: {
        title: req.body.title,
        favorite: req.body.favorite,
        tags: req.body.tags,
        pinned: req.body.pinned,
        category: req.body.category,
        content: req.body.content,
        dateUpdated: new Date(), // Update the dateUpdated field
      },
    };

    let collection = await db.collection("notes");
    let result = await collection.updateOne(query, updates);
    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating note");
  }
});

// This section will help you delete a note
router.delete("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };

    const collection = db.collection("notes");
    let result = await collection.deleteOne(query);

    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting note");
  }
});

export default router;
