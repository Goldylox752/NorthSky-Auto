"use client";

import { useEffect, useRef } from "react";

function getSessionId() {
  try {
    const key = "northsky_marketing_session";

    let sessionId = sessionStorage.getItem(key);

    if (!sessionId) {
      sessionId = `${Date.now()}-${Math.random()
        .toString(36)
        .substring(2, 12)}`;

      sessionStorage.setItem(key, sessionId);
    }

    return sessionId;
  } catch {
    return null;
  }
}

async function trackEvent({
  source = "telegram",
  campaign = "telegram-general",
  event,
  page,
  metadata = {},
}) {
  try {
    await fetch("/api/marketing/track", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        source,
        campaign,
        event,
        page,
        session_id: getSessionId(),
        metadata,
      }),
      keepalive: true,
    });
  } catch (error) {
    console.error("NorthSky marketing tracking error:", error);
  }
}

export default function TelegramTracking({
  source = "telegram",
  campaign = "telegram-general",
}) {
  const tracked = useRef(false);

  useEffect(() => {
    if (tracked.current) return;

    tracked.current = true;

    // Save attribution so it can follow the visitor
    // from Telegram → NorthSky Auto → seller/dealer actions.
    try {
      sessionStorage.setItem(
        "northsky_source",
        source
      );

      sessionStorage.setItem(
        "northsky_campaign",
        campaign
      );
    } catch (error) {
      console.error(
        "Unable to save NorthSky attribution:",
        error
      );
    }

    trackEvent({
      source,
      campaign,
      event: "telegram_visit",
      page: window.location.pathname,
      metadata: {
        landing_page: "telegram",
      },
    });
  }, [source, campaign]);

  return null;
}

export function SellerTrackingLink({
  href,
  source = "telegram",
  campaign = "telegram-general",
  children,
  className = "",
}) {
  const handleClick = () => {
    trackEvent({
      source,
      campaign,
      event: "seller_cta_click",
      page: window.location.pathname,
      metadata: {
        destination: "/sell",
      },
    });
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={className}
    >
      {children}
    </a>
  );
}

export function DealerTrackingLink({
  href,
  source = "telegram",
  campaign = "telegram-general",
  children,
  className = "",
}) {
  const handleClick = () => {
    trackEvent({
      source,
      campaign,
      event: "dealer_cta_click",
      page: window.location.pathname,
      metadata: {
        destination: "/buyers",
      },
    });
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={className}
    >
      {children}
    </a>
  );
}