import AboutMe from "../models/AboutMe.js";

export const getAboutMe = async (req, res) => {
  try {
    const aboutMe = await AboutMe.find();
    res.json(aboutMe);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createAboutMe = async (req, res) => {
  try {
    const newAboutMe = new AboutMe(req.body);
    await newAboutMe.save();
    res.status(201).json(newAboutMe);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateAboutMe = async (req, res) => {
  try {
    const updated = await AboutMe.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteAboutMe = async (req, res) => {
  try {
    await AboutMe.findByIdAndDelete(req.params.id);
    res.json({ message: "About Me deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
