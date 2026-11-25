import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Risiti | Lotolipi",
  description: "A personal project studio for choosing a next step and understanding your returns.",
  alternates: { canonical: "/risiti" },
};

export default function RisitiPage() {
  return <main style={{minHeight:"100vh",background:"linear-gradient(135deg,#faf8f5,#e6d9f3)",color:"#30233d",padding:"clamp(28px,8vw,110px)",fontFamily:"system-ui"}}>
    <a href="/" style={{color:"inherit"}}>Lotolipi / Portfolio</a>
    <h1 style={{fontFamily:"Georgia, serif",fontWeight:400,fontSize:"clamp(52px,9vw,112px)",letterSpacing:"-.06em",lineHeight:1}}>Risiti.</h1>
    <p style={{maxWidth:"44ch",fontSize:"1.25rem"}}>Find unfinished work in your AI chat. Choose one task, mark what you finish, and collect your week in a progress card you can share.</p>
    <a href="https://lotolipi-second-nature.lotolipi.chatgpt.site/studio" style={{display:"inline-block",padding:"14px 22px",background:"#482e66",color:"white",borderRadius:30}}>Start my Risiti</a>
    <p style={{maxWidth:"55ch"}}>Sign in with ChatGPT to keep a private record. Choose which accomplishment appears on your weekly card. The studio records your account identifier and first and latest access.</p>
  </main>;
}
