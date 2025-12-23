import { Types } from "mongoose";

export interface ICircular {
  _id: string;
  fileName: string;
  category: Types.ObjectId;
  date: Date;
  description: string;

  cloudinaryUrl: string;
  publicId: string;
  fileSize?: number;
  format?: string;

  uploadedBy: Types.ObjectId;
}
