import { Types } from "mongoose";

export interface ICategory {
  _id: string;
  name: string;
}

export interface ICircular {
  _id: string;
  fileName: string;
  category: Types.ObjectId | ICategory;
  date: Date;
  description: string;

  cloudinaryUrl: string;
  publicId: string;
  fileSize?: number;
  format?: string;

  uploadedBy: Types.ObjectId;
}
