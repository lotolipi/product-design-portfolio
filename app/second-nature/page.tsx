import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Second Nature | Lotolipi",
  description: "A personal project studio for choosing a next step and understanding your returns.",
  alternates: { canonical: "/second-nature" },
};

export default function SecondNaturePage() {
  return <main style={{minHeight:"100vh",background:"linear-gradient(135deg,#faf8f5,#e6d9f3)",color:"#30233d",padding:"clamp(28px,8vw,110px)",fontFamily:"system-ui"}}>
    <a href="/" style={{color:"inherit"}}>Lotolipi / Portfolio</a>
    <h1 style={{fontFamily:"Georgia, serif",fontWeight:400,fontSize:"clamp(52px,9vw,112px)",letterSpacing:"-.06em",lineHeight:1}}>Second Nature.</h1>
    <p style={{maxWidth:"44ch",fontSize:"1.25rem"}}>Return to a project, review your prepared brief and choose what to do next.</p>
    <a href="https://lotolipi-second-nature.lotolipi.chatgpt.site/studio" style={{display:"inline-block",padding:"14px 22px",background:"#482e66",color:"white",borderRadius:30}}>Open my studio</a>
    <p style={{maxWidth:"55ch"}}>Sign in with ChatGPT to save your work and see your personal results in Returns. The studio records your account identifier and first and latest access.</p>
  </main>;
}
