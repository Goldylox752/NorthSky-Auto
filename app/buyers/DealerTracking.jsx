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
  source = "direct",
  campaign = "organic",
  event,
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
        page: "/buyers",
        session_id: getSessionId(),
        metadata,
      }),
      keepalive: true,
    });
  } catch (error) {
    console.error(
      "NorthSky dealer tracking error:",
      error
    );
  }
}

export default function DealerTracking({
  source = "direct",
  campaign = "organic",
}) {
  const tracked = useRef(false);

  useEffect(() => {
    if (tracked.current) return;

    tracked.current = true;

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
        "Unable to save dealer attribution:",
        error
      );
    }

    trackEvent({
      source,
      campaign,
      event: "dealer_signup",
      metadata: {
        page_type: "dealer_landing",
      },
    });
  }, [source, campaign]);

  return null;
}

export function DealerCheckoutTracking({
  href,
  source = "direct",
  campaign = "organic",
  children,
  className = "",
  plan = "unknown",
}) {
  async function handleClick() {
    await trackEvent({
      source,
      campaign,
      event: "checkout_started",
      metadata: {
        plan,
        destination: href,
      },
    });
  }

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