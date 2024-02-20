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
    <div>
      CompareTable
      {sources.map((src, i) => (
        <div key={i}>
          {fields?.map((f, j) => (
            <div key={j}>
              {f.name.toString()} {src[f.name]?.toString()}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default CompareTable;
