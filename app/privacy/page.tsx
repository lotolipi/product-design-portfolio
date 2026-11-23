import type { Metadata } from "next";
import "../globals.css";
import AnalyticsPreferenceReset from "../../components/analytics-preference-reset";

export const metadata: Metadata = {
  title: "Privacy & Site Information — Lotolipi",
  description: "How Lotolipi handles contact messages, local preferences, external links and privacy requests.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: "Privacy & Site Information — Lotolipi",
    description: "How Lotolipi handles contact messages, local preferences, external links and privacy requests.",
    url: "/privacy",
    type: "website",
  },
};

export default function PrivacyPage() {
  return <main id="main-content" tabIndex={-1} className="co-site" style={{minHeight:"100vh"}}>
    <header className="nav co-nav">
      <a href="/" className="brand">shilpi<span>.</span>mishra</a>
      <nav aria-label="Privacy page navigation"><a href="/" className="co-nav-item">Back to portfolio</a></nav>
    </header>
    <article style={{maxWidth:780,margin:"0 auto",padding:"clamp(48px,8vw,110px) 24px",lineHeight:1.75}}>
      <p className="co-kicker">SITE INFORMATION / PRIVACY</p>
      <h1 style={{fontSize:"clamp(2.4rem,6vw,4.8rem)",lineHeight:1.1,margin:"16px 0 24px"}}>Privacy, made clear.</h1>
      <p>This page explains how this personal portfolio works and what happens when you choose to get in touch or visit an external service. Last updated: 17 November 2026.</p>
      <h2>Contact messages</h2>
      <p>The contact form creates a draft in your own email application. It does not submit your message to a Lotolipi website database. Your email app sends the message only if you choose to send it. If you do, your name, email address and message are received through email and may be retained to respond to you.</p>
      <h2>Preferences and site operation</h2>
      <p>The bright/dark theme control stores your preference in your browser&apos;s local storage under <code>lotolipi-theme</code>. You can clear this through your browser settings. The website&apos;s hosting and delivery providers may process technical request information such as IP addresses and device/browser information to operate and protect the site.</p>
      <h2>Analytics and cookies</h2>
      <p>Lotolipi offers optional Google Analytics 4 to understand visits and site usage. Analytics is disabled unless you select “Allow analytics”. If you consent, Google Analytics may receive information such as pages viewed, device/browser details, and approximate location derived from network information, and may use cookies or similar identifiers. Google processes this information under its own terms and privacy policy. If you decline, the Google Analytics tag is not loaded by this site. Your choice is stored in this browser’s local storage as <code>lotolipi-analytics-consent</code>. Analytics is configured only for the public Lotolipi domain, not development previews. Hosting and security services may still process technical information independently of this choice.</p>
      <p>You can change your analytics choice at any time. Changing the choice reloads the page and asks again; select “No thanks” to decline future analytics collection. Previously collected information cannot necessarily be recalled.</p>
      <AnalyticsPreferenceReset />
      <h2>External destinations</h2>
      <p>Links to Payhip, Etsy, and other third-party websites take you outside Lotolipi. Those services apply their own privacy and cookie policies. Purchases and payments are handled on their respective platforms, not through this portfolio.</p>
      <h2>Your privacy requests</h2>
      <p>You may ask about personal information you have sent by email or request its correction or deletion, subject to applicable legal or operational retention requirements. Contact <a href="mailto:smshilpi1@gmail.com?subject=Lotolipi%20privacy%20request">smshilpi1@gmail.com</a> with the subject “Lotolipi privacy request”. Please do not include sensitive identification documents in your initial message. Requests involving third-party shops may need to be directed to those providers.</p>
      <h2>Updates</h2>
      <p>This notice may change when site features, analytics or data practices change. Please check the update date above.</p>
      <p style={{marginTop:40}}><a href="/">← Return to portfolio</a></p>
    </article>
  </main>;
}
