import { Types } from "mongoose";

export interface ICircular {
  _id: string;
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
