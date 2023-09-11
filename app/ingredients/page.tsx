import { Section } from "@/components";
import Link from "next/link";

const links = [
  ["Hops", "/ingredients/hops"],
  ["Fermentables", "/ingredients/fermentables"],
];
export default function IngredientsIndex() {
  return (
    <Section header="IngredientsIndex">
      <div className="flex flex-col">
        {links.map(([label, url]) => (
          <Link key={url} href={url}>
            <div className="m-5 p-5 text-center rounded-lg bg-slate-400 border-2 text-white underline uppercase text-lg font-bold ">
              {label}
            </div>
          </Link>
        ))}
      </div>
    </Section>
  );
}
