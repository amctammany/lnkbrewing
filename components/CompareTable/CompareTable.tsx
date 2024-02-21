import FieldValue from "./FieldValue";

export type CompareField<T> =
  | keyof T
  | {
      name: keyof T;
    };
export type CompareTableProps<T extends { name: string }> = {
  sources: T[];
  fields?: CompareField<T>[];
};
export function CompareTable<T extends { name: string }>({
  sources,
  fields: _fields,
}: CompareTableProps<T>) {
  const colClass = `grid grid-cols-${(
    sources.length + 1
  ).toString()}  border-b-2 gap-2`; // `col-span-5 grid-rows-subgrid grid grid-flow-col `;
  const fields = (_fields || []).map((f) =>
    typeof f !== "object" ? { name: f } : f
  );
  return (
    <div className="grid grid-flow-row w-full">
      {fields?.map((field, i) => (
        <div key={i} className={colClass}>
          <div className="uppercase border-r-4 py-2">
            {field.name.toString()}
          </div>
          {sources.map((src, j) => (
            <FieldValue value={src[field.name]} key={j} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default CompareTable;
