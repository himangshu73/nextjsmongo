import { Schema, model, InferSchemaType } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

type UserType = InferSchemaType<typeof userSchema>;

const User = model<UserType>("User", userSchema);

export default User;
