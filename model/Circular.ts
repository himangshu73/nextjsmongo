import { ICircular } from "@/types/circular";
import mongoose, { model, models, Schema } from "mongoose";

const CircularSchema = new Schema<ICircular>(
  {
    fileName: { type: String, required: true, trim: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Category",
      index: true,
    },
    date: { type: Date, required: true, index: true },
    description: { type: String, required: true, trim: true },

    cloudinaryUrl: { type: String, required: true },
    publicId: { type: String, required: true },
    fileSize: { type: Number },
    format: { type: String },

    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

CircularSchema.index({ category: 1, date: -1 });

export default models.Circular || model<ICircular>("Circular", CircularSchema);
