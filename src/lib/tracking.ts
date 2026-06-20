import { googleLeadEventName } from "@/lib/google-tracking";

const googleAdsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || "";
const googleAdsLeadConversionLabel =
  process.env.NEXT_PUBLIC_GOOGLE_ADS_LEAD_CONVERSION_LABEL || "";

type LeadConversionPayload = {
  source: string;
  formId?: string;
};

type DataLayerEvent = {
  event: string;
  event_category: string;
  event_label: string;
  lead_source: string;
  form_id?: string;
};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackLeadConversion({
  source,
  formId,
}: LeadConversionPayload) {
  if (typeof window === "undefined") {
    return;
  }

  const event: DataLayerEvent = {
    event: googleLeadEventName,
    event_category: "lead",
    event_label: source,
    lead_source: source,
  };

  if (formId) {
    event.form_id = formId;
  }

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(event);

  if (typeof window.gtag !== "function") {
    return;
  }

  window.gtag("event", "generate_lead", {
    event_category: "lead",
    event_label: source,
    lead_source: source,
    form_id: formId,
  });

  if (googleAdsId && googleAdsLeadConversionLabel) {
    window.gtag("event", "conversion", {
      send_to: `${googleAdsId}/${googleAdsLeadConversionLabel}`,
    });
  }
}

