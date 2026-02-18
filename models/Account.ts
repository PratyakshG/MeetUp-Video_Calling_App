// models/Account.ts
import mongoose, { Schema, InferSchemaType } from "mongoose";

const AccountSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    // "credentials" | "oauth"
    type: {
      type: String,
      required: true,
    },

    // "credentials" | "google" | "github"
    provider: {
      type: String,
      required: true,
    },

    providerAccountId: {
      type: String,
      required: true,
    },

    // Only used for credentials provider
    password: {
      type: String, // bcrypt hash
    },

    // OAuth tokens (optional, store only if you need them)
    access_token: String,
    refresh_token: String,
    expires_at: Number,
    token_type: String,
    scope: String,
    id_token: String,
  },
  {
    timestamps: true,
  },
);

AccountSchema.index({ provider: 1, providerAccountId: 1 }, { unique: true });

export type Account = InferSchemaType<typeof AccountSchema>;

export const AccountModel =
  mongoose.models.Account || mongoose.model("Account", AccountSchema);
