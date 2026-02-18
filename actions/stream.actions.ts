"use server";

import { auth } from "@/lib/auth";
import { StreamClient } from "@stream-io/node-sdk";
import { headers } from "next/headers";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const apiSecret = process.env.STREAM_SECRET_KEY;

export const tokenProvider = async () => {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });

  if (!session?.user) throw new Error("User not logged in");
  if (!apiKey) throw new Error("No API Key");
  if (!apiSecret) throw new Error("No SECRET Key");

  const client = new StreamClient(apiKey, apiSecret);

  const exp = Math.round(new Date().getTime() / 1000) + 60 * 60;
  const issued = Math.round(new Date().getTime() / 1000) - 60;

  const token = client.createToken(session?.user?.id, exp, issued);
  console.log("token", token);

  return token;
};
