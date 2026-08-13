import express from "express";
import protectRoute from "../middleware/auth.middleware.js";
import Book from "../models/Book.js";
import cloudinary from "../utils/cloudinary.js";
const router = express.Router();

// GET ALL BOOKS
router.get("/", async (req, res) => {
  try {
    let { limit, page } = req.query;
    limit = parseInt(limit) || 10;
    page = parseInt(page) || 1;
    const offset = (page - 1) * limit;

    const books = await Book.find()
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit)
      .populate("user", "username profileImage")
      .select("-password");
    const total = await Book.countDocuments();

    res.status(200).json({ books, total, limit, page });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET USER'S BOOKS
router.get("/user", protectRoute, async (req, res) => {
  try {
    const userId = req.user.userId;
    const books = await Book.find({ user: userId }).sort({ createdAt: -1 });
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// FIND BOOK BY ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid book id" });
    }
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// CREATE BOOK
router.post("/", protectRoute, async (req, res) => {
  try {

    const { title, description, rating, coverImage } = req.body;

    if (!coverImage || !title || !description || !rating) {
      return res.status(400).json({ message: "Please provide all fields" });
    }

    // upload the image to cloudinary
    const result = await cloudinary.uploader.upload(req.body.coverImage, {
      folder: "book-covers",
    });    
    const imageUrl = result.secure_url;

    // save to the database
    const newBook = new Book({
      title,
      description,
      rating,
      coverImage: imageUrl,
      user: req.user.userId,
    });

    await newBook.save();

    res.status(201).json(newBook);
  } catch (error) {
    console.log("Error creating book", error);
    res.status(500).json({ message: error.message });
  }
});

// DELETE ROUTE
router.delete("/:id", protectRoute, async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    if (book.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    if (book.coverImage && book.coverImage.includes("cloudinary")) {
      try {
        const publicId = book.coverImage.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(publicId);
      } catch (error) {
        console.error("Error deleting cover image:", error);
      }
    }

    await Book.deleteOne({ _id: id });

    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
