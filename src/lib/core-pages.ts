import { readFile } from "node:fs/promises";
import nodePath from "node:path";
import {
  googleLeadEventName,
  googleTrackingConfig,
} from "@/lib/google-tracking";
import { corePageJsonLd, jsonLdScriptContent } from "@/lib/seo/schema";
import { siteConfig } from "@/lib/site";

const corePagesDir = nodePath.join(process.cwd(), "src/content/core-pages");

type CorePageFile = "index.html" | "about.html" | "quiz.html";

const pagePaths: Record<CorePageFile, string> = {
  "index.html": "",
  "about.html": "/about",
  "quiz.html": "/quiz",
};

const headers = {
  "content-type": "text/html; charset=utf-8",
  "cache-control": "public, max-age=0, must-revalidate",
};

export async function corePageResponse(fileName: CorePageFile) {
  const html = await readFile(nodePath.join(corePagesDir, fileName), "utf8");
  const enrichedHtml = injectHeadMetadata(html, fileName);

  return new Response(enrichedHtml, {
    headers,
  });
}

function injectHeadMetadata(html: string, fileName: CorePageFile) {
  const canonicalPath = pagePaths[fileName];
  const canonicalUrl = `${siteConfig.url}${canonicalPath}`;
  const canonical = `<link rel="canonical" href="${canonicalUrl}">`;
  const jsonLd = jsonLdScriptContent(corePageJsonLd(fileName));
  const schema = `<script type="application/ld+json">${jsonLd}</script>`;
  const googleVerification = googleTrackingConfig.googleSiteVerification
    ? `<meta name="google-site-verification" content="${escapeHtmlAttribute(
        googleTrackingConfig.googleSiteVerification,
      )}">`
    : "";
  const trackingHead = getTrackingHeadSnippet();
  const trackingBody = getTrackingBodySnippet();

  return html
    .replace(
      "</head>",
      `${canonical}\n${schema}\n${googleVerification}\n${trackingHead}\n</head>`,
    )
    .replace("<body>", `<body>\n${trackingBody}`);
}

function getTrackingHeadSnippet() {
  const { gtmId } = googleTrackingConfig;
  const directTagIds = getDirectGoogleTagIds();
  const helper = `
<script>
window.dataLayer = window.dataLayer || [];
window.valentiaTrackLeadConversion = function(payload) {
  var source = payload && payload.source ? String(payload.source) : 'site';
  var formId = payload && payload.formId ? String(payload.formId) : undefined;
  var eventPayload = {
    event: ${JSON.stringify(googleLeadEventName)},
    event_category: 'lead',
    event_label: source,
    lead_source: source
  };
  if (formId) eventPayload.form_id = formId;
  window.dataLayer.push(eventPayload);
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'generate_lead', {
      event_category: 'lead',
      event_label: source,
      lead_source: source,
      form_id: formId
    });
    ${getStaticAdsConversionSnippet()}
  }
};
</script>`;

  if (gtmId) {
    return `${getStaticGoogleTagManagerSnippet(gtmId)}\n${helper}`;
  }

  if (directTagIds.length > 0) {
    return `${getStaticGoogleTagSnippet(directTagIds)}\n${helper}`;
  }

  return helper;
}

function getTrackingBodySnippet() {
  const { gtmId } = googleTrackingConfig;

  if (!gtmId) {
    return "";
  }

  return `<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${encodeURIComponent(
    gtmId,
  )}" height="0" width="0" style="display:none;visibility:hidden" title="Google Tag Manager"></iframe></noscript>`;
}

function getDirectGoogleTagIds() {
  const { gtmId, gaMeasurementId, googleAdsId } = googleTrackingConfig;

  if (gtmId) {
    return [];
  }

  return [gaMeasurementId, googleAdsId].filter(
    (id, index, ids): id is string => Boolean(id) && ids.indexOf(id) === index,
  );
}

function getStaticGoogleTagManagerSnippet(gtmId: string) {
  return `<script>
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer',${JSON.stringify(gtmId)});
</script>`;
}

function getStaticGoogleTagSnippet(tagIds: string[]) {
  const configs = tagIds
    .map((id) => `gtag('config', ${JSON.stringify(id)});`)
    .join("\n");

  return `<script async src="https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(
    tagIds[0],
  )}"></script>
<script>
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
${configs}
</script>`;
}

function getStaticAdsConversionSnippet() {
  const { googleAdsId, googleAdsLeadConversionLabel } = googleTrackingConfig;

  if (!googleAdsId || !googleAdsLeadConversionLabel) {
    return "";
  }

  return `window.gtag('event', 'conversion', { send_to: ${JSON.stringify(
    `${googleAdsId}/${googleAdsLeadConversionLabel}`,
  )} });`;
}

function escapeHtmlAttribute(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}
