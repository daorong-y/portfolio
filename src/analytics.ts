const MEASUREMENT_ID = "G-HTR672F6Z5";

type Gtag = (...args: unknown[]) => void;

declare global {
  interface Window {
    dataLayer?: unknown[][];
    gtag?: Gtag;
  }
}

let analyticsLoaded = false;

function initialiseDataLayer() {
  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function gtag(...args: unknown[]) {
      window.dataLayer?.push(args);
    };
}

export function loadAnalytics() {
  if (analyticsLoaded) return;

  initialiseDataLayer();
  window.gtag?.("js", new Date());
  window.gtag?.("config", MEASUREMENT_ID);

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
  script.dataset.analytics = "google";
  document.head.appendChild(script);

  analyticsLoaded = true;
}

export function disableAnalytics() {
  window.gtag?.("consent", "update", { analytics_storage: "denied" });
}

export function trackEvent(eventName: string, parameters: Record<string, string> = {}) {
  window.gtag?.("event", eventName, parameters);
}
