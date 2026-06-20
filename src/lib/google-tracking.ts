export const googleLeadEventName = "valentia_lead_submit";

function cleanEnv(value: string | undefined) {
  return value?.trim() || "";
}

export const googleTrackingConfig = {
  gtmId: cleanEnv(process.env.NEXT_PUBLIC_GTM_ID),
  gaMeasurementId: cleanEnv(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID),
  googleAdsId: cleanEnv(process.env.NEXT_PUBLIC_GOOGLE_ADS_ID),
  googleAdsLeadConversionLabel: cleanEnv(
    process.env.NEXT_PUBLIC_GOOGLE_ADS_LEAD_CONVERSION_LABEL,
  ),
  googleSiteVerification: cleanEnv(
    process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  ),
};

export function getDirectGoogleTagIds() {
  if (googleTrackingConfig.gtmId) {
    return [];
  }

  return [
    googleTrackingConfig.gaMeasurementId,
    googleTrackingConfig.googleAdsId,
  ].filter((id, index, ids): id is string => Boolean(id) && ids.indexOf(id) === index);
}

