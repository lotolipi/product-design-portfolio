"use client";
import {useState} from "react";
export default function WorkAtlasImage({index=1,alt,className=""}:{index?:number;alt:string;className?:string}){const [failed,setFailed]=useState(false);return failed?<div className={"image-fallback "+className}><strong>WorkAtlas</strong><span>Visual case study frame {index} · Open case study for the PDF</span></div>:<img className={className} src={"/projects/workatlas/frame-0"+index+".png"} alt={alt} loading={index===1?"eager":"lazy"} onError={()=>setFailed(true)}/>}
