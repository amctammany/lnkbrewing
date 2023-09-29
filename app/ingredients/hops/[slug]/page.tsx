import { ButtonLink } from "@/components/Button/Button";
import { Section } from "@/components/Section/Section";
import { prisma } from "@/lib/client";
import { Hop } from "@prisma/client";
import Link from "next/link";
type HopDisplayProps = {
  params: {
    slug: string;
  };
};
const fieldNames: (keyof Hop)[] = ["name", "description", "country", "usage"];
type RangePropProps = {
  label?: string;
  low?: number | null;
  high?: number | null;
  avg?: number | null;
};
function RangeProp({ label, low, high, avg }: RangePropProps) {
  return (
    <div className="m-2 p-0">
      <h2 className="text-lg uppercase underline">{label}</h2>
      <div className="px-2 m-0 flex items-center gap-4">
        <div className="flex-grow text-md">
          Range: {low} - {high}
        </div>
        <div className="text-md">Average: {avg}</div>
      </div>
    </div>
  );
}

export function generateMetadata({ params }: HopDisplayProps) {
  return {
    title: `LNK Hop: ${params.slug}`,
  };
}

export default async function HopDisplay({
  params: { slug },
}: HopDisplayProps) {
  const hop = await prisma.hop.findFirst({
    where: {
      slug,
    },
    include: {
      HopSensoryPanel: true,
    },
  });
  const panel = hop?.HopSensoryPanel[0];
  return (
    <Section
      header={`Hop: ${hop?.name}`}
      actions={
        <ButtonLink href={`/ingredients/hops/${hop?.slug}/edit`}>
          Edit
        </ButtonLink>
      }
    >
      <div className="grid grid-auto grid-cols-1 md:grid-cols-2">
        <div className="m-0 p-2 shadow-lg">
          {fieldNames.map((field) => (
            <div key={field} className="m-2 p-0 ">
              <h2 key={field} className="text-lg uppercase underline">
                {field}
              </h2>
              <p className="px-2 m-1">{hop?.[field]}</p>
            </div>
          ))}
          <div className="m-2 p-0 ">
            <h2 className="text-lg uppercase underline">Styles</h2>
            {hop?.styles.map((style) => (
              <p key={style} className="px-2 m-1">
                {style}
              </p>
            ))}
          </div>
          <div className="m-2 p-0 ">
            <h2 className="text-lg uppercase underline">Substitutes</h2>
            {hop?.substitutesString.map((sub) => (
              <p key={sub} className="px-2 m-1">
                {sub}
              </p>
            ))}
          </div>
        </div>
        <div className="p-2 shadow-lg">
          <RangeProp
            label="Alpha Acids"
            low={hop?.alphaLow}
            high={hop?.alphaHigh}
            avg={hop?.alpha}
          />
          <RangeProp
            label="Beta Acids"
            low={hop?.betaLow}
            high={hop?.betaHigh}
            avg={hop?.beta}
          />
          <RangeProp
            label="Cohumulone"
            low={hop?.cohumuloneLow}
            high={hop?.cohumuloneHigh}
            avg={hop?.cohumulone}
          />
          <RangeProp
            label="Caryophyllene"
            low={hop?.caryophylleneLow}
            high={hop?.caryophylleneHigh}
            avg={hop?.caryophyllene}
          />
          <RangeProp
            label="Farnesene"
            low={hop?.farneseneLow}
            high={hop?.farneseneHigh}
            avg={hop?.farnesene}
          />
          <RangeProp
            label="Humulene"
            low={hop?.humuleneLow}
            high={hop?.humuleneHigh}
            avg={hop?.humulene}
          />
          <RangeProp
            label="Farnesene"
            low={hop?.farneseneLow}
            high={hop?.farneseneHigh}
            avg={hop?.farnesene}
          />
          <RangeProp
            label="Myrcene"
            low={hop?.myrceneLow}
            high={hop?.myrceneHigh}
            avg={hop?.myrcene}
          />

          <RangeProp
            label="Total Oils"
            low={hop?.totalOilLow}
            high={hop?.totalOilHigh}
            avg={hop?.totalOil}
          />
        </div>
        <div>
          Sensory
          {Object.entries(panel || {}).map(([k, v]) => (
            <div key={k}>
              {k} : {v}
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
