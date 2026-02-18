// models/Session.ts
import mongoose, { Schema, InferSchemaType } from "mongoose";

const SessionSchema = new Schema(
  {
    sessionToken: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    expires: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export type Session = InferSchemaType<typeof SessionSchema>;

export const SessionModel =
  mongoose.models.Session || mongoose.model("Session", SessionSchema);
