import { ReactElement } from "react";

export type CompareField<T> = {
  name: keyof T;
};
export type CompareTableProps<T> = {
  sources: T[];
  fields?: CompareField<T>[];
  children?: React.ReactNode | React.ReactNode[];
};
export function CompareTable<T>({
  sources,
  fields,
  children,
}: CompareTableProps<T>) {
  return (
    <div className="flex ">
      <div className="shrink pr-4">
        <div className="grid grid-flow-row auto-rows-max">
          {fields?.map((f, i) => (
            <div key={i}>{f.name.toString()}</div>
          ))}
        </div>
      </div>
      <div className="grid grid-flow-col auto-cols-auto gap-4">
        {sources.map((src, i) => (
          <div key={i} className="grid grid-flow-row auto-rows-max">
            {fields?.map((f, j) => (
              <div key={j}>{src[f.name]?.toString()}</div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CompareTable;
