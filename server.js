// ── PlotWise Express Server ────────────────────────────────────────────────────
// Replaces Vercel serverless functions for GoDaddy hosting.
// Serves the built Vite frontend + handles /api/contact and /api/creator.

import express from "express";
import { fileURLToPath } from "url";
import path from "path";
import { Resend } from "resend";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(express.json());

// ── Serve built frontend ───────────────────────────────────────────────────────
app.use(express.static(path.join(__dirname, "dist")));


// ════════════════════════════════════════════════════════════════════════════════
// CONTACT API  (/api/contact)
// ════════════════════════════════════════════════════════════════════════════════

const CONTACT_LABELS = {
  name:             "Full Name",
  email:            "Email Address",
  brandName:        "Brand Name",
  websiteUrl:       "Website URL",
  handles:          "Instagram & TikTok Handles",
  category:         "Primary Product Category",
  adSpend:          "Monthly Ad Spend Range",
  platforms:        "Platforms Running Paid Ads",
  creativeHandling: "How They Handle Creative",
  challenge:        "Biggest Creative Challenge",
  scheduledDate:    "Preferred Call Date",
  scheduledTime:    "Preferred Call Time (US Eastern)",
};

function formatContactAnswer(id, value, otherText) {
  if (!value || (Array.isArray(value) && value.length === 0)) return "—";
  if (Array.isArray(value)) {
    return value
      .map((v) => (v === "Other" && otherText[id] ? `Other: ${otherText[id]}` : v))
      .join(", ");
  }
  if (value === "Other" && otherText[id]) return `Other: ${otherText[id]}`;
  return value;
}

function buildContactEmailHtml(answers, otherText) {
  const brandName      = answers.brandName || "Unknown Brand";
  const submitterName  = answers.name || "";
  const rawReplyEmail  = answers.email || "";
  const replyEmail     = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(rawReplyEmail) ? rawReplyEmail : "";

  const rows = Object.entries(CONTACT_LABELS)
    .map(([id, label]) => {
      const raw = answers[id];
      if (!raw || (Array.isArray(raw) && raw.length === 0)) return null;
      const value = formatContactAnswer(id, raw, otherText);
      return `
        <tr>
          <td style="padding:12px 16px;border-bottom:1px solid #e8efed;color:#6b7b78;font-size:12px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;width:38%;vertical-align:top;white-space:nowrap;">${label}</td>
          <td style="padding:12px 16px;border-bottom:1px solid #e8efed;color:#131818;font-size:14px;vertical-align:top;">${value.replace(/\n/g, "<br>")}</td>
        </tr>`;
    })
    .filter(Boolean)
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/><title>New PlotWise Inquiry</title></head>
<body style="margin:0;padding:0;background:#f0f5f4;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f5f4;padding:40px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
        <tr>
          <td style="background:linear-gradient(135deg,#0F4F4A 0%,#207770 55%,#2C8A82 100%);border-radius:16px 16px 0 0;padding:36px 40px 32px;">
            <div style="font-family:Georgia,serif;font-size:26px;color:#fff;margin-bottom:4px;">PlotWise</div>
            <div style="font-size:13px;color:rgba(255,255,255,0.65);letter-spacing:0.05em;text-transform:uppercase;">New Brand Inquiry</div>
            <div style="margin-top:20px;padding-top:20px;border-top:1px solid rgba(255,255,255,0.15);">
              <div style="font-size:22px;font-weight:600;color:#fff;">${brandName}</div>
              ${submitterName ? `<div style="font-size:14px;color:rgba(255,255,255,0.7);margin-top:4px;">Submitted by ${submitterName}${replyEmail ? ` · ${replyEmail}` : ""}</div>` : ""}
            </div>
          </td>
        </tr>
        <tr>
          <td style="background:#fff;border-radius:0 0 16px 16px;overflow:hidden;">
            <table width="100%" cellpadding="0" cellspacing="0">${rows}</table>
            <div style="padding:24px 40px;background:#f8fbfa;border-top:1px solid #e8efed;">
              <p style="margin:0;font-size:12px;color:#9aafac;text-align:center;">Submitted via the PlotWise contact form · ${new Date().toLocaleString("en-US", { dateStyle: "long", timeStyle: "short" })}</p>
              ${replyEmail ? `<p style="margin:8px 0 0;font-size:12px;color:#9aafac;text-align:center;">Reply directly to reach ${submitterName || "the sender"}</p>` : ""}
            </div>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

const CONTACT_SHEET_WEBHOOK =
  process.env.CONTACT_SHEET_WEBHOOK ||
  "https://script.google.com/macros/s/AKfycbxhPgn3hiLvYeaIPKRZv7bkXH-9W44-5RdzQ5b04zD7Nc4-n7X2scZuqZUvM1cDjemblA/exec";

app.post("/api/contact", async (req, res) => {
  const { answers, otherText } = req.body;
  if (!answers) return res.status(400).json({ error: "Missing answers" });

  const brandName  = answers.brandName || "Unknown Brand";
  const rawEmail   = answers.email || "";
  const replyEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(rawEmail) ? rawEmail : undefined;

  // 1. Google Sheets
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

  // 2. Resend email
  if (process.env.RESEND_API_KEY) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const result = await resend.emails.send({
        from:    "PlotWise <noreply@theplotwise.com>",
        to:      "raamish@theplotwise.com",
        replyTo: replyEmail,
        subject: `New PlotWise Inquiry — ${brandName}`,
        html:    buildContactEmailHtml(answers, otherText ?? {}),
      });
      console.log("Resend result:", JSON.stringify(result));
    } catch (err) {
      console.error("Resend error (non-fatal):", err);
    }
  }

  return res.status(200).json({ success: true });
});


// ════════════════════════════════════════════════════════════════════════════════
// CREATOR API  (/api/creator)
// ════════════════════════════════════════════════════════════════════════════════

const CREATOR_LABELS = {
  name:           "Full Name",
  email:          "Email Address",
  phone:          "Phone / WhatsApp",
  location:       "Country",
  platform:       "Platform(s)",
  profileLink:    "Profile Link(s)",
  followerCount:  "Follower Count",
  niche:          "Niche",
  ugcSamples:     "UGC Sample Links",
  contentFormats: "Content Formats",
  ageRange:       "Age Range",
  skinToneHair:   "Skin, Tone & Hair",
  contentStyle:   "Content Style",
  availability:   "Availability (campaigns/month)",
  turnaround:     "Turnaround Time",
};

function fmtCreator(id, val, otherText) {
  if (!val || (Array.isArray(val) && !val.length)) return "";
  if (Array.isArray(val)) {
    return val.map((v) => (v === "Other" && otherText[id] ? `Other: ${otherText[id]}` : v)).join(", ");
  }
  if (val === "Other" && otherText[id]) return `Other: ${otherText[id]}`;
  return String(val);
}

function buildCreatorEmailHtml(answers, otherText) {
  const creatorName   = answers.name  || "Unknown Creator";
  const rawReplyEmail = answers.email || "";
  const replyEmail    = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(rawReplyEmail) ? rawReplyEmail : "";

  const rows = Object.entries(CREATOR_LABELS)
    .map(([id, label]) => {
      const raw = answers[id];
      if (!raw || (Array.isArray(raw) && !raw.length)) return null;
      const value = fmtCreator(id, raw, otherText);
      if (!value) return null;
      return `
        <tr>
          <td style="padding:12px 16px;border-bottom:1px solid #e8efed;color:#6b7b78;font-size:12px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;width:38%;vertical-align:top;white-space:nowrap;">${label}</td>
          <td style="padding:12px 16px;border-bottom:1px solid #e8efed;color:#131818;font-size:14px;vertical-align:top;">${value.replace(/\n/g, "<br>")}</td>
        </tr>`;
    })
    .filter(Boolean)
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/></head>
<body style="margin:0;padding:0;background:#f0f5f4;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f5f4;padding:40px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
        <tr>
          <td style="background:linear-gradient(135deg,#0F4F4A 0%,#207770 55%,#2C8A82 100%);border-radius:16px 16px 0 0;padding:36px 40px 32px;">
            <div style="font-family:Georgia,serif;font-size:26px;color:#fff;margin-bottom:4px;">PlotWise</div>
            <div style="font-size:13px;color:rgba(255,255,255,0.65);letter-spacing:0.05em;text-transform:uppercase;">New Creator Application</div>
            <div style="margin-top:20px;padding-top:20px;border-top:1px solid rgba(255,255,255,0.15);">
              <div style="font-size:22px;font-weight:600;color:#fff;">${creatorName}</div>
              ${replyEmail ? `<div style="font-size:14px;color:rgba(255,255,255,0.7);margin-top:4px;">${replyEmail}</div>` : ""}
            </div>
          </td>
        </tr>
        <tr>
          <td style="background:#fff;border-radius:0 0 16px 16px;overflow:hidden;">
            <table width="100%" cellpadding="0" cellspacing="0">${rows}</table>
            <div style="padding:24px 40px;background:#f8fbfa;border-top:1px solid #e8efed;">
              <p style="margin:0;font-size:12px;color:#9aafac;text-align:center;">Submitted via the PlotWise Creator Form · ${new Date().toLocaleString("en-US", { dateStyle: "long", timeStyle: "short" })}</p>
              ${replyEmail ? `<p style="margin:8px 0 0;font-size:12px;color:#9aafac;text-align:center;">Reply to reach ${creatorName}</p>` : ""}
            </div>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

app.post("/api/creator", async (req, res) => {
  const { answers, otherText } = req.body;
  if (!answers) return res.status(400).json({ error: "Missing answers" });

  const rawEmail    = answers.email || "";
  const replyEmail  = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(rawEmail) ? rawEmail : undefined;
  const creatorName = answers.name || "Unknown Creator";

  // 1. Google Sheets
  const CREATOR_SHEET_WEBHOOK = process.env.CREATOR_SHEET_WEBHOOK || "";
  if (CREATOR_SHEET_WEBHOOK) {
    try {
      const sheetRes = await fetch(CREATOR_SHEET_WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers, otherText: otherText ?? {} }),
      });
      const text = await sheetRes.text();
      console.log("Creator sheet response:", sheetRes.status, text.slice(0, 200));
    } catch (err) {
      console.error("Creator sheet error (non-fatal):", err);
    }
  }

  // 2. Resend email
  if (process.env.RESEND_API_KEY) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const result = await resend.emails.send({
        from:    "PlotWise <noreply@theplotwise.com>",
        to:      "raamish@theplotwise.com",
        replyTo: replyEmail,
        subject: `New Creator Application — ${creatorName}`,
        html:    buildCreatorEmailHtml(answers, otherText ?? {}),
      });
      console.log("Resend result:", JSON.stringify(result));
    } catch (err) {
      console.error("Resend error (non-fatal):", err);
    }
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
