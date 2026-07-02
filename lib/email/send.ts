/**
 * Transactional email via Resend's HTTP API (no SDK needed).
 * Sender identity: accounts@casinoexpert.ai - the domain is registered in
 * the Lucky Universe Resend account with DKIM/SPF on Vercel DNS.
 */

const FROM = process.env.EMAIL_FROM ?? "CasinoExpert AI <accounts@casinoexpert.ai>";

async function sendEmail(to: string, subject: string, html: string, text: string): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("RESEND_API_KEY not set - email not sent");
    return false;
  }
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: FROM, to: [to], subject, html, text }),
    });
    if (!res.ok) {
      console.error("Resend send failed:", res.status, await res.text());
      return false;
    }
    return true;
  } catch (err) {
    console.error("Resend send error:", err);
    return false;
  }
}

function layout(firstName: string, bodyHtml: string): string {
  return `<!DOCTYPE html><html><body style="margin:0;padding:0;background:#f4f4f5;font-family:Arial,Helvetica,sans-serif;">
  <div style="max-width:520px;margin:0 auto;padding:32px 16px;">
    <div style="background:#ffffff;border-radius:12px;padding:32px;border:1px solid #e4e4e7;">
      <p style="font-size:20px;font-weight:bold;margin:0 0 24px;color:#111827;">Casino<span style="color:#2563eb;">Expert</span> AI</p>
      <p style="font-size:15px;color:#111827;margin:0 0 16px;">Hi ${firstName},</p>
      ${bodyHtml}
      <p style="font-size:12px;color:#9ca3af;margin:24px 0 0;">If you didn't request this, you can safely ignore this email.</p>
    </div>
    <p style="font-size:11px;color:#9ca3af;text-align:center;margin:16px 0 0;">CasinoExpert AI - Your factual, objective casino guide</p>
  </div>
</body></html>`;
}

export async function sendVerificationEmail(to: string, firstName: string, url: string): Promise<boolean> {
  const html = layout(
    firstName,
    `<p style="font-size:15px;color:#374151;margin:0 0 24px;">Confirm your email to activate your CasinoExpert account and unlock unlimited safety checks.</p>
     <p style="margin:0 0 24px;"><a href="${url}" style="display:inline-block;background:#2563eb;color:#ffffff;text-decoration:none;font-weight:bold;padding:12px 24px;border-radius:8px;font-size:15px;">Verify my email</a></p>
     <p style="font-size:13px;color:#6b7280;margin:0 0 8px;">This link expires in 24 hours. If the button doesn't work, copy and paste this URL:</p>
     <p style="font-size:12px;color:#6b7280;word-break:break-all;margin:0;">${url}</p>`
  );
  const text = `Hi ${firstName},\n\nConfirm your email to activate your CasinoExpert account:\n${url}\n\nThis link expires in 24 hours. If you didn't request this, ignore this email.`;
  return sendEmail(to, "Verify your email - CasinoExpert AI", html, text);
}

export async function sendLoginEmail(to: string, firstName: string, url: string): Promise<boolean> {
  const html = layout(
    firstName,
    `<p style="font-size:15px;color:#374151;margin:0 0 24px;">Click below to sign in to CasinoExpert. No password needed.</p>
     <p style="margin:0 0 24px;"><a href="${url}" style="display:inline-block;background:#2563eb;color:#ffffff;text-decoration:none;font-weight:bold;padding:12px 24px;border-radius:8px;font-size:15px;">Sign me in</a></p>
     <p style="font-size:13px;color:#6b7280;margin:0 0 8px;">This link expires in 15 minutes. If the button doesn't work, copy and paste this URL:</p>
     <p style="font-size:12px;color:#6b7280;word-break:break-all;margin:0;">${url}</p>`
  );
  const text = `Hi ${firstName},\n\nSign in to CasinoExpert:\n${url}\n\nThis link expires in 15 minutes. If you didn't request this, ignore this email.`;
  return sendEmail(to, "Your sign-in link - CasinoExpert AI", html, text);
}
