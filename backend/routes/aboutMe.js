import express from "express";
import multer from "multer";
import AboutMe from "../models/AboutMe.js";

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
    const aboutMe = await AboutMe.find();
    res.json(aboutMe);
  } catch (err) {
    console.error("❌ GET error:", err);
    res.status(500).json({ error: "Gagal mengambil about me" });
  }
});

router.post("/", upload.single("image"), async (req, res) => {
  try {
    const newAboutMe = new AboutMe({
      name: req.body.name,
      title: req.body.title,
      description: req.body.description,
      image: req.file ? `/uploads/${req.file.filename}` : undefined,
      uiuxDescription: req.body.uiuxDescription,
      mobileDescription: req.body.mobileDescription,
      internshipDescription: req.body.internshipDescription,
    });

    const savedAboutMe = await newAboutMe.save();
    res.status(201).json(savedAboutMe);
  } catch (err) {
    console.error("❌ POST error:", err);
    res.status(400).json({ error: "Gagal menambahkan about me" });
  }
});

router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const updateData = {
      name: req.body.name,
      title: req.body.title,
      description: req.body.description,
      uiuxDescription: req.body.uiuxDescription,
      mobileDescription: req.body.mobileDescription,
      internshipDescription: req.body.internshipDescription,
    };

    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    const updatedAboutMe = await AboutMe.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedAboutMe) {
      return res.status(404).json({ error: "About Me tidak ditemukan" });
    }

    res.json(updatedAboutMe);
  } catch (err) {
    console.error("❌ PUT error:", err);
    res.status(400).json({ error: "Gagal update about me" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedAboutMe = await AboutMe.findByIdAndDelete(req.params.id);
    if (!deletedAboutMe) {
      return res.status(404).json({ error: "About Me tidak ditemukan" });
    }
    res.json({ message: "About Me berhasil dihapus" });
  } catch (err) {
    console.error("❌ DELETE error:", err);
    res.status(400).json({ error: "Gagal menghapus about me" });
  }
});

export default router;
