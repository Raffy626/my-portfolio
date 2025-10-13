import Portfolio from "../models/Portfolio.js";

// GET all
export const getPortfolios = async (req, res) => {
  try {
    const portfolios = await Portfolio.find();
    res.json(portfolios);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE
export const createPortfolio = async (req, res) => {
  try {
    const newPortfolio = new Portfolio(req.body);
    await newPortfolio.save();
    res.status(201).json(newPortfolio);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// UPDATE
export const updatePortfolio = async (req, res) => {
  try {
    const updated = await Portfolio.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE
export const deletePortfolio = async (req, res) => {
  try {
    await Portfolio.findByIdAndDelete(req.params.id);
    res.json({ message: "Portfolio deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
