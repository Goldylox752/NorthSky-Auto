```js
import {
  resend,
  EMAIL_FROM,
  EMAIL_REPLY_TO,
} from "@/lib/resend";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function sendDealerWelcomeEmail({
  email,
  dealerName = "",
}) {
  if (!email) {
    throw new Error("Dealer email is required.");
  }

  const safeDealerName = escapeHtml(dealerName.trim());

  const greeting = safeDealerName
    ? `Welcome, ${safeDealerName}!`
    : "Welcome to NorthSky Auto!";

  const loginUrl = `${siteUrl}/dealer/login`;

  const { data, error } = await resend.emails.send({
    from: EMAIL_FROM,
    to: [email],
    replyTo: EMAIL_REPLY_TO,

    subject: "Welcome to NorthSky Auto",

    html: `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>Welcome to NorthSky Auto</title>
        </head>

        <body
          style="
            margin:0;
            padding:0;
            background:#f1f5f9;
            font-family:Arial,Helvetica,sans-serif;
            color:#0f172a;
          "
        >
          <table
            width="100%"
            cellpadding="0"
            cellspacing="0"
            border="0"
            style="background:#f1f5f9;padding:40px 16px;"
          >
            <tr>
              <td align="center">

                <table
                  width="100%"
                  cellpadding="0"
                  cellspacing="0"
                  border="0"
                  style="
                    max-width:600px;
                    background:#ffffff;
                    border-radius:14px;
                    overflow:hidden;
                    box-shadow:0 8px 30px rgba(15,23,42,0.08);
                  "
                >

                  <!-- Header -->
                  <tr>
                    <td
                      align="center"
                      style="
                        background:#0f172a;
                        padding:32px 24px;
                      "
                    >
                      <div
                        style="
                          font-size:28px;
                          font-weight:700;
                          color:#ffffff;
                          letter-spacing:-0.5px;
                        "
                      >
                        NorthSky Auto
                      </div>

                      <div
                        style="
                          margin-top:8px;
                          font-size:13px;
                          color:#94a3b8;
                        "
                      >
                        Dealer Network
                      </div>
                    </td>
                  </tr>

                  <!-- Content -->
                  <tr>
                    <td style="padding:40px 36px;">

                      <h1
                        style="
                          margin:0 0 20px;
                          font-size:26px;
                          line-height:1.3;
                          color:#0f172a;
                        "
                      >
                        ${greeting}
                      </h1>

                      <p
                        style="
                          margin:0 0 16px;
                          font-size:16px;
                          line-height:1.7;
                          color:#475569;
                        "
                      >
                        Your NorthSky Auto dealer account has been
                        successfully created.
                      </p>

                      <p
                        style="
                          margin:0 0 24px;
                          font-size:16px;
                          line-height:1.7;
                          color:#475569;
                        "
                      >
                        You can now sign in to your dealer account,
                        access your dashboard, and manage your NorthSky
                        Auto activities.
                      </p>

                      <!-- Button -->
                      <table
                        width="100%"
                        cellpadding="0"
                        cellspacing="0"
                        border="0"
                        style="margin:30px 0;"
                      >
                        <tr>
                          <td align="center">

                            <a
                              href="${loginUrl}"
                              style="
                                display:inline-block;
                                background:#2563eb;
                                color:#ffffff;
                                padding:14px 28px;
                                border-radius:8px;
                                font-size:16px;
                                font-weight:700;
                                text-decoration:none;
                              "
                            >
                              Access Dealer Dashboard
                            </a>

                          </td>
                        </tr>
                      </table>

                      <p
                        style="
                          margin:0;
                          font-size:14px;
                          line-height:1.6;
                          color:#64748b;
                        "
                      >
                        If the button above does not work, copy and paste
                        the following address into your browser:
                      </p>

                      <p
                        style="
                          margin:8px 0 24px;
                          font-size:13px;
                          line-height:1.6;
                          word-break:break-all;
                        "
                      >
                        <a
                          href="${loginUrl}"
                          style="color:#2563eb;text-decoration:none;"
                        >
                          ${loginUrl}
                        </a>
                      </p>

                      <div
                        style="
                          border-top:1px solid #e2e8f0;
                          padding-top:24px;
                        "
                      >
                        <p
                          style="
                            margin:0;
                            font-size:13px;
                            line-height:1.6;
                            color:#64748b;
                          "
                        >
                          If you did not create this account, please
                          contact NorthSky Auto support immediately.
                        </p>
                      </div>

                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td
                      align="center"
                      style="
                        background:#f8fafc;
                        padding:24px;
                        border-top:1px solid #e2e8f0;
                      "
                    >
                      <p
                        style="
                          margin:0;
                          font-size:12px;
                          line-height:1.6;
                          color:#94a3b8;
                        "
                      >
                        © ${new Date().getFullYear()} NorthSky Auto.
                        All rights reserved.
                      </p>

                      <p
                        style="
                          margin:6px 0 0;
                          font-size:12px;
                          color:#94a3b8;
                        "
                      >
                        This is an automated message. Please do not
                        reply directly to this email.
                      </p>
                    </td>
                  </tr>

                </table>

              </td>
            </tr>
          </table>
        </body>
      </html>
    `,

    text: `
${greeting}

Your NorthSky Auto dealer account has been successfully created.

You can now sign in to your dealer account, access your dashboard, and manage your NorthSky Auto activities.

Dealer Login:
${loginUrl}

If you did not create this account, please contact NorthSky Auto support immediately.

© ${new Date().getFullYear()} NorthSky Auto.
All rights reserved.
    `.trim(),
  });

  if (error) {
    console.error("NorthSky Auto dealer welcome email failed:", error);
    throw new Error(error.message || "Unable to send dealer welcome email.");
  }

  return data;
}
```
