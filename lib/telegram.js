const TELEGRAM_BOT_TOKEN =
  process.env.TELEGRAM_BOT_TOKEN;

const TELEGRAM_CHAT_ID =
  process.env.TELEGRAM_CHAT_ID;

function getTelegramApiUrl() {
  if (!TELEGRAM_BOT_TOKEN) {
    return null;
  }

  return `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
}

export async function sendTelegramMessage({
  message,
  buttonText,
  buttonUrl,
}) {
  if (!message) {
    return {
      success: false,
      skipped: true,
      error: "Telegram message is empty.",
    };
  }

  if (
    !TELEGRAM_BOT_TOKEN ||
    !TELEGRAM_CHAT_ID
  ) {
    console.warn(
      "Telegram is not configured. Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID."
    );

    return {
      success: false,
      skipped: true,
      error:
        "Telegram environment variables are missing.",
    };
  }

  const apiUrl =
    getTelegramApiUrl();

  if (!apiUrl) {
    return {
      success: false,
      skipped: true,
      error:
        "Telegram bot token is missing.",
    };
  }

  const payload = {
    chat_id: TELEGRAM_CHAT_ID,
    text: String(message),
    parse_mode: "HTML",
    disable_web_page_preview: true,
  };

  if (
    buttonText &&
    buttonUrl
  ) {
    payload.reply_markup = {
      inline_keyboard: [
        [
          {
            text: String(
              buttonText
            ),
            url: String(
              buttonUrl
            ),
          },
        ],
      ],
    };
  }

  try {
    const response = await fetch(
      apiUrl,
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify(
          payload
        ),
        cache: "no-store",
      }
    );

    let result;

    try {
      result =
        await response.json();
    } catch {
      result = null;
    }

    if (
      !response.ok ||
      !result?.ok
    ) {
      console.error(
        "Telegram API request failed:",
        {
          status: response.status,
          description:
            result?.description,
        }
      );

      return {
        success: false,
        skipped: false,
        error:
          result?.description ||
          `Telegram API returned HTTP ${response.status}.`,
      };
    }

    return {
      success: true,
      skipped: false,
      messageId:
        result?.result?.message_id ||
        null,
    };
  } catch (error) {
    console.error(
      "Telegram request error:",
      error
    );

    return {
      success: false,
      skipped: false,
      error:
        error?.message ||
        "Unable to contact Telegram.",
    };
  }
}
