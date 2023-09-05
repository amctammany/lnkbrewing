import Link from "next/link";

const links = [
  ["Hops", "/ingredients/hops"],
  ["Fermentables", "/ingredients/fermentables"],
];
export default function IngredientsIndex() {
  return (
    <div className="flex">
      {links.map(([label, url]) => (
        <Link key={url} href={url}>
          <div className="m-5 p-5 bg-green-100 text-blue-500 underline uppercase text-lg font-bold ">
            {label}
          </div>
        </Link>
      ))}
    </div>
  );
}
