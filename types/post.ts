import mongoose from "mongoose";

export interface UserType {
  _id: string;
  name: string;
  email: string;
}

export interface PostTypes {
  _id: string;
  content: string;
  authorId: UserType;
  createdAt: string;
  updatedAt: string;
}
