function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function formatSubmittedAt(date = new Date()) {
  return date.toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  });
}

function fieldRow(label, value, { link = false } = {}) {
  const safeValue = escapeHtml(value);
  const valueHtml = link
    ? `<a href="mailto:${safeValue}" style="color:#5eead4;text-decoration:none;font-weight:600;">${safeValue}</a>`
    : `<span style="color:#f8fafc;font-weight:600;">${safeValue}</span>`;

  return `
    <tr>
      <td style="padding:0 0 14px 0;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;background-color:#111318;border:1px solid rgba(255,255,255,0.08);border-radius:14px;">
          <tr>
            <td style="padding:14px 16px;">
              <p style="margin:0 0 6px 0;font-family:Inter,Arial,sans-serif;font-size:10px;line-height:1.4;letter-spacing:0.22em;text-transform:uppercase;color:rgba(153,246,228,0.72);">${label}</p>
              <p style="margin:0;font-family:Inter,Arial,sans-serif;font-size:15px;line-height:1.5;">${valueHtml}</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  `;
}

export function buildConsultationEmail({ name, email, company, budget, dream, brandName = "M.Zeeshan Faisal" }) {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeCompany = escapeHtml(company);
  const safeBudget = escapeHtml(budget);
  const safeDream = escapeHtml(dream).replaceAll("\n", "<br />");
  const submittedAt = formatSubmittedAt();

  const text = [
    "NEW CONSULTATION INQUIRY",
    brandName,
    "",
    `Submitted: ${submittedAt}`,
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    `Company: ${company}`,
    `Budget: ${budget}`,
    "",
    "Project details:",
    dream,
    "",
    `Reply directly to ${email}`,
  ].join("\n");

  const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>New consultation inquiry</title>
  </head>
  <body style="margin:0;padding:0;background-color:#07080d;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
      New consultation inquiry from ${safeName}
    </div>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;background-color:#07080d;">
      <tr>
        <td align="center" style="padding:32px 16px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;max-width:620px;">
            <tr>
              <td style="padding:0 0 18px 0;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
                  <tr>
                    <td width="52" valign="middle" style="padding:0 14px 0 0;">
                      <div style="width:48px;height:48px;border-radius:14px;border:1px solid rgba(45,212,191,0.35);background:linear-gradient(145deg,rgba(45,212,191,0.16),rgba(45,212,191,0.04));text-align:center;line-height:48px;font-family:Georgia,'Times New Roman',serif;font-size:18px;font-weight:700;color:#ffffff;">
                        MZ
                      </div>
                    </td>
                    <td valign="middle">
                      <p style="margin:0 0 4px 0;font-family:Inter,Arial,sans-serif;font-size:10px;line-height:1.4;letter-spacing:0.28em;text-transform:uppercase;color:rgba(255,255,255,0.42);">Portfolio consultation</p>
                      <p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:24px;line-height:1.2;color:#ffffff;">${escapeHtml(brandName)}</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td style="padding:0 0 18px 0;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;background:linear-gradient(135deg,rgba(45,212,191,0.14),rgba(99,102,241,0.08));border:1px solid rgba(45,212,191,0.22);border-radius:18px;">
                  <tr>
                    <td style="padding:22px 24px;">
                      <p style="margin:0 0 8px 0;font-family:Inter,Arial,sans-serif;font-size:11px;line-height:1.4;letter-spacing:0.24em;text-transform:uppercase;color:rgba(153,246,228,0.82);">New inquiry received</p>
                      <h1 style="margin:0 0 10px 0;font-family:Georgia,'Times New Roman',serif;font-size:28px;line-height:1.15;color:#ffffff;">Consultation request</h1>
                      <p style="margin:0;font-family:Inter,Arial,sans-serif;font-size:14px;line-height:1.6;color:rgba(255,255,255,0.68);">
                        A visitor submitted the contact form on your portfolio website.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td style="padding:0 0 18px 0;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;background-color:#0b0c12;border:1px solid rgba(255,255,255,0.1);border-radius:18px;">
                  <tr>
                    <td style="padding:24px;">
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
                        ${fieldRow("Client name", safeName)}
                        ${fieldRow("Email address", safeEmail, { link: true })}
                        ${fieldRow("Company", safeCompany)}
                        ${fieldRow("Project budget", safeBudget)}
                      </table>

                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;margin-top:6px;background-color:#111318;border:1px solid rgba(255,255,255,0.08);border-radius:14px;">
                        <tr>
                          <td style="padding:16px 18px;">
                            <p style="margin:0 0 10px 0;font-family:Inter,Arial,sans-serif;font-size:10px;line-height:1.4;letter-spacing:0.22em;text-transform:uppercase;color:rgba(153,246,228,0.72);">Project details</p>
                            <p style="margin:0;font-family:Inter,Arial,sans-serif;font-size:15px;line-height:1.7;color:rgba(255,255,255,0.82);">${safeDream}</p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td style="padding:0 0 18px 0;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
                  <tr>
                    <td align="center">
                      <a href="mailto:${safeEmail}?subject=${encodeURIComponent(`Re: Consultation inquiry from ${name}`)}"
                         style="display:inline-block;padding:14px 28px;border-radius:999px;background:linear-gradient(135deg,#14b8a6,#0891b2);color:#041014;font-family:Inter,Arial,sans-serif;font-size:13px;font-weight:700;line-height:1;text-decoration:none;letter-spacing:0.08em;text-transform:uppercase;">
                        Reply to ${safeName}
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td style="padding:8px 4px 0 4px;border-top:1px solid rgba(255,255,255,0.08);">
                <p style="margin:0 0 6px 0;font-family:Inter,Arial,sans-serif;font-size:11px;line-height:1.5;color:rgba(255,255,255,0.38);text-align:center;">
                  Submitted on ${escapeHtml(submittedAt)}
                </p>
                <p style="margin:0;font-family:Inter,Arial,sans-serif;font-size:11px;line-height:1.5;color:rgba(255,255,255,0.38);text-align:center;">
                  This message was sent from your portfolio consultation form.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  return { text, html };
}

export { escapeHtml };
