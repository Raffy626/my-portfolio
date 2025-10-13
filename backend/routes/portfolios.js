import express from "express";
import multer from "multer";
import Portfolio from "../models/Portfolio.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

router.get("/", async (req, res) => {
  try {
    const portfolios = await Portfolio.find();
    res.json(portfolios);
  } catch (err) {
    console.error("❌ GET error:", err);
    res.status(500).json({ error: "Gagal mengambil portfolio" });
  }
});

router.post("/", upload.single("image"), async (req, res) => {
  try {
    const newPortfolio = new Portfolio({
      title: req.body.title,
      description: req.body.description,
      link: req.body.link,
      image: req.file ? `/uploads/${req.file.filename}` : "", // simpan path file
    });

    const savedPortfolio = await newPortfolio.save();
    res.status(201).json(savedPortfolio);
  } catch (err) {
    console.error("❌ POST error:", err);
    res.status(400).json({ error: "Gagal menambahkan portfolio" });
  }
});

router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const updateData = {
      title: req.body.title,
      description: req.body.description,
      link: req.body.link,
    };

    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    const updatedPortfolio = await Portfolio.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedPortfolio) {
      return res.status(404).json({ error: "Portfolio tidak ditemukan" });
    }

    res.json(updatedPortfolio);
  } catch (err) {
    console.error("❌ PUT error:", err);
    res.status(400).json({ error: "Gagal update portfolio" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedPortfolio = await Portfolio.findByIdAndDelete(req.params.id);
    if (!deletedPortfolio) {
      return res.status(404).json({ error: "Portfolio tidak ditemukan" });
    }
    res.json({ message: "Portfolio berhasil dihapus" });
  } catch (err) {
    console.error("❌ DELETE error:", err);
    res.status(400).json({ error: "Gagal menghapus portfolio" });
  }
});

export default router;