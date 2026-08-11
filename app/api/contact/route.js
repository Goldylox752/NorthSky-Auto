import { NextResponse } from "next/server";
import { Resend } from "resend";
export const dynamic = "force-dynamic";
const resend = new Resend(process.env.RESEND_API_KEY);
function clean(value) {
  if (value === null || value === undefined) {
    return "";
  }
  return String(value).trim();
}
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
const allowedTopics = new Set([
  "dealer-account",
  "dealer-membership",
  "vehicle-opportunity",
  "sell-vehicle",
  "partnership",
  "technical-support",
  "general",
  "other",
]);
const topicLabels = {
  "dealer-account": "Dealer Account",
  "dealer-membership": "Dealer Membership",
  "vehicle-opportunity": "Vehicle Opportunity",
  "sell-vehicle": "Selling a Vehicle",
  partnership: "Partnership",
  "technical-support": "Technical Support",
  general: "General Question",
  other: "Other",
};
export async function POST(request) {
  try {
    /*
     * ------------------------------------------------------------
     * CHECK RESEND CONFIGURATION
     * ------------------------------------------------------------
     */
    if (!process.env.RESEND_API_KEY) {
      console.error("Missing RESEND_API_KEY environment variable.");
      return NextResponse.json(
        {
          success: false,
          error:
            "Email service is not configured. Please try again later.",
        },
        { status: 500 }
      );
    }
    if (!process.env.CONTACT_TO_EMAIL) {
      console.error("Missing CONTACT_TO_EMAIL environment variable.");
      return NextResponse.json(
        {
          success: false,
          error:
            "Contact email is not configured. Please try again later.",
        },
        { status: 500 }
      );
    }
    if (!process.env.RESEND_FROM_EMAIL) {
      console.error("Missing RESEND_FROM_EMAIL environment variable.");
      return NextResponse.json(
        {
          success: false,
          error:
            "Email sender is not configured. Please try again later.",
        },
        { status: 500 }
      );
    }
    /*
     * ------------------------------------------------------------
     * READ REQUEST
     * ------------------------------------------------------------
     */
    const contentType =
      request.headers.get("content-type") || "";
    let body = null;
    if (contentType.includes("application/json")) {
      body = await request.json().catch(() => null);
    } else {
      const formData = await request.formData().catch(() => null);
      if (formData) {
        body = Object.fromEntries(formData.entries());
      }
    }
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid contact form submission.",
        },
        { status: 400 }
      );
    }
    /*
     * ------------------------------------------------------------
     * HONEYPOT SPAM PROTECTION
     * ------------------------------------------------------------
     */
    const website = clean(body.website);
    if (website) {
      // Silently accept spam submissions.
      return NextResponse.json(
        {
          success: true,
          message: "Your message has been received.",
        },
        {
          status: 200,
          headers: {
            "Cache-Control": "no-store",
          },
        }
      );
    }
    /*
     * ------------------------------------------------------------
     * CLEAN INPUT
     * ------------------------------------------------------------
     */
    const name = clean(body.name);
    const email = clean(body.email).toLowerCase();
    const phone = clean(body.phone);
    const topic = clean(body.topic);
    const message = clean(body.message);
    /*
     * ------------------------------------------------------------
     * REQUIRED FIELDS
     * ------------------------------------------------------------
     */
    const missingFields = [];
    if (!name) missingFields.push("name");
    if (!email) missingFields.push("email");
    if (!topic) missingFields.push("topic");
    if (!message) missingFields.push("message");
    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Please complete all required fields.",
          fields: missingFields,
        },
        { status: 400 }
      );
    }
    /*
     * ------------------------------------------------------------
     * VALIDATE EMAIL
     * ------------------------------------------------------------
     */
    if (!isValidEmail(email)) {
      return NextResponse.json(
        {
          success: false,
          error: "Please provide a valid email address.",
        },
        { status: 400 }
      );
    }
    /*
     * ------------------------------------------------------------
     * VALIDATE TOPIC
     * ------------------------------------------------------------
     */
    if (!allowedTopics.has(topic)) {
      return NextResponse.json(
        {
          success: false,
          error: "Please select a valid inquiry type.",
        },
        { status: 400 }
      );
    }
    /*
     * ------------------------------------------------------------
     * LENGTH LIMITS
     * ------------------------------------------------------------
     */
    if (name.length > 150) {
      return NextResponse.json(
        {
          success: false,
          error: "Name is too long.",
        },
        { status: 400 }
      );
    }
    if (email.length > 254) {
      return NextResponse.json(
        {
          success: false,
          error: "Email address is too long.",
        },
        { status: 400 }
      );
    }
    if (phone.length > 50) {
      return NextResponse.json(
        {
          success: false,
          error: "Phone number is too long.",
        },
        { status: 400 }
      );
    }
    if (message.length > 5000) {
      return NextResponse.json(
        {
          success: false,
          error: "Message is too long.",
        },
        { status: 400 }
      );
    }
    /*
     * ------------------------------------------------------------
     * BASIC SPAM CHECK
     * ------------------------------------------------------------
     */
    const suspiciousPatterns = [
      /viagra/i,
      /casino/i,
      /crypto investment/i,
      /forex trading/i,
      /porn/i,
      /buy followers/i,
      /seo services/i,
      /casino bonus/i,
    ];
    const combinedText =
      `${name} ${email} ${message}`.toLowerCase();
    const looksLikeSpam = suspiciousPatterns.some((pattern) =>
      pattern.test(combinedText)
    );
    if (looksLikeSpam) {
      return NextResponse.json(
        {
          success: true,
          message: "Your message has been received.",
        },
        {
          status: 200,
          headers: {
            "Cache-Control": "no-store",
          },
        }
      );
    }
    /*
     * ------------------------------------------------------------
     * CONTACT DATA
     * ------------------------------------------------------------
     */
    const topicLabel = topicLabels[topic] || topic;
    const contactSubmission = {
      name,
      email,
      phone: phone || null,
      topic,
      message,
      created_at: new Date().toISOString(),
    };
    console.log(
      "NorthSky Auto contact submission:",
      contactSubmission
    );
    /*
     * ------------------------------------------------------------
     * OPTIONAL SUPABASE STORAGE
     * ------------------------------------------------------------
     */
    if (
      process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.SUPABASE_SERVICE_ROLE_KEY
    ) {
      try {
        const { createClient } = await import(
          "@supabase/supabase-js"
        );
        const supabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL,
          process.env.SUPABASE_SERVICE_ROLE_KEY
        );
        const { error: supabaseError } = await supabase
          .from("contact_submissions")
          .insert(contactSubmission);
        if (supabaseError) {
          console.error(
            "Contact submission database error:",
            supabaseError
          );
        }
      } catch (databaseError) {
        console.error(
          "Contact submission database failure:",
          databaseError
        );
      }
    }
    /*
     * ------------------------------------------------------------
     * SEND EMAIL THROUGH RESEND
     * ------------------------------------------------------------
     */
    const { data, error } = await resend.emails.send({
      from: `NorthSky Auto <${process.env.RESEND_FROM_EMAIL}>`,
      to: [process.env.CONTACT_TO_EMAIL],
      replyTo: email,
      subject: `NorthSky Auto Contact: ${topicLabel}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8" />
            <title>NorthSky Auto Contact</title>
          </head>
          <body
            style="
              margin: 0;
              padding: 0;
              background: #f8fafc;
              font-family: Arial, Helvetica, sans-serif;
              color: #0f172a;
            "
          >
            <div
              style="
                max-width: 680px;
                margin: 0 auto;
                padding: 32px 20px;
              "
            >
              <div
                style="
                  background: #020617;
                  color: white;
                  padding: 28px;
                  border-radius: 16px 16px 0 0;
                "
              >
                <div
                  style="
                    font-size: 12px;
                    font-weight: 800;
                    letter-spacing: 2px;
                    color: #60a5fa;
                    text-transform: uppercase;
                  "
                >
                  NorthSky Auto
                </div>
                <h1
                  style="
                    margin: 10px 0 0;
                    font-size: 28px;
                  "
                >
                  New Contact Inquiry
                </h1>
              </div>
              <div
                style="
                  background: white;
                  padding: 28px;
                  border: 1px solid #e2e8f0;
                  border-top: 0;
                "
              >
                <div
                  style="
                    margin-bottom: 24px;
                    padding: 16px;
                    background: #eff6ff;
                    border-radius: 12px;
                  "
                >
                  <strong>Inquiry Type</strong>
                  <div
                    style="
                      margin-top: 6px;
                      color: #2563eb;
                      font-weight: 700;
                    "
                  >
                    ${escapeHtml(topicLabel)}
                  </div>
                </div>
                <table
                  style="
                    width: 100%;
                    border-collapse: collapse;
                    margin-bottom: 24px;
                  "
                >
                  <tr>
                    <td
                      style="
                        padding: 10px 0;
                        font-weight: 700;
                        width: 120px;
                      "
                    >
                      Name
                    </td>
                    <td style="padding: 10px 0;">
                      ${escapeHtml(name)}
                    </td>
                  </tr>
                  <tr>
                    <td
                      style="
                        padding: 10px 0;
                        font-weight: 700;
                      "
                    >
                      Email
                    </td>
                    <td style="padding: 10px 0;">
                      <a
                        href="mailto:${escapeAttribute(email)}"
                        style="color: #2563eb;"
                      >
                        ${escapeHtml(email)}
                      </a>
                    </td>
                  </tr>
                  ${
                    phone
                      ? `
                        <tr>
                          <td
                            style="
                              padding: 10px 0;
                              font-weight: 700;
                            "
                          >
                            Phone
                          </td>
                          <td style="padding: 10px 0;">
                            ${escapeHtml(phone)}
                          </td>
                        </tr>
                      `
                      : ""
                  }
                </table>
                <h2
                  style="
                    font-size: 18px;
                    margin: 0 0 10px;
                  "
                >
                  Message
                </h2>
                <div
                  style="
                    padding: 18px;
                    background: #f8fafc;
                    border: 1px solid #e2e8f0;
                    border-radius: 12px;
                    line-height: 1.7;
                    white-space: pre-wrap;
                  "
                >
                  ${escapeHtml(message)}
                </div>
              </div>
              <div
                style="
                  padding: 20px;
                  text-align: center;
                  font-size: 12px;
                  color: #64748b;
                "
              >
                NorthSky Auto contact form
              </div>
            </div>
          </body>
        </html>
      `,
      text: `
NorthSky Auto - New Contact Inquiry
Inquiry Type: ${topicLabel}
Name: ${name}
Email: ${email}
Phone: ${phone || "Not provided"}
Message:
${message}
---
NorthSky Auto Contact Form
      `.trim(),
    });
    if (error) {
      console.error("Resend email error:", error);
      return NextResponse.json(
        {
          success: false,
          error:
            "Your message could not be delivered. Please try again later.",
        },
        { status: 502 }
      );
    }
    console.log(
      "NorthSky Auto contact email sent successfully:",
      data?.id
    );
    /*
     * ------------------------------------------------------------
     * SUCCESS
     * ------------------------------------------------------------
     */
    return NextResponse.json(
      {
        success: true,
        message:
          "Thanks for contacting NorthSky Auto. Your message has been received.",
        id: data?.id || null,
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  } catch (error) {
    console.error(
      "NorthSky Auto contact API error:",
      error
    );
    return NextResponse.json(
      {
        success: false,
        error:
          "We were unable to process your message. Please try again.",
      },
      {
        status: 500,
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  }
}
/*
 * ------------------------------------------------------------
 * HTML ESCAPING
 * ------------------------------------------------------------
 *
 * Prevents user-submitted contact information from being
 * interpreted as HTML inside the email.
 */
function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
    .replace(/\n/g, "<br />");
}
function escapeAttribute(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}