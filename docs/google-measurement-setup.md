# Google measurement setup

This app is wired for Google Tag Manager, GA4, Google Ads lead conversion tracking, and Search Console verification through environment variables.

## Environment variables

Set these in Vercel before the production build:

```bash
NEXT_PUBLIC_GTM_ID=GTM-...
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-...
NEXT_PUBLIC_GOOGLE_ADS_ID=AW-...
NEXT_PUBLIC_GOOGLE_ADS_LEAD_CONVERSION_LABEL=...
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=...
```

Use `NEXT_PUBLIC_GTM_ID` as the primary implementation. If GTM is set, GA4 and Ads should be configured inside GTM to avoid duplicate page views. The GA4 and Ads env values are still kept for fallback/direct tagging and handoff clarity.

## Site events

All lead captures push this data layer event:

```js
{
  event: "valentia_lead_submit",
  event_category: "lead",
  event_label: "<source>",
  lead_source: "<source>",
  form_id: "<form id>"
}
```

Current sources include `homepage`, `journal`, and `quiz-result`. No email address, name, or other personal data is sent to Google by the tracking code.

## GTM container

Create a Web container for Valentia and publish:

1. Google tag: use the GA4 measurement ID, trigger on all pages.
2. Trigger: Custom Event, event name `valentia_lead_submit`.
3. GA4 event tag: event name `generate_lead`, triggered by `valentia_lead_submit`.
4. Conversion Linker tag: trigger on all pages.
5. Google Ads Conversion Tracking tag: use the Ads conversion ID and label, triggered by `valentia_lead_submit`.

Recommended GTM data layer variables:

```text
lead_source
form_id
```

Pass both as GA4 event parameters on the `generate_lead` tag.

## GA4

Create a GA4 property and Web data stream for the final production domain:

```text
https://valentia.com
```

If the Vercel preview is used before the domain move, events can still be tested from:

```text
https://valentia-sevenlens.vercel.app
```

Create a key event named:

```text
generate_lead
```

## Google Ads

Create a Website conversion action:

```text
Name: Valentia lead
Category: Submit lead form
Value: Do not use a value
Trigger: valentia_lead_submit via GTM
```

Copy the conversion ID (`AW-...`) and conversion label into Vercel env vars.

## Search Console

Preferred property:

```text
Domain property: valentia.com
```

That requires adding the Search Console DNS TXT record at the domain registrar. The current `valentia.com` DNS still resolves to Shopify and returns `402`, so meta-tag verification through this Next app will not verify the final domain until DNS points at this app. A temporary URL-prefix property for `https://valentia-sevenlens.vercel.app` can be verified after deploying the tracking build.

