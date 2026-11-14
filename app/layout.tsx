import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {title:"Shilpi Mishra — Product Designer",description:"I design complex products that feel clear. Enterprise UX, design systems and data experiences."};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
