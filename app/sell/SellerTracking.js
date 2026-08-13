export async function trackSellerSubmission({
  source = "direct",
  campaign = "organic",
  metadata = {},
} = {}) {
  try {
    const payload = {
      source,
      campaign,
      metadata,
      timestamp: new Date().toISOString(),
    };

    console.log(
      "Seller submission tracked:",
      payload
    );

    return {
      success: true,
    };
  } catch (error) {
    console.error(
      "Seller tracking failed:",
      error
    );

    return {
      success: false,
      error: error?.message || "Tracking failed",
    };
  }
}
