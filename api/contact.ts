import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Map step IDs to human-readable labels
const LABELS: Record<string, string> = {
  name:              "Full Name",
  email:             "Email Address",
  brandName:         "Brand Name",
  websiteUrl:        "Website URL",
  handles:           "Instagram & TikTok Handles",
  category:          "Primary Product Category",
  adSpend:           "Monthly Ad Spend Range",
  platforms:         "Platforms Running Paid Ads",
  creativeHandling:  "How They Handle Creative",
  challenge:         "Biggest Creative Challenge",
};

function formatAnswer(
  id: string,
  value: string | string[],
  otherText: Record<string, string>
): string {
  if (!value || (Array.isArray(value) && value.length === 0)) return "—";

  if (Array.isArray(value)) {
    return value
      .map((v) => (v === "Other" && otherText[id] ? `Other: ${otherText[id]}` : v))
      .join(", ");
  }

  if (value === "Other" && otherText[id]) return `Other: ${otherText[id]}`;
  return value;
}

function buildEmailHtml(
  answers: Record<string, string | string[]>,
  otherText: Record<string, string>
): string {
  const brandName = (answers.brandName as string) || "Unknown Brand";
  const submitterName = (answers.name as string) || "";
  const replyEmail = (answers.email as string) || "";

  const rows = Object.entries(LABELS)
    .map(([id, label]) => {
      const raw = answers[id];
      if (!raw || (Array.isArray(raw) && raw.length === 0)) return null;
      const value = formatAnswer(id, raw, otherText);
      return `
        <tr>
          <td style="padding:12px 16px;border-bottom:1px solid #e8efed;color:#6b7b78;font-size:12px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;width:38%;vertical-align:top;white-space:nowrap;">
            ${label}
          </td>
          <td style="padding:12px 16px;border-bottom:1px solid #e8efed;color:#131818;font-size:14px;vertical-align:top;">
            ${value.replace(/\n/g, "<br>")}
          </td>
        </tr>`;
    })
    .filter(Boolean)
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New PlotWise Inquiry</title>
</head>
<body style="margin:0;padding:0;background:#f0f5f4;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f5f4;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#0F4F4A 0%,#207770 55%,#2C8A82 100%);border-radius:16px 16px 0 0;padding:36px 40px 32px;">
              <div style="font-family:Georgia,serif;font-size:26px;font-weight:400;color:#ffffff;letter-spacing:-0.02em;margin-bottom:4px;">
                PlotWise
              </div>
              <div style="font-size:13px;color:rgba(255,255,255,0.65);letter-spacing:0.05em;text-transform:uppercase;">
                New Brand Inquiry
              </div>
              <div style="margin-top:20px;padding-top:20px;border-top:1px solid rgba(255,255,255,0.15);">
                <div style="font-size:22px;font-weight:600;color:#ffffff;letter-spacing:-0.01em;">
                  ${brandName}
                </div>
                ${submitterName ? `<div style="font-size:14px;color:rgba(255,255,255,0.7);margin-top:4px;">Submitted by ${submitterName}${replyEmail ? ` · ${replyEmail}` : ""}</div>` : ""}
              </div>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background:#ffffff;border-radius:0 0 16px 16px;overflow:hidden;">
              <table width="100%" cellpadding="0" cellspacing="0">
                ${rows}
              </table>

              <!-- Footer -->
              <div style="padding:24px 40px;background:#f8fbfa;border-top:1px solid #e8efed;">
                <p style="margin:0;font-size:12px;color:#9aafac;text-align:center;">
                  Submitted via the PlotWise contact form · ${new Date().toLocaleString("en-US", { dateStyle: "long", timeStyle: "short" })}
                </p>
                ${replyEmail ? `<p style="margin:8px 0 0;font-size:12px;color:#9aafac;text-align:center;">Reply directly to this email to reach ${submitterName || "the sender"}</p>` : ""}
              </div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  let body: { answers: Record<string, string | string[]>; otherText: Record<string, string> };
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { answers, otherText } = body;
  const brandName = (answers.brandName as string) || "Unknown Brand";
  const replyEmail = answers.email as string | undefined;

  try {
    await resend.emails.send({
      from: "PlotWise Contact Form <onboarding@resend.dev>",
      to: "hadibabar2001@gmail.com",
      reply_to: replyEmail || undefined,
      subject: `New PlotWise Inquiry — ${brandName}`,
      html: buildEmailHtml(answers, otherText),
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Resend error:", err);
    return new Response(JSON.stringify({ error: "Failed to send email" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
