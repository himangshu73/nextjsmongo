import { Document, Types } from "mongoose";

export interface ICircular extends Document {
  fileName: string;
  category: "GAD" | "SME" | "CIB";
  date: Date;
  description: string;

  cloudinaryUrl: string;
  publicId: string;
  fileSize?: number;
  format?: string;

  uploadedBy: Types.ObjectId;
}
