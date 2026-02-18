// models/VerificationToken.ts
import mongoose, { Schema, InferSchemaType } from "mongoose";

const VerificationTokenSchema = new Schema({
  identifier: {
    type: String, // email
    required: true,
    index: true,
  },

  token: {
    type: String,
    required: true,
    unique: true,
  },

  expires: {
    type: Date,
    required: true,
  },
});

VerificationTokenSchema.index({ identifier: 1, token: 1 }, { unique: true });

export type VerificationToken = InferSchemaType<typeof VerificationTokenSchema>;

export const VerificationTokenModel =
  mongoose.models.VerificationToken ||
  mongoose.model("VerificationToken", VerificationTokenSchema);
