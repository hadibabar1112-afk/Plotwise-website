// ── PlotWise Express Server ────────────────────────────────────────────────────
// Replaces Vercel serverless functions for GoDaddy hosting.
// Serves the built Vite frontend + handles /api/contact and /api/creator.

import express from "express";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(express.json());

// ── Serve built frontend ───────────────────────────────────────────────────────
app.use(express.static(path.join(__dirname, "dist")));

// ════════════════════════════════════════════════════════════════════════════════
// CONTACT API  (/api/contact)
// ════════════════════════════════════════════════════════════════════════════════

const CONTACT_SHEET_WEBHOOK =
  process.env.CONTACT_SHEET_WEBHOOK ||
  "https://script.google.com/macros/s/AKfycbxhPgn3hiLvYeaIPKRZv7bkXH-9W44-5RdzQ5b04zD7Nc4-n7X2scZuqZUvM1cDjemblA/exec";

app.post("/api/contact", async (req, res) => {
  const { answers, otherText } = req.body;
  if (!answers) return res.status(400).json({ error: "Missing answers" });

  if (CONTACT_SHEET_WEBHOOK) {
    try {
      const sheetRes = await fetch(CONTACT_SHEET_WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers, otherText: otherText ?? {} }),
      });
      const sheetData = await sheetRes.json();
      console.log("Contact sheet result:", JSON.stringify(sheetData));
    } catch (err) {
      console.error("Contact sheet error (non-fatal):", err);
    }
  }

  return res.status(200).json({ success: true });
});

// ════════════════════════════════════════════════════════════════════════════════
// CREATOR API  (/api/creator)
// ════════════════════════════════════════════════════════════════════════════════

const CREATOR_WEBHOOK_URL = "https://webhook.theplotwise.com/webhooks/creator-form";
const CREATOR_WEBHOOK_SECRET = "23f39576bbfdd35e43f615bd03775b856d018d13fe2a6882078a3635bb5c0e80";

app.post("/api/creator", async (req, res) => {
  const { answers, otherText } = req.body;
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
});

// ── SPA catch-all (must be last) ───────────────────────────────────────────────
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`PlotWise server running on port ${PORT}`);
});
