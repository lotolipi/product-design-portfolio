import type { Metadata } from "next";
import Experience from "./Experience";
export const metadata: Metadata = {title:"Lo Lab — Lotolipi",description:"A free data design playground. Create, explore and export visual stories.",alternates:{canonical:"/lo-lab"},openGraph:{title:"Lo Lab — Lotolipi",description:"Where numbers become art.",url:"/lo-lab"}};
export default function Page(){return <Experience/>;}
