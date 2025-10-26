import express from "express";
import Skill from "../models/Skill.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const skills = await Skill.find();
    res.json(skills);
  } catch (err) {
    console.error("❌ GET error:", err);
    res.status(500).json({ error: "Gagal mengambil skills" });
  }
});

router.post("/", async (req, res) => {
  try {
    const newSkill = new Skill({
      name: req.body.name,
      level: req.body.level,
      icon: req.body.icon,
      category: req.body.category,
    });

    const savedSkill = await newSkill.save();
    res.status(201).json(savedSkill);
  } catch (err) {
    console.error("❌ POST error:", err);
    res.status(400).json({ error: "Gagal menambahkan skill" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updateData = {
      name: req.body.name,
      level: req.body.level,
      icon: req.body.icon,
      category: req.body.category,
    };

    const updatedSkill = await Skill.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedSkill) {
      return res.status(404).json({ error: "Skill tidak ditemukan" });
    }

    res.json(updatedSkill);
  } catch (err) {
    console.error("❌ PUT error:", err);
    res.status(400).json({ error: "Gagal update skill" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedSkill = await Skill.findByIdAndDelete(req.params.id);
    if (!deletedSkill) {
      return res.status(404).json({ error: "Skill tidak ditemukan" });
    }
    res.json({ message: "Skill berhasil dihapus" });
  } catch (err) {
    console.error("❌ DELETE error:", err);
    res.status(400).json({ error: "Gagal menghapus skill" });
  }
});

export default router;
