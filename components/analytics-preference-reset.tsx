"use client";

export default function AnalyticsPreferenceReset() {
  return (
    <button
      type="button"
      onClick={() => {
        window.localStorage.removeItem("lotolipi-analytics-consent");
        window.location.reload();
      }}
      style={{padding:"12px 16px",minHeight:44,borderRadius:10,border:"1px solid currentColor",background:"transparent",color:"inherit",font:"inherit",cursor:"pointer"}}
    >
      Change analytics choice
    </button>
  );
}
