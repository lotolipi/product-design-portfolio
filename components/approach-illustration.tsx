import Image from "next/image";

type Kind = "understand" | "connect" | "refine";
const artwork: Record<Kind, { src: string; alt: string }> = {
  understand: { src: "/19-human-centered-design.webp", alt: "Human-centred design, expressed through connected abstract forms" },
  connect: { src: "/06-connected-orbits.webp", alt: "Interconnected colourful forms representing connected needs and systems" },
  refine: { src: "/20-continuous-improvement.webp", alt: "An evolving curved pathway representing continuous refinement" },
};
export default function ApproachIllustration({ kind }: { kind: Kind }) {
  const item = artwork[kind];
  return <div className="loto-illustration" data-illustration={kind}><Image src={item.src} alt={item.alt} width={1024} height={1024} sizes="(max-width: 720px) 72vw, 25vw" className="loto-illustration-image" /></div>;
}
