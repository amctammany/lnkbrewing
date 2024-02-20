export type CompareField<T> = {
  name: keyof T;
};
export type CompareTableProps<T extends { name: string }> = {
  sources: T[];
  fields?: CompareField<T>[];
};
export function CompareTable<T extends { name: string }>({
  sources,
  fields,
}: CompareTableProps<T>) {
  const colClass = `grid grid-flow-col auto-cols-auto w-full grid-cols-${
    sources.length + 1
  }`;
  return (
    <div className="grid grid-flow-row  auto-rows-auto">
      <div className={colClass}>
        <div></div>
        {sources.map((src, i) => (
          <div key={i}>{src.name}</div>
        ))}
      </div>
      {fields?.map((field, i) => (
        <div key={i} className={colClass}>
          <div className="w-full">{field.name.toString()}</div>
          {sources.map((src, j) => (
            <div className="w-full" key={j}>
              {src[field.name] as string}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default CompareTable;
