// models/User.ts
import mongoose, { Schema, InferSchemaType } from "mongoose";

const UserSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },

    emailVerified: {
      type: Date,
      default: null,
    },

    image: {
      type: String, // profile image URL
    },

    // Optional but recommended
    role: {
      type: String,
      default: "user",
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
  },
);

export type User = InferSchemaType<typeof UserSchema>;

export const UserModel =
  mongoose.models.User || mongoose.model("User", UserSchema);
