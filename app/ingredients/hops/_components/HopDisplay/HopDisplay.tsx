import { ButtonLink } from "@/components/Button";
import { Section } from "@/components/Section";
import { Range } from "@/components/Range";
import { Hop, HopSensoryPanel } from "@prisma/client";
import { EditIcon } from "@/components/Icon";

const fieldNames: (keyof Hop)[] = [
  "name",
  "id",
  "description",
  "country",
  "usage",
];
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

export type HopDisplayProps = {
  hop?: (Hop & { HopSensoryPanel?: HopSensoryPanel[] }) | null;
};
export const HopDisplay = ({ hop }: HopDisplayProps) => (
  <Section
    header={`Hop: ${hop?.name}`}
    actions={
      <ButtonLink href={`/ingredients/hops/${hop?.slug}/edit`}>
        <EditIcon />
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
        <Range
          label="Alpha Acids"
          min={0}
          max={40}
          value={hop?.alpha!}
          range={[hop?.alphaLow!, hop?.alphaHigh!]}
        />
        <Range
          label="Beta Acids"
          min={0}
          max={40}
          value={hop?.beta!}
          range={[hop?.betaLow!, hop?.betaHigh!]}
        />
        <Range
          label="Cohumulone"
          min={0}
          max={50}
          value={hop?.cohumulone!}
          range={[hop?.cohumuloneLow!, hop?.cohumuloneHigh!]}
        />
        <Range
          label="Caryophyllene"
          min={0}
          max={25}
          value={hop?.caryophyllene!}
          range={[hop?.caryophylleneLow!, hop?.caryophylleneHigh!]}
        />
        <Range
          label="Farnesene"
          min={0}
          max={25}
          value={hop?.farnesene!}
          range={[hop?.farneseneLow!, hop?.farneseneHigh!]}
        />
        <Range
          label="Humulene"
          min={0}
          max={50}
          value={hop?.humulene!}
          range={[hop?.humuleneLow!, hop?.humuleneHigh!]}
        />
        <Range
          label="Myrcene"
          min={0}
          max={65}
          value={hop?.myrcene!}
          range={[hop?.myrceneLow!, hop?.myrceneHigh!]}
        />
        <Range
          label="Total Oils"
          min={0}
          max={25}
          value={hop?.totalOil!}
          range={[hop?.totalOilLow!, hop?.totalOilHigh!]}
        />
      </div>
      <div>
        {Object.entries(hop?.HopSensoryPanel?.[0] || {}).map(([k, v]) => (
          <div key={k}>
            {k} : {v}
          </div>
        ))}
      </div>
    </div>
  </Section>
);
