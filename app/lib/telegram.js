const TELEGRAM_BASE_URL =
  "https://api.telegram.org";

export async function sendTelegramMessage({
  message,
  buttonText = "View Opportunity",
  buttonUrl,
} = {}) {
  const token =
    process.env.TELEGRAM_BOT_TOKEN;

  const chatId =
    process.env.TELEGRAM_CHAT_ID;

  /*
   * Telegram configuration
   */
  if (!token || !chatId) {
    console.warn(
      "Telegram environment variables are not configured."
    );

    return {
      success: false,
      skipped: true,
      error:
        "Telegram is not configured.",
    };
  }

  /*
   * Validate message
   */
  if (
    typeof message !== "string" ||
    !message.trim()
  ) {
    return {
      success: false,
      skipped: false,
      error:
        "Telegram message is empty.",
    };
  }

  /*
   * Build API URL only after
   * confirming the bot token exists.
   */
  const apiUrl =
    `${TELEGRAM_BASE_URL}/bot${token}/sendMessage`;

  /*
   * Telegram request body
   */
  const body = {
    chat_id: chatId,
    text: message,
    parse_mode: "HTML",
    disable_web_page_preview: false,
  };

  /*
   * Optional dealer portal button
   */
  if (
    typeof buttonUrl === "string" &&
    buttonUrl.trim()
  ) {
    body.reply_markup = {
      inline_keyboard: [
        [
          {
            text:
              buttonText ||
              "View Opportunity",
            url: buttonUrl.trim(),
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

        body: JSON.stringify(body),

        cache: "no-store",
      }
    );

    /*
     * Telegram normally returns JSON,
     * but protect against an unexpected
     * non-JSON response.
     */
    let data = null;

    try {
      data = await response.json();
    } catch {
      data = null;
    }

    /*
     * Telegram rejected the request
     */
    if (
      !response.ok ||
      !data?.ok
    ) {
      console.error(
        "Telegram API error:",
        {
          status: response.status,
          description:
            data?.description ||
            "Unknown Telegram API error.",
        }
      );

      return {
        success: false,
        skipped: false,
        error:
          data?.description ||
          `Telegram API request failed with status ${response.status}.`,
      };
    }

    /*
     * Successful Telegram message
     */
    return {
      success: true,
      skipped: false,
      messageId:
        data?.result?.message_id ||
        null,
    };
  } catch (error) {
    console.error(
      "Telegram request failed:",
      error
    );

    return {
      success: false,
      skipped: false,
      error:
        "Unable to reach Telegram.",
    };
  }
}
