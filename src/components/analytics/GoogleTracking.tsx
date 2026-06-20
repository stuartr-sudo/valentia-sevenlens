import Script from "next/script";
import {
  getDirectGoogleTagIds,
  googleTrackingConfig,
} from "@/lib/google-tracking";

function googleTagManagerSnippet(gtmId: string) {
  return `
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer',${JSON.stringify(gtmId)});
`;
}

function googleTagSnippet(tagIds: string[]) {
  const configs = tagIds
    .map((id) => `gtag('config', ${JSON.stringify(id)});`)
    .join("\n");

  return `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
${configs}
`;
}

export function GoogleTracking() {
  const { gtmId } = googleTrackingConfig;
  const directTagIds = getDirectGoogleTagIds();

  return (
    <>
      {gtmId ? (
        <Script
          id="google-tag-manager"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: googleTagManagerSnippet(gtmId) }}
        />
      ) : null}

      {!gtmId && directTagIds.length > 0 ? (
        <>
          <Script
            id="google-tag-loader"
            src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(
              directTagIds[0],
            )}`}
            strategy="afterInteractive"
          />
          <Script
            id="google-tag"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{ __html: googleTagSnippet(directTagIds) }}
          />
        </>
      ) : null}
    </>
  );
}

export function GoogleTagManagerNoScript() {
  const { gtmId } = googleTrackingConfig;

  if (!gtmId) {
    return null;
  }

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${encodeURIComponent(
          gtmId,
        )}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
        title="Google Tag Manager"
      />
    </noscript>
  );
}

