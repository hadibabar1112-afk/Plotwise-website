import type { VercelRequest, VercelResponse } from "@vercel/node";

const CREATOR_WEBHOOK_URL = "https://webhook.theplotwise.com/webhooks/creator-form";
const CREATOR_WEBHOOK_SECRET = "23f39576bbfdd35e43f615bd03775b856d018d13fe2a6882078a3635bb5c0e80";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { answers, otherText } = req.body as {
    answers: Record<string, string | string[]>;
    otherText: Record<string, string>;
  };
  if (!answers) return res.status(400).json({ error: "Missing answers" });

  try {
    const controller = new AbortController();
    const t = setTimeout(() => controller.abort(), 15000);
    const webhookRes = await fetch(CREATOR_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-webhook-secret": CREATOR_WEBHOOK_SECRET,
      },
      body: JSON.stringify({ answers, otherText: otherText ?? {} }),
      signal: controller.signal,
    });
    clearTimeout(t);
    const data = await webhookRes.json().catch(() => ({}));
    console.log("Creator webhook result:", webhookRes.status, JSON.stringify(data));
  } catch (err) {
    console.error("Creator webhook error (non-fatal):", err);
  }

  return res.status(200).json({ success: true });
}
