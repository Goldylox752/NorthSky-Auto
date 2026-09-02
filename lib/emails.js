import {
  resend,
  EMAIL_FROM,
  EMAIL_REPLY_TO,
} from "@/lib/resend";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "http://localhost:3000";

export async function sendDealerWelcomeEmail({
  email,
  dealerName,
}) {
  const { data, error } = await resend.emails.send({
    from: EMAIL_FROM,
    to: [email],
    replyTo: EMAIL_REPLY_TO,
    subject: "Welcome to NorthSky Auto",
    html: `
      <!DOCTYPE html>
      <html>
        <body style="margin:0;padding:0;background:#f1f5f9;font-family:Arial,sans-serif;">
          <div style="max-width:600px;margin:40px auto;background:#ffffff;border-radius:12px;overflow:hidden;">
            
            <div style="background:#0f172a;padding:30px;text-align:center;">
              <h1 style="margin:0;color:#ffffff;">
                NorthSky Auto
              </h1>
            </div>

            <div style="padding:40px;">
              <h2 style="color:#0f172a;">
                Welcome${dealerName ? `, ${dealerName}` : ""}!
              </h2>

              <p style="color:#475569;line-height:1.6;">
                Your NorthSky Auto dealer account has been created successfully.
              </p>

              <p style="color:#475569;line-height:1.6;">
                You can now access your dealer dashboard and manage your account.
              </p>

              <div style="margin:30px 0;text-align:center;">
                <a
                  href="${siteUrl}/dealer/login"
                  style="
                    display:inline-block;
                    background:#2563eb;
                    color:#ffffff;
                    padding:14px 24px;
                    border-radius:8px;
                    text-decoration:none;
                    font-weight:bold;
                  "
                >
                  Dealer Login
                </a>
              </div>

              <p style="color:#64748b;font-size:13px;line-height:1.6;">
                If you did not create this account, please contact NorthSky Auto support.
              </p>
            </div>

            <div style="background:#f8fafc;padding:20px;text-align:center;">
              <p style="margin:0;color:#94a3b8;font-size:12px;">
                © ${new Date().getFullYear()} NorthSky Auto
              </p>
            </div>

          </div>
        </body>
      </html>
    `,
    text: `
Welcome${dealerName ? `, ${dealerName}` : ""}!

Your NorthSky Auto dealer account has been created successfully.

Dealer Login:
${siteUrl}/dealer/login

If you did not create this account, please contact NorthSky Auto support.

© ${new Date().getFullYear()} NorthSky Auto
    `,
  });

  if (error) {
    console.error("Dealer welcome email failed:", error);
    throw new Error(error.message);
  }

  return data;
}
