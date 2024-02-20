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
  const colClass =
    "grid grid-cols-subgrid grid-flow-col grid-cols-4 col-span-5 border-b-2 gap-2"; // `col-span-5 grid-rows-subgrid grid grid-flow-col `;
  const fields = (_fields || []).map((f) =>
    typeof f !== "object" ? { name: f } : f
  );
  return (
    <div
      className={`grid grid-flow-row  auto-cols-auto auto-rows-auto grid-cols-${
        sources.length + 1
      } grid-rows-${fields.length + 1}`}
    >
      {fields?.map((field, i) => (
        <div key={i} className={colClass}>
          <div className="uppercase border-r-4 py-2">
            {field.name.toString()}
          </div>
          {sources.map((src, j) => (
            <div className="border-r-4 text-center py-2" key={j}>
              {src[field.name] as string}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default CompareTable;
