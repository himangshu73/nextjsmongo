import mongoose, { Document, model, models, Schema } from "mongoose";

export interface IPost extends Document {
  content: string;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
}

const PostSchema = new Schema<IPost>(
  {
    content: {
      type: String,
      required: true,
    },

    authorId: {
      type: String,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default models.Post || model<IPost>("Post", PostSchema);
