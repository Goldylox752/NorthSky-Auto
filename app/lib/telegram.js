const TELEGRAM_BASE_URL = "https://api.telegram.org";

function clean(value) {
  return typeof value === "string"
    ? value.trim()
    : "";
}

export async function sendTelegramMessage({
  message,
  buttonText = "View Opportunity",
  buttonUrl,
} = {}) {
  const token = clean(
    process.env.TELEGRAM_BOT_TOKEN
  );

  const chatId = clean(
    process.env.TELEGRAM_CHAT_ID
  );

  // Telegram is optional.
  // Do not fail the vehicle submission
  // if Telegram is not configured.
  if (!token || !chatId) {
    console.warn(
      "Telegram is not configured. Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID."
    );

    return {
      success: false,
      skipped: true,
      error: "Telegram is not configured.",
    };
  }

  const cleanMessage = clean(message);

  if (!cleanMessage) {
    return {
      success: false,
      skipped: false,
      error: "Telegram message is empty.",
    };
  }

  const apiUrl =
    `${TELEGRAM_BASE_URL}/bot${token}/sendMessage`;

  const body = {
    chat_id: chatId,
    text: cleanMessage,
    parse_mode: "HTML",
    disable_web_page_preview: false,
  };

  const cleanButtonUrl = clean(buttonUrl);
  const cleanButtonText =
    clean(buttonText) || "View Opportunity";

  if (cleanButtonUrl) {
    body.reply_markup = {
      inline_keyboard: [
        [
          {
            text: cleanButtonText,
            url: cleanButtonUrl,
          },
        ],
      ],
    };
  }

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      cache: "no-store",
    });

    let data = null;

    try {
      data = await response.json();
    } catch {
      // Telegram returned a non-JSON response.
    }

    if (!response.ok || !data?.ok) {
      const errorMessage =
        data?.description ||
        `Telegram API request failed with status ${response.status}.`;

      console.error(
        "Telegram API error:",
        errorMessage
      );

      return {
        success: false,
        skipped: false,
        error: errorMessage,
      };
    }

    return {
      success: true,
      skipped: false,
      messageId:
        data?.result?.message_id ?? null,
    };
  } catch (error) {
    console.error(
      "Telegram network error:",
      error
    );

    return {
      success: false,
      skipped: false,
      error:
        error?.message ||
        "Unable to reach Telegram.",
    };
  }
}
