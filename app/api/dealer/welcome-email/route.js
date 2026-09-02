```javascript
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { sendDealerWelcomeEmail } from "@/lib/emails";

export async function POST(request) {
  try {
    const supabase = await createClient();

    // --------------------------------
    // VERIFY AUTHENTICATED USER
    // --------------------------------

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        {
          error: "Unauthorized.",
        },
        {
          status: 401,
        }
      );
    }

    // --------------------------------
    // VERIFY DEALER ROLE
    // --------------------------------

    const role = user.user_metadata?.role;

    if (role !== "dealer") {
      return NextResponse.json(
        {
          error: "Dealer access required.",
        },
        {
          status: 403,
        }
      );
    }

    // --------------------------------
    // READ REQUEST
    // --------------------------------

    const body = await request.json();

    const {
      email,
      dealershipName,
      contactName,
    } = body;

    // --------------------------------
    // VALIDATE EMAIL
    // --------------------------------

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        {
          error: "Dealer email is required.",
        },
        {
          status: 400,
        }
      );
    }

    const normalizedEmail = email
      .trim()
      .toLowerCase();

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        normalizedEmail
      )
    ) {
      return NextResponse.json(
        {
          error: "Invalid email address.",
        },
        {
          status: 400,
        }
      );
    }

    // --------------------------------
    // IMPORTANT:
    // EMAIL MUST MATCH AUTH USER
    // --------------------------------

    if (
      normalizedEmail !==
      user.email?.trim().toLowerCase()
    ) {
      return NextResponse.json(
        {
          error: "Email does not match the authenticated account.",
        },
        {
          status: 403,
        }
      );
    }

    // --------------------------------
    // SANITIZE NAME VALUES
    // --------------------------------

    const safeDealershipName =
      typeof dealershipName === "string"
        ? dealershipName.trim().slice(0, 150)
        : "";

    const safeContactName =
      typeof contactName === "string"
        ? contactName.trim().slice(0, 150)
        : "";

    // --------------------------------
    // SEND EMAIL
    // --------------------------------

    const result = await sendDealerWelcomeEmail({
      email: normalizedEmail,
      dealerName:
        safeContactName ||
        safeDealershipName ||
        "Dealer",
    });

    // --------------------------------
    // SUCCESS
    // --------------------------------

    return NextResponse.json({
      success: true,
      message: "Dealer welcome email sent.",
      id: result?.id || null,
    });
  } catch (error) {
    console.error(
      "Dealer welcome email API error:",
      error
    );

    return NextResponse.json(
      {
        error:
          error?.message ||
          "Unable to send dealer welcome email.",
      },
      {
        status: 500,
      }
    );
  }
}
```
