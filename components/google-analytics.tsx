"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

const MEASUREMENT_ID = "G-15PTW9YS2F";
const CONSENT_KEY = "lotolipi-analytics-consent";

export default function GoogleAnalytics() {
  const [isProduction, setIsProduction] = useState(false);
  const [consent, setConsent] = useState<"accepted" | "declined" | null>(null);

  useEffect(() => {
    const hostname = window.location.hostname;
    const production = hostname === "www.lotolipi.space" || hostname === "lotolipi.space";
    setIsProduction(production);
    if (!production) return;
    const saved = window.localStorage.getItem(CONSENT_KEY);
    if (saved === "accepted" || saved === "declined") setConsent(saved);
  }, []);

  function choose(value: "accepted" | "declined") {
    window.localStorage.setItem(CONSENT_KEY, value);
    setConsent(value);
  }

  if (!isProduction) return null;

  return (
    <>
      {consent === "accepted" && (
        <>
          <Script
            id="lotolipi-ga4-loader"
            src={`https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script id="lotolipi-ga4-config" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-15PTW9YS2F', { anonymize_ip: true });
            `}
          </Script>
        </>
      )}
      {consent === null && (
        <aside
          aria-label="Optional analytics preference"
          style={{position:"fixed",bottom:16,left:16,right:16,maxWidth:440,zIndex:9999,margin:"0 auto",background:"#25232A",color:"#FFFFFF",border:"1px solid #716A7C",borderRadius:16,padding:"16px 18px",boxShadow:"0 8px 30px rgba(0,0,0,.22)",fontFamily:"inherit"}}
        >
          <p style={{margin:"0 0 12px",fontSize:14,lineHeight:1.5}}>May I use optional Google Analytics to understand visits to Lotolipi? Your choice won't affect the website. <a href="/privacy" style={{color:"#D8CBFF",textDecoration:"underline"}}>Privacy details</a></p>
          <div style={{display:"flex",flexWrap:"wrap",gap:10}}>
            <button type="button" onClick={() => choose("declined")} style={{minHeight:44,padding:"8px 16px",borderRadius:10,border:"1px solid #D8CBFF",background:"transparent",color:"#FFFFFF",cursor:"pointer"}}>No thanks</button>
            <button type="button" onClick={() => choose("accepted")} style={{minHeight:44,padding:"8px 16px",borderRadius:10,border:"1px solid #D8CBFF",background:"#D8CBFF",color:"#24182E",cursor:"pointer"}}>Allow analytics</button>
          </div>
        </aside>
      )}
    </>
  );
}
