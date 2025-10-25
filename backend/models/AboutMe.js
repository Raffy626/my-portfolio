import mongoose from "mongoose";

const aboutMeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: false },
    uiuxDescription: { type: String, required: true },
    mobileDescription: { type: String, required: true },
    internshipDescription: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("AboutMe", aboutMeSchema);
