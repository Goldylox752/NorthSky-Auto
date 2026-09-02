import { NextResponse } from "next/server";
import { resend, EMAIL_FROM, EMAIL_REPLY_TO } from "@/lib/resend";

export async function POST(request) {
  try {
    const body = await request.json();

    const {
      to,
      subject,
      html,
      text,
    } = body;

    if (!to) {
      return NextResponse.json(
        { error: "Recipient email is required." },
        { status: 400 }
      );
    }

    if (!subject) {
      return NextResponse.json(
        { error: "Email subject is required." },
        { status: 400 }
      );
    }

    if (!html && !text) {
      return NextResponse.json(
        { error: "Email content is required." },
        { status: 400 }
      );
    }

    const recipients = Array.isArray(to) ? to : [to];

    const { data, error } = await resend.emails.send({
      from: EMAIL_FROM,
      to: recipients,
      replyTo: EMAIL_REPLY_TO,
      subject,
      html,
      text,
    });

    if (error) {
      console.error("Resend error:", error);

      return NextResponse.json(
        {
          error: "Email could not be sent.",
          details: error.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      id: data?.id,
    });
  } catch (error) {
    console.error("Email API error:", error);

    return NextResponse.json(
      {
        error: "Internal email service error.",
      },
      { status: 500 }
    );
  }
}
