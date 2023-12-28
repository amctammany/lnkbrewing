import { GrainIcon } from "@/components/Icon/GrainIcon";
import { HopIcon } from "@/components/Icon/HopIcon";
import { YeastIcon } from "@/components/Icon/YeastIcon";
import { Section } from "@/components/Section";
import Link from "next/link";

const links: [string, string, typeof HopIcon][] = [
  ["Hops", "/ingredients/hops", HopIcon],
  ["Fermentables", "/ingredients/fermentables", GrainIcon],
  ["Yeasts", "/ingredients/yeasts", YeastIcon],
  ["Other", "/ingredients/other", HopIcon],
];
export const metadata = {
  title: "LNK: Ingredients",
};
export default function IngredientsIndex() {
  return (
    <Section header="IngredientsIndex">
      <div className="grid md:grid-cols-2">
        {links.map(([label, url, Icon]) => (
          <Link
            key={url}
            href={url}
            className="m-2 p-5 text-center rounded-lg bg-slate-400 border-2 text-white underline uppercase text-lg font-bold inline-flex"
          >
            {Icon && <Icon size="default" className="flex-shrink" />}
            <span className="flex-grow">{label}</span>
          </Link>
        ))}
      </div>
    </Section>
  );
}
