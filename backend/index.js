const express = require("express");
const cors = require("cors");
const app = express();
import multer from "multer";
import express from "express";
import Portfolio from "../models/Portfolio.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

router.post("/portfolios", upload.single("image"), async (req, res) => {
  try {
    const portfolio = new Portfolio({
      title: req.body.title,
      description: req.body.description,
      link: req.body.link,
      image: req.file ? `/uploads/${req.file.filename}` : "",
    });
    await portfolio.save();
    res.json(portfolio);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend jalan di http://localhost:5000");
});

app.listen(5000, () => {
  console.log("🚀 Server backend jalan di http://localhost:5000");
});