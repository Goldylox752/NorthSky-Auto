import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY;

if (!apiKey) {
  throw new Error("RESEND_API_KEY is not configured.");
}

export const resend = new Resend(apiKey);

export const EMAIL_FROM =
  process.env.EMAIL_FROM || "NorthSky Auto <noreply@northskyauto.com>";

export const EMAIL_REPLY_TO =
  process.env.EMAIL_REPLY_TO || "support@northskyauto.com";
