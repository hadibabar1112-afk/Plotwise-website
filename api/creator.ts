import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";
import { google } from "googleapis";

// ── Sheet config ──────────────────────────────────────────────────────────────
const SPREADSHEET_ID = "11ox-dim8JdSkI_YtWhzEjKNNUqWiUhoobQW_fnrlWFY";
const SHEET_NAME     = "Creators";

const HEADERS = [
  "Timestamp", "Full Name", "Email", "Phone / WhatsApp", "Country",
  "Platform(s)", "Profile Link(s)", "Follower Count", "Niche",
  "UGC Samples", "Content Formats", "Age Range", "Skin / Tone / Hair",
  "Content Style", "Availability", "Turnaround",
];

const FIELDS = [
  "name", "email", "phone", "location", "platform", "profileLink",
  "followerCount", "niche", "ugcSamples", "contentFormats",
  "ageRange", "skinToneHair", "contentStyle", "availability", "turnaround",
];

// ── Email labels ──────────────────────────────────────────────────────────────
const LABELS: Record<string, string> = {
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

// ── Helpers ───────────────────────────────────────────────────────────────────
function fmt(id: string, val: string | string[] | undefined, otherText: Record<string, string>): string {
  if (!val || (Array.isArray(val) && !val.length)) return "";
  if (Array.isArray(val)) {
    return val.map((v) => (v === "Other" && otherText[id] ? `Other: ${otherText[id]}` : v)).join(", ");
  }
  if (val === "Other" && otherText[id]) return `Other: ${otherText[id]}`;
  return String(val);
}

// ── Google Sheets direct write ────────────────────────────────────────────────
async function writeToSheet(
  answers: Record<string, string | string[]>,
  otherText: Record<string, string>
): Promise<void> {
  const keyEnv = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
  if (!keyEnv) throw new Error("GOOGLE_SERVICE_ACCOUNT_KEY not set");

  // Key is stored base64-encoded to avoid JSON escaping issues in env vars
  const credentials = JSON.parse(Buffer.from(keyEnv, "base64").toString("utf-8"));

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  // Ensure the sheet exists and has a header row
  const existing = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: `${SHEET_NAME}!A1:A1`,
  }).catch(() => null);

  const hasHeader = !!(existing?.data?.values?.length);
  if (!hasHeader) {
    await sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A1`,
      valueInputOption: "RAW",
      requestBody: { values: [HEADERS] },
    });
    console.log("Creator sheet: header row written");
  }

  // Build and append data row
  const timestamp = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Karachi",
    year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", hour12: false,
  });

  const row = [timestamp, ...FIELDS.map((f) => fmt(f, answers[f] as string | string[], otherText))];

  await sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: `${SHEET_NAME}!A:P`,
    valueInputOption: "RAW",
    insertDataOption: "INSERT_ROWS",
    requestBody: { values: [row] },
  });

  console.log("Creator sheet: row appended successfully");
}

// ── Email HTML ────────────────────────────────────────────────────────────────
function buildEmailHtml(
  answers: Record<string, string | string[]>,
  otherText: Record<string, string>
): string {
  const creatorName   = (answers.name  as string) || "Unknown Creator";
  const rawReplyEmail = (answers.email as string) || "";
  const replyEmail    = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(rawReplyEmail) ? rawReplyEmail : "";

  const rows = Object.entries(LABELS)
    .map(([id, label]) => {
      const raw = answers[id];
      if (!raw || (Array.isArray(raw) && !raw.length)) return null;
      const value = fmt(id, raw as string | string[], otherText);
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
              <p style="margin:0;font-size:12px;color:#9aafac;text-align:center;">
                Submitted via the PlotWise Creator Form · ${new Date().toLocaleString("en-US", { dateStyle: "long", timeStyle: "short" })}
              </p>
              ${replyEmail ? `<p style="margin:8px 0 0;font-size:12px;color:#9aafac;text-align:center;">Reply to reach ${creatorName}</p>` : ""}
            </div>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// ── Handler ───────────────────────────────────────────────────────────────────
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { answers, otherText } = req.body as {
    answers:   Record<string, string | string[]>;
    otherText: Record<string, string>;
  };
  if (!answers) return res.status(400).json({ error: "Missing answers" });

  const rawEmail    = (answers.email as string) || "";
  const replyEmail  = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(rawEmail) ? rawEmail : undefined;
  const creatorName = (answers.name  as string) || "Unknown Creator";

  // ── 1. Google Sheets (direct API — no Apps Script) ────────────────────────
  try {
    await writeToSheet(answers, otherText ?? {});
  } catch (err) {
    console.error("Creator sheet error (non-fatal):", err);
  }

  // ── 2. Resend email ────────────────────────────────────────────────────────
  if (process.env.RESEND_API_KEY) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const result = await resend.emails.send({
        from:    "PlotWise <noreply@theplotwise.com>",
        to:      "raamish@theplotwise.com",
        replyTo: replyEmail,
        subject: `New Creator Application — ${creatorName}`,
        html:    buildEmailHtml(answers, otherText ?? {}),
      });
      console.log("Resend result:", JSON.stringify(result));
    } catch (err) {
      console.error("Resend error (non-fatal):", err);
    }
  }

  return res.status(200).json({ success: true });
}
