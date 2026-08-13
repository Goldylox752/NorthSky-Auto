const TELEGRAM_API = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}`;

export async function sendTelegramMessage({
  message,
  buttonText = "View Opportunity",
  buttonUrl,
}) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.warn(
      "Telegram environment variables are not configured."
    );

    return {
      success: false,
      skipped: true,
    };
  }

  if (!message || !message.trim()) {
    return {
      success: false,
      error: "Telegram message is empty.",
    };
  }

  const body = {
    chat_id: chatId,
    text: message,
    parse_mode: "HTML",
    disable_web_page_preview: false,
  };

  if (buttonUrl) {
    body.reply_markup = {
      inline_keyboard: [
        [
          {
            text: buttonText,
            url: buttonUrl,
          },
        ],
      ],
    };
  }

  try {
    const response = await fetch(
      `${TELEGRAM_API}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        cache: "no-store",
      }
    );

    const data = await response.json();

    if (!response.ok || !data.ok) {
      console.error(
        "Telegram API error:",
        data
      );

      return {
        success: false,
        error:
          data?.description ||
          "Telegram API request failed.",
      };
    }

    return {
      success: true,
      messageId:
        data.result?.message_id || null,
    };
  } catch (error) {
    console.error(
      "Telegram request failed:",
      error
    );

    return {
      success: false,
      error:
        "Unable to reach Telegram.",
    };
  }
}