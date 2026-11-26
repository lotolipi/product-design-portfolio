import markup from "../portfolio.html.json";
export const dynamic = "force-static";
export function GET() {
 const main=markup.split('<main id=')[1].split('</main>')[0];
 const rows=Array.from(main.matchAll(/<(h1|h2|h3|p|summary)\b[^>]*>([\s\S]*?)<\/\1>/g),m=>[m[1],m[2].replace(/<[^>]+>/g,"").replace(/&amp;/g,"&").trim()]);
 const ascii=(s:string)=>s.normalize("NFKD").replace(/[–—]/g,"-").replace(/·/g," | ").replace(/[’‘]/g,"'").replace(/[^\x20-\x7e]/g,"");
 const esc=(s:string)=>ascii(s).replace(/([\\()])/g,"\\$1");
 let y=800, stream="";
 const pages:string[]=[];
 function line(s:string,size=10,bold=false){if(y<48){pages.push(stream);stream="";y=800;}stream+="BT /"+(bold?"F2":"F1")+" "+size+" Tf 44 "+y+" Td ("+esc(s)+") Tj ET\n";y-=size+4;}
 function para(s:string,size=10,bold=false){let l="";for(const w of ascii(s).split(/\s+/)){if((l+" "+w).length>Math.floor(850/size)){line(l,size,bold);l=w;}else l+=(l?" ":"")+w;}if(l)line(l,size,bold);y-=4;}
 line("Shilpi Mishra",22,true);para("Senior Product & Visual Designer | Enterprise UX | Data Intelligence",11,true);para("Bengaluru, India | smshilpi1@gmail.com");para("www.lotolipi.space | linkedin.com/in/shilpiimishra");
 for(const [tag,s] of rows){if(tag==="h1"||s.startsWith("Senior Product & Visual Designer")||!s)continue;if(tag==="h2")y-=7;para(s,tag==="h2"?13:10,tag!=="p");}
 pages.push(stream);
 const objects=["<< /Type /Catalog /Pages 2 0 R >>","", "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>","<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>"];
 const kids:string[]=[];for(const p of pages){const n=objects.length+1;kids.push(n+" 0 R");objects.push("<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /Contents "+(n+1)+" 0 R >>","<< /Length "+p.length+" >>\nstream\n"+p+"endstream");}objects[1]="<< /Type /Pages /Count "+pages.length+" /Kids ["+kids.join(" ")+"] >>";
 let pdf="%PDF-1.4\n";const offsets=[0];objects.forEach((o,i)=>{offsets.push(pdf.length);pdf+=(i+1)+" 0 obj\n"+o+"\nendobj\n";});const x=pdf.length;pdf+="xref\n0 "+offsets.length+"\n0000000000 65535 f \n"+offsets.slice(1).map(n=>String(n).padStart(10,"0")+" 00000 n \n").join("")+"trailer\n<< /Size "+offsets.length+" /Root 1 0 R >>\nstartxref\n"+x+"\n%%EOF\n";
 return new Response(pdf,{headers:{"Content-Type":"application/pdf","Content-Disposition":"attachment; filename=Shilpi-Mishra-Resume.pdf"}});
}
